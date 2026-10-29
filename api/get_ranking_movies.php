<?php
include 'db_connect.php';

// Lấy danh sách phim, sắp xếp theo lượt VIEW giảm dần
// Sử dụng LEFT JOIN để kể cả phim chưa có đánh giá vẫn hiện ra (nếu có view)
$sql = "
    SELECT 
        M.*, 
        AVG(R.rating) as avg_rating,
        COUNT(R.id) as review_count
    FROM 
        movies M
    LEFT JOIN 
        reviews R ON M.id = R.movie_id
    GROUP BY 
        M.id
    ORDER BY 
        M.views DESC, avg_rating DESC
    LIMIT 5;
";

$result = $conn->query($sql);

$ranking_movies = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Làm tròn điểm số nếu có
        $row['avg_rating'] = $row['avg_rating'] ? round($row['avg_rating'], 1) : 0;
        $ranking_movies[] = $row;
    }
}

echo json_encode($ranking_movies);
$conn->close();
?>