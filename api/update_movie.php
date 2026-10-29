<?php
include 'db_connect.php';
$data = json_decode(file_get_contents('php://input'), true);

$sql = "UPDATE movies SET title=?, genre=?, duration_min=?, poster_url=?, description=?, trailer_url=?, movie_source_url=?, country=?, director=?, actors=?, release_year=? WHERE id=?";
$stmt = $conn->prepare($sql);
// Chuỗi format: ssisssssssii (thêm id ở cuối là i)
$stmt->bind_param("ssisssssssii", $data['title'], $data['genre'], $data['duration_min'], $data['poster_url'], $data['description'], $data['trailer_url'], $data['movie_source_url'], $data['country'], $data['director'], $data['actors'], $data['release_year'], $data['id']);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Cập nhật thành công!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $stmt->error]);
}
$stmt->close();
$conn->close();
?>