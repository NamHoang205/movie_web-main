<?php
include 'db_connect.php';

$movie_id = isset($_GET['movie_id']) ? (int)$_GET['movie_id'] : 0;

if ($movie_id > 0) {
    $sql = "SELECT username, rating, comment, created_at FROM reviews WHERE movie_id = ? ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $movie_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $reviews = [];
    while($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }
    echo json_encode($reviews);
} else {
    echo json_encode([]);
}

$conn->close();
?>