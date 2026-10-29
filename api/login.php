<?php
session_start();

include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];

// Lấy thêm cột 'email' để lưu vào session
$sql = "SELECT id, username, email, password, role FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    if (password_verify($password, $user['password'])) {
        // Lưu thêm 'email' vào session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['email'] = $user['email']; // DÒNG MỚI QUAN TRỌNG
        
        echo json_encode(['success' => true, 'message' => 'Đăng nhập thành công!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Sai mật khẩu. Vui lòng thử lại.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Email không tồn tại.']);
}

$stmt->close();
$conn->close();
?>