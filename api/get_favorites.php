<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Bạn cần đăng nhập.']);
    exit();
}

$user_id = $_SESSION['user_id'];

// Lấy thông tin các phim mà user đã thích
$sql = "SELECT M.* FROM movies M JOIN favorites F ON M.id = F.movie_id WHERE F.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$movies = [];
while($row = $result->fetch_assoc()) {
    $movies[] = $row;
}

echo json_encode($movies);
$conn->close();
?>