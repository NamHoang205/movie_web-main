<?php
include 'db_connect.php';
$data = json_decode(file_get_contents('php://input'), true);

$title = $data['title'] ?? '';
$genre = $data['genre'] ?? '';
$duration_min = $data['duration_min'] ?? 0;
$poster_url = $data['poster_url'] ?? '';
$description = $data['description'] ?? '';
$trailer_url = $data['trailer_url'] ?? '';
$movie_source_url = $data['movie_source_url'] ?? '';
// Các trường mới
$country = $data['country'] ?? '';
$director = $data['director'] ?? '';
$actors = $data['actors'] ?? '';
$release_year = $data['release_year'] ?? 0;

if (empty($title) || empty($poster_url)) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng điền tên phim và poster.']);
    exit();
}

$sql = "INSERT INTO movies (title, genre, duration_min, poster_url, description, trailer_url, movie_source_url, country, director, actors, release_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
// s: string, i: integer. Chuỗi format: ssisssssssi
$stmt->bind_param("ssisssssssi", $title, $genre, $duration_min, $poster_url, $description, $trailer_url, $movie_source_url, $country, $director, $actors, $release_year);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Thêm phim thành công!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $stmt->error]);
}
$stmt->close();
$conn->close();
?>