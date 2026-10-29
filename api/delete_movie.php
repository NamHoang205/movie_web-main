<?php
include 'db_connect.php';
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

$sql = "DELETE FROM movies WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Xóa phim thành công!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Xóa phim thất bại.']);
}
$stmt->close();
$conn->close();
?>