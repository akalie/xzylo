<?
/**
 * Упаковка/Распаковка api запросов
 *
 * @author amberovsky
 */


/**  */
final class Api {
    /** поле, передаваемое в POST запросе */
    const API_FIELD = 'look_around';

    /** адрес сервера, куда отправлять данные */
    const HOST_URL = 'http://95.85.41.238:3065/api';

    /** ограничения длины на текстовые поля */
    const
        MAX_COMMENT_LENGTH          = 256, // максимальная длина комментария
        MAX_SYSTEM_COMMENT_LENGTH   = 256, // максимальная длина комментария лендинга (системный)
        MAX_ADDRESS_LENGTH          = 256; // максимальная длина поля адреса

    /** максимальная разница между таймстампом даты заказа и текущим таймстампом, в секундах */
    const MAX_TIMESTAMP_DIFF = 5;

    /** ключи сериализации */
    const
        KEY_LANDING_ID      = 0, // id лендинга
        KEY_TIMESTAMP       = 1, // таймстамп времени заказа
        KEY_ITEM_ID         = 2, // id покупаемой вещи
        KEY_ITEM_QUANTITY   = 3, // количество покупаемых вещей
        KEY_EMAIL           = 4, // email клиента
        KEY_PHONE           = 5, // телефон клиента, integer
        KEY_COMMENT         = 6, // комментарий клиента к заказу
        KEY_SYSTEM_COMMENT  = 7, // комментарий от лендинга (системный)
        KEY_ADDRESS         = 8, // адрес, указанный клиентом
        KEY_SIGNATURE       = 9; // подпись заказа

    /** возвращаемые коды функции unpack */
    const
        UNPACK_JSON_DECODE_FAILED   = -1, // json_decode не смог
        UNPACK_MISSED_FIELD         = -2, // нет какого-то поля
        UNPACK_ITEM_QUANTITY_WRONG  = -3, // неверное количество заказываемых вещей - меньше 1
        UNPACK_MISSED_LANDING       = -4, // нет такого лендинга
        UNPACK_SIGNATURE_FAILED     = -5, // проверка по подписи не прошло
        UNPACK_TIMESTAMP_FAILED     = -6; // разница в таймстампе превышает допустимую

    /**
     * @param array $data данные по заказу
     * @param string $landingApiKey api ключ лендинга
     *
     * @return string подпись к заказу
     */
    private static function generateSignature(array $data, $landingApiKey) {
        return json_encode($data) . (string) $landingApiKey;
    }

    /**
     * @param int $landingId id лендинга
     * @param string $landingApiKey ключ api данного лендинга
     * @param int $itemId id покупаемой вещи
     * @param int $itemQuantity количество покупаемых вещей
     * @param string $email email клиента
     * @param int $phone телефон клиента, integer
     * @param string $comment комментарий клиента к заказу
     * @param string $systemComment комментарий от лендинга (системный)
     * @param string $address адрес, указанный клиентом
     *
     * @return string упакованные данные для пересылки в dopamine
     */
    public static function pack($landingId, $landingApiKey, $itemId, $itemQuantity, $email, $phone, $comment, $systemComment, $address) {
        $orderData = array(
            self::KEY_LANDING_ID        => (int) $landingId,
            self::KEY_TIMESTAMP         => time(),
            self::KEY_ITEM_ID           => (int) $itemId,
            self::KEY_ITEM_QUANTITY     => (int) $itemQuantity,
            self::KEY_EMAIL             => (string) $email,
            self::KEY_PHONE             => (int) $phone,
            self::KEY_COMMENT           => (string) mb_substr($comment, 0, self::MAX_COMMENT_LENGTH),
            self::KEY_SYSTEM_COMMENT    => (string) mb_substr($systemComment, 0, self::MAX_SYSTEM_COMMENT_LENGTH),
            self::KEY_ADDRESS           => (string) mb_substr($address, 0, self::MAX_ADDRESS_LENGTH)
        );

        return json_encode($orderData + array(
                self::KEY_SIGNATURE         => Tools::hash(self::generateSignature($orderData, $landingApiKey))
            ));
    }

    /**
     * Отправка данных в CRM
     *
     * @param string $data отправляемые данные
     *
     * @return bool удалось ли отправить запрос
     */
    public static function doPostRequest($data) {
        $curl = curl_init(self::HOST_URL);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, self::API_FIELD . '=' . urlencode($data));
        $curlResult = curl_exec($curl);
        $curlCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $curlError = curl_error($curl);
        curl_close($curl);

        return (($curlResult !== false) && ($curlCode == 200) && empty($curlError));
    }
}
