<?php
session_start();
include 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Bạn cần đăng nhập.']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $_SESSION['user_id'];
$movie_id = $data['movie_id'] ?? 0;

if ($movie_id > 0) {
    // Kiểm tra xem đã tồn tại chưa
    $check_sql = "SELECT * FROM favorites WHERE user_id = ? AND movie_id = ?";
    $stmt = $conn->prepare($check_sql);
    $stmt->bind_param("ii", $user_id, $movie_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Nếu đã tồn tại -> Xóa (Bỏ thích)
        $delete_sql = "DELETE FROM favorites WHERE user_id = ? AND movie_id = ?";
        $stmt_del = $conn->prepare($delete_sql);
        $stmt_del->bind_param("ii", $user_id, $movie_id);
        if ($stmt_del->execute()) {
            echo json_encode(['success' => true, 'action' => 'removed']);
        }
    } else {
        // Nếu chưa tồn tại -> Thêm (Thích)
        $insert_sql = "INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)";
        $stmt_ins = $conn->prepare($insert_sql);
        $stmt_ins->bind_param("ii", $user_id, $movie_id);
        if ($stmt_ins->execute()) {
            echo json_encode(['success' => true, 'action' => 'added']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'ID phim không hợp lệ.']);
}
$conn->close();
?>