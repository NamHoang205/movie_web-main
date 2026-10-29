<?php
include 'db_connect.php';

$movie_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($movie_id > 0) {
    // --- 1. TĂNG LƯỢT XEM (Code mới thêm) ---
    $update_sql = "UPDATE movies SET views = views + 1 WHERE id = ?";
    $stmt_update = $conn->prepare($update_sql);
    $stmt_update->bind_param("i", $movie_id);
    $stmt_update->execute();
    $stmt_update->close();
    // ----------------------------------------

    // --- 2. LẤY THÔNG TIN PHIM (Giữ nguyên) ---
    $sql = "SELECT * FROM movies WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $movie_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $movie = $result->fetch_assoc();
        echo json_encode($movie);
    } else {
        echo json_encode(['error' => 'Không tìm thấy phim.']);
    }
    $stmt->close();
} else {
    echo json_encode(['error' => 'ID phim không hợp lệ.']);
}

$conn->close();
?>