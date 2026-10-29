<?php
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->token) && isset($data->email)) {
    $token = $conn->real_escape_string($data->token);
    $email = $conn->real_escape_string($data->email);

    // Kiểm tra token và email có khớp nhau trong database không
    $check = $conn->query("SELECT id FROM password_resets WHERE email='$email' AND token='$token'");

    if ($check->num_rows > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Token không hợp lệ hoặc đã hết hạn']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Thiếu dữ liệu']);
}
$conn->close();
?>