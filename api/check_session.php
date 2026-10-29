<?php
session_start();

header('Content-Type: application/json');

// Kiểm tra và trả về cả 'email'
if (isset($_SESSION['user_id']) && isset($_SESSION['username'])) {
    echo json_encode([
        'loggedIn' => true,
        'username' => $_SESSION['username'],
        'role' => $_SESSION['role'] ?? 'user',
        'email' => $_SESSION['email'] ?? '' // DÒNG MỚI QUAN TRỌNG
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}
?>