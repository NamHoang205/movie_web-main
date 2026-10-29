<?php
include 'db_connect.php';

// Câu lệnh SQL để tính toán và xếp hạng phim
// 1. AVG(R.rating) as avg_rating: Tính điểm trung bình và đặt tên là avg_rating
// 2. COUNT(R.id) as review_count: Đếm số lượt đánh giá
// 3. INNER JOIN: Kết nối bảng movies (M) và reviews (R)
// 4. GROUP BY M.id: Nhóm tất cả đánh giá theo từng phim
// 5. ORDER BY avg_rating DESC, review_count DESC: Ưu tiên phim điểm cao, nếu điểm bằng nhau thì ưu tiên phim có nhiều lượt đánh giá hơn
// 6. LIMIT 10: Chỉ lấy 10 kết quả đầu tiên
$sql = "
    SELECT 
        M.*, 
        AVG(R.rating) as avg_rating,
        COUNT(R.id) as review_count
    FROM 
        movies M
    INNER JOIN 
        reviews R ON M.id = R.movie_id
    GROUP BY 
        M.id
    ORDER BY 
        avg_rating DESC, review_count DESC
    LIMIT 10;
";

$result = $conn->query($sql);

$top_movies = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $top_movies[] = $row;
    }
}

echo json_encode($top_movies);

$conn->close();
?>