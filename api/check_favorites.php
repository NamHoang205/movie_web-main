<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode([]); // Trả về mảng rỗng nếu chưa đăng nhập
    exit();
}

$user_id = $_SESSION['user_id'];
$sql = "SELECT movie_id FROM favorites WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$favorite_ids = [];
while ($row = $result->fetch_assoc()) {
    $favorite_ids[] = $row['movie_id'];
}

echo json_encode($favorite_ids);
$conn->close();
?>