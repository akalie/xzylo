<?php
/* Sites-Stroy.ru by iProger */

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

$mess = <<<HDO
Уважаемый $fio <br/>
Вы заказали у нас на xzylo.net фрисби, указали адрес $adress, в течение рабочего дня с Вами свяжется наш менеджер для подтверждения заказа.<br/>
Возникшие вопросы вы можете задать  по телефону $phone .<br/>
Спасибо, что воспользовались нашими услугами!
HDO;

SendMail($email, 'Ваш заказ', $mess);
