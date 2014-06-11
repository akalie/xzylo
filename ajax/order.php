<?php
/* Sites-Stroy.ru by iProger */

include 'Tools.php';
include 'Api.php';

function SendMail($em_to,$subject,$mess)
{
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= 'To: ' . $em_to . "\r\n";
    $headers .= 'From: X-zylo <noreply@x-zylo.net>' . "\r\n";

    mail($em_to, $subject, $mess, $headers);
}

$fio = $_POST['fio'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$adress = $_POST['adress'];

$phone = '+7(909)588-64-58';
$logFilePath = 'ordersLog.txt';
$logPhones= 'phonesLog.txt';

$testPhone = file_get_contents($logPhones);

if(strstr($testPhone, '|'.$tel.'|'))
{
    echo 'Нельзя заказывать несколько раз с одного номера телефона';
    exit;
}

$handle = fopen($logPhones, 'a');

fwrite($handle, '|'.$tel.'|');
fclose($handle);

$handle = fopen($logFilePath, 'a');

$adminEmail = 'starsmaster@allsocial.ru';

$mess = "Новый заказ x-zylo. <br/>ФИО: ".$fio."<br/>"."E-mail: ".$email."<br/>"."<br/>Телефон: ".$tel."<br/>Адрес: ".$adress;

fwrite($handle, $mess . PHP_EOL);
fclose($handle);

SendMail($adminEmail, 'Новый заказ x-zylo', $mess);

$data = Api::pack(3, 'Umk4A&lr7ih&jU#As^5cyWmAnFWKQOQ1JXb-FB)Qv&)h3zMX$AQ-$3cRs94W*+wV', 1, 1, $email, $phone, '', 'покупаем хузло', $adress);
Api::doPostRequest($data);


$mess = <<<HDO
Уважаемый $fio
Вы заказали у нас на xzylo.net фрисби Xzylo, указали адрес ($adress), в течение рабочего дня с Вами свяжется наш менеджер для подтверждения заказа.
Спасибо, что воспользовались нашими услугами!
HDO;

SendMail($email, 'Ваш заказ', $mess);
?>
<?php header ("Content-Type: text/html; charset=utf-8"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- Sites-Stroy.ru by iProger -->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Фрисби нового поколения X-Zylo</title>
    <LINK rel="icon" href="/images/favicon.png" type="image/x-icon">
    <link media="all" rel="stylesheet" type="text/css" href="/css/style.css" />
    <style>
        body {
            background-color: #D6D6D6 ;
            padding: 10px;
        }

        p {
            text-align: center;
            font-weight: bold;
            font-size: 16px;
        }

        button {
            padding:7px 40px 7px 40px;
            font-weight: bold;
            font-size: 16px;
        }

        .content {
            padding-top: 50px;
        }

        .btn-w {
            padding-top: 20px;
            width: 100px;
            margin: auto;
        }
    </style>
</head>
<body>
<div class="content">
    <p>Мы отправили на ваш email письмо с данными заказа, если вы его там не нашли - посмотрите в спаме.</p>
    <div class="btn-w"><button onclick="window.close()">Ok</button></div>
</div>
<iframe src="http://track.adwad.ru/SL1sF?adv_sub=3" scrolling="no" frameborder="0" width="1" height="1"></iframe>
</body>