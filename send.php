<?php
$token = "8019319696:AAGqm0FQRGuNYwv5fV5krcL6J8pS5qeCuEM";
$chat_id = "5204802440";
$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data['message'])) { http_response_code(400); echo "Datos inválidos"; exit; }
$message = $data['message'];
$url = "https://api.telegram.org/bot{$token}/sendMessage";
$params = ['chat_id' => $chat_id, 'text' => $message];
$options = ['http' => ['method' => 'POST','header' => "Content-Type: application/x-www-form-urlencoded\r\n",'content' => http_build_query($params)]];
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
echo $result ? "Mensaje enviado correctamente" : "Error al enviar";
?>