<?php
// Bật hiển thị lỗi chi tiết (CHỈ ĐỂ DEBUG - SẼ TẮT SAU)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Thiết lập header TRƯỚC khi có bất kỳ output nào
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Cho phép CORS
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Thông tin kết nối CỦA BẠN (Kiểm tra lại kỹ)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "movie_web";

// Thử kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối và trả về lỗi JSON nếu thất bại
if ($conn->connect_error) {
    // Gửi mã lỗi 500 nếu kết nối thất bại
    http_response_code(500);
    // Trả về lỗi dưới dạng JSON để JavaScript có thể đọc
    echo json_encode([
        'success' => false,
        'message' => "Lỗi Kết nối Database: " . $conn->connect_error
    ]);
    exit(); // Dừng thực thi ngay lập tức
}

// Nếu kết nối thành công, đặt charset để tránh lỗi font tiếng Việt
if (!$conn->set_charset("utf8mb4")) {
     http_response_code(500);
     echo json_encode([
         'success' => false,
         'message' => "Lỗi set charset: " . $conn->error
     ]);
     exit();
}

// KHÔNG đóng kết nối ở đây, file khác sẽ dùng $conn
// echo json_encode(['db_connect_status' => 'OK']); // Dòng test, có thể bỏ comment nếu cần
?>