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

   $mail->addAddress('mirtps@mail.ru')

   $mail->Subject = 'Здравствуйте!';

   if(trim(!empty($_POST['email']))){
      $body.='<p?><strong>Email:</strong> ' .$_POST['email'].'</p>';
   }
   if(trim(!empty($_POST['message']))){
      $body.='<p?><strong>Сообщение:</strong> ' .$_POST['message'].'</p>';
   }

   $mail->Body = $body;

   if(!$mail->send()){
      $message = 'ОШИБКА';
   }else{
      $message = 'Данные отправлены';
   }

   $response = ['message' => $message];
   header = ('Content-type: appllication/json');

   echo json_encode($response);
?>