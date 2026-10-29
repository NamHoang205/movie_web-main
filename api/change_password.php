<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Bạn cần đăng nhập.']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $_SESSION['user_id'];

$current_password = $data['current_password'];
$new_password = $data['new_password'];
$confirm_password = $data['confirm_password'];

if ($new_password !== $confirm_password) {
    echo json_encode(['success' => false, 'message' => 'Mật khẩu mới không khớp.']);
    exit();
}

if (strlen($new_password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Mật khẩu mới phải có ít nhất 6 ký tự.']);
    exit();
}

// Lấy mật khẩu đã mã hóa hiện tại từ DB
$sql = "SELECT password FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// So sánh mật khẩu hiện tại người dùng nhập với mật khẩu trong DB
if (password_verify($current_password, $user['password'])) {
    // Nếu đúng, mã hóa mật khẩu mới và cập nhật
    $hashed_new_password = password_hash($new_password, PASSWORD_DEFAULT);
    
    $update_sql = "UPDATE users SET password = ? WHERE id = ?";
    $update_stmt = $conn->prepare($update_sql);
    $update_stmt->bind_param("si", $hashed_new_password, $user_id);

    if ($update_stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Đổi mật khẩu thành công!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Đã có lỗi xảy ra khi cập nhật.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Mật khẩu hiện tại không chính xác.']);
}

$conn->close();
?>