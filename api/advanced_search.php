<?php
include 'db_connect.php';

// Nhận các tham số từ URL
$title = isset($_GET['title']) ? $_GET['title'] : '';
$genre = isset($_GET['genre']) ? $_GET['genre'] : '';
$country = isset($_GET['country']) ? $_GET['country'] : '';
$year = isset($_GET['year']) ? $_GET['year'] : '';
$actor = isset($_GET['actor']) ? $_GET['actor'] : '';
$director = isset($_GET['director']) ? $_GET['director'] : '';

// Bắt đầu câu truy vấn cơ bản
$sql = "SELECT * FROM movies WHERE 1=1";
$params = [];
$types = "";

// Cộng dồn các điều kiện lọc (nếu có)
if (!empty($title)) {
    $sql .= " AND title LIKE ?";
    $params[] = "%" . $title . "%";
    $types .= "s";
}
if (!empty($genre)) {
    $sql .= " AND genre LIKE ?";
    $params[] = "%" . $genre . "%";
    $types .= "s";
}
if (!empty($country)) {
    $sql .= " AND country LIKE ?";
    $params[] = "%" . $country . "%";
    $types .= "s";
}
if (!empty($year)) {
    $sql .= " AND release_year = ?";
    $params[] = $year;
    $types .= "i";
}
if (!empty($actor)) {
    $sql .= " AND actors LIKE ?";
    $params[] = "%" . $actor . "%";
    $types .= "s";
}
if (!empty($director)) {
    $sql .= " AND director LIKE ?";
    $params[] = "%" . $director . "%";
    $types .= "s";
}

$sql .= " ORDER BY id DESC";

// Chuẩn bị và thực thi
$stmt = $conn->prepare($sql);
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$result = $stmt->get_result();

$movies = [];
while ($row = $result->fetch_assoc()) {
    $movies[] = $row;
}

echo json_encode($movies);
$conn->close();
?>