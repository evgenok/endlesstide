<?php
header("Content-Type: text/plain; charset=utf-8");
// echo "Hello from PHP!";

$data = json_decode(file_get_contents("php://input"), true);
// echo "\n\nJSON array from POST: \n";
// print_r($data);
// die();

// Формируем текст письма
$message = "Данные клиента:\n";
$message .= "Сообщение от: {$data['form']['name']}\n";
$message .= "Email:  {$data['form']['email']}\n";
$message .= "Телефон:  {$data['form']['phone']}\n";

// Текст письма, данные по заявке
$message .= "Текст сообщения: {$data['form']['textarea']}";
// $message .= "Первоначальный платеж: {$data['data']['payment']} <br>";
// $message .= "Срок в годах: {$data['data']['time']} <br>";

// Результаты расчета
// $message .= "<h2>Результаты расчета</h2>";
// $message .= "Процентная ставка: {$data['results']['rate']} <br>";
// $message .= "Сумма кредита: {$data['results']['totalAmount']} <br>";
// $message .= "Ежемесячный платеж: {$data['results']['monthPayment']} <br>";
// $message .= "Переплата: {$data['results']['overPayment']} <br>";

// Отправляем письмо и результат отправки успех/неуспех true/false записываем в $result
$result = mail('popovevgen18042001@mail.ru', 'Заявка', $message);

// На основе успешной или не успешной отправки сообщаем SUCCESS или FAILED
// !!! Больше никакого вывода из данного файла быть не должно
// Никаких распечаток через echo, print_r и т.п. !!!
if ($result) {
   echo "SUCCESS";
} else {
   echo "FAILED";
}