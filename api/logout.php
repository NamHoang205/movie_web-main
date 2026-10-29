<?php
session_start(); // Bắt đầu session

// Hủy tất cả các biến session
$_SESSION = array();

// Hủy session
session_destroy();

// Trả về thông báo thành công
header('Content-Type: application/json');
echo json_encode(['success' => true, 'message' => 'Đăng xuất thành công!']);
?>