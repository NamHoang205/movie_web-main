<?php
include 'db_connect.php';

// Lấy từ khóa tìm kiếm từ URL (ví dụ: ?q=venom)
$search_query = isset($_GET['q']) ? $_GET['q'] : '';

if (!empty($search_query)) {
    // Thêm ký tự '%' để tìm kiếm gần đúng
    $like_query = "%" . $search_query . "%";

    // Dùng LIKE để tìm các phim có tên chứa từ khóa
    $sql = "SELECT * FROM movies WHERE title LIKE ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $like_query);
    $stmt->execute();
    $result = $stmt->get_result();

    $movies = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $movies[] = $row;
        }
    }
    echo json_encode($movies); // Trả về mảng phim tìm được
    $stmt->close();
} else {
    // Nếu không có từ khóa, trả về mảng rỗng
    echo json_encode([]);
}

$conn->close();
?>