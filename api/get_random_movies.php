<?php
include 'db_connect.php';

// Lấy ngẫu nhiên 10 phim
$sql = "SELECT * FROM movies ORDER BY RAND() LIMIT 10";
$result = $conn->query($sql);

$movies = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $movies[] = $row;
    }
}

echo json_encode($movies);

$conn->close();
?>