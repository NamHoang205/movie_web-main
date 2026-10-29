<?php
session_start();
include 'db_connect.php';

// Bảo vệ API, chỉ admin mới có quyền xem danh sách người dùng
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(['error' => 'Không được phép.']);
    exit();
}

// Lấy tất cả người dùng trừ mật khẩu
$sql = "SELECT id, username, email, role, created_at FROM users";
$result = $conn->query($sql);

$users = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);

$conn->close();
?>