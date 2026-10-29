<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Bạn cần đăng nhập.']);
    exit();
}

$user_id = $_SESSION['user_id'];

// Lấy tất cả review của user_id này, kèm theo tên phim
$sql = "SELECT R.rating, R.comment, R.created_at, M.title as movie_title, M.id as movie_id
        FROM reviews R
        JOIN movies M ON R.movie_id = M.id
        WHERE R.user_id = ?
        ORDER BY R.created_at DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$reviews = [];
while($row = $result->fetch_assoc()) {
    $reviews[] = $row;
}

echo json_encode($reviews);

$conn->close();
?>