<?
/**
 * Набор утилит
 *
 * @author amberovsky
 */

/**  */
final class Tools {
    /**
     * @param string $text текст на хеширование
     *
     * @return string хешированный текст
     */
    public static function hash($text) {
        return crypt($text, '$5$' . self::generate() . '$');
    }

    /**
     * @return string случайная последовательность по алфавиту
     */
    public static function generate() {
        $alphabet = '0123456789-=ABCDEFGHIJKLMNOPRQSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
        $alphabetLength = strlen($alphabet);
        $rnd = '';

        for ($i = 0; $i < 8; $i++) {
            $rnd .= $alphabet[mt_rand(0, $alphabetLength - 1)];
        }

        return $rnd;
    }
}
