<?php
include 'db_connect.php';

$response = [
    'genres' => [],
    'countries' => [],
    'years' => []
];

// 1. LẤY DANH SÁCH THỂ LOẠI (Giữ nguyên logic cũ: Tách chuỗi)
$sql_genre = "SELECT DISTINCT genre FROM movies WHERE genre IS NOT NULL AND genre != ''";
$result_genre = $conn->query($sql_genre);
$temp_genres = [];
if ($result_genre) {
    while ($row = $result_genre->fetch_assoc()) {
        $parts = explode(',', $row['genre']);
        foreach ($parts as $part) {
            $clean = trim($part);
            if (!empty($clean)) {
                $temp_genres[] = $clean;
            }
        }
    }
}
$response['genres'] = array_values(array_unique($temp_genres));
sort($response['genres']);

// 2. LẤY DANH SÁCH QUỐC GIA (SỬA LẠI: Tách chuỗi giống Thể loại)
$sql_country = "SELECT DISTINCT country FROM movies WHERE country IS NOT NULL AND country != ''";
$result_country = $conn->query($sql_country);
$temp_countries = []; // Mảng tạm để chứa quốc gia đã tách

if ($result_country) {
    while ($row = $result_country->fetch_assoc()) {
        // Tách chuỗi bằng dấu phẩy (Ví dụ: "Trung Quốc, Âu Mỹ" -> ["Trung Quốc", "Âu Mỹ"])
        $parts = explode(',', $row['country']);
        foreach ($parts as $part) {
            $clean = trim($part); // Xóa khoảng trắng thừa đầu đuôi
            if (!empty($clean)) {
                $temp_countries[] = $clean;
            }
        }
    }
}
// Loại bỏ trùng lặp (array_unique) và sắp xếp A-Z (sort)
$response['countries'] = array_values(array_unique($temp_countries));
sort($response['countries']);

// 3. LẤY DANH SÁCH NĂM (Giữ nguyên)
$sql_year = "SELECT DISTINCT release_year FROM movies WHERE release_year IS NOT NULL AND release_year > 0 ORDER BY release_year DESC";
$result_year = $conn->query($sql_year);
if ($result_year) {
    while ($row = $result_year->fetch_assoc()) {
        $response['years'][] = $row['release_year'];
    }
}

echo json_encode($response);
$conn->close();
?>