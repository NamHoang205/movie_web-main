<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Không được phép.']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'] ?? 0;

// Ngăn admin tự xóa chính mình
if ($user_id > 0 && $user_id != $_SESSION['user_id']) {
    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Xóa người dùng thành công!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Xóa thất bại.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Không thể tự xóa chính mình hoặc ID không hợp lệ.']);
}

$conn->close();
?>