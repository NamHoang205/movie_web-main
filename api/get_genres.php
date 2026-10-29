<?php
include 'db_connect.php';

// Lấy tất cả chuỗi genre từ database
$sql = "SELECT DISTINCT genre FROM movies WHERE genre IS NOT NULL AND genre != ''";
$result = $conn->query($sql);

$all_genres = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Tách chuỗi bằng dấu phẩy (Ví dụ: "Action, Adventure" -> ["Action", "Adventure"])
        $genres_array = explode(',', $row['genre']);
        
        foreach ($genres_array as $g) {
            // Xóa khoảng trắng thừa và thêm vào mảng
            $clean_genre = trim($g);
            if (!empty($clean_genre)) {
                $all_genres[] = $clean_genre;
            }
        }
    }
}

// Loại bỏ trùng lặp (unique) và sắp xếp A-Z
$unique_genres = array_unique($all_genres);
sort($unique_genres);

echo json_encode(array_values($unique_genres)); // array_values để reset key về 0,1,2...

$conn->close();
?>