<?php

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

$mail->setLanguage('ru', 'phpmailer/language/');
$mail = new PHPMailer(true); /* Создаем объект MAIL */
$mail->CharSet = "UTF-8"; /* Задаем кодировку UTF-8 */
$mail->IsHTML(true); /* Разрешаем работу с HTML */

// $email = $_POST["email"]; /* Почта */
// $message = $_POST["message"]; /* Сообщение с формы */

   // $mail->addAddress('')
$to = "popovevgen18042001@mail.ru"; // Тут указываем свою почту
$subject = "e-mail тест"; // Тема письма
// Сообщение
$message = "Это тестовое сообщение.\n
Если ты можешь его прочитать, значит все ОК?\n
Конец сообщения.";
// Перенос строк
$message = wordwrap($message, 70);
// возратит TRUE, если письмо успешно передано
// почтовой программе например exim
if (mail($to, $subject, $message)) {
	echo("Почта была отправлена … вроде бы");
} else { 
	echo("Увы, но почта не отправлена!");
}