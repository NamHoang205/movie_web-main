<?php
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->token) && isset($data->email) && isset($data->new_password)) {
    $token = $conn->real_escape_string($data->token);
    $email = $conn->real_escape_string($data->email);
    $new_pass = password_hash($data->new_password, PASSWORD_DEFAULT);

    $checkToken = $conn->query("SELECT * FROM password_resets WHERE email='$email' AND token='$token'");

    if ($checkToken->num_rows > 0) {
        $updateSql = "UPDATE users SET password='$new_pass' WHERE email='$email'";
        if ($conn->query($updateSql)) {
            $conn->query("DELETE FROM password_resets WHERE email='$email'");
            echo json_encode(['success' => true, 'message' => 'Đổi mật khẩu thành công!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi cập nhật: ' . $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Token không hợp lệ!']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Thiếu dữ liệu!']);
}
$conn->close();
?>