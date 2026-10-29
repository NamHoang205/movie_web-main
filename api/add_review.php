<?php
session_start();
include 'db_connect.php';

// --- BƯỚC 1: KIỂM TRA ĐĂNG NHẬP ---
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: Bạn cần đăng nhập để thực hiện hành động này.']);
    exit();
}

// --- BƯỚC 2: NHẬN VÀ KIỂM TRA DỮ LIỆU ---
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: Không nhận được dữ liệu từ form.']);
    exit();
}

$movie_id = $data['movie_id'] ?? 0;
$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];
$rating = $data['rating'] ?? 0;
$comment = $data['comment'] ?? '';

// Kiểm tra các giá trị bắt buộc
if ($movie_id <= 0 || $rating <= 0) {
    echo json_encode(['success' => false, 'message' => 'Lỗi: Vui lòng chọn phim và số sao đánh giá.']);
    exit();
}

// --- BƯỚC 3: THỰC THI TRUY VẤN ---
$sql = "INSERT INTO reviews (movie_id, user_id, username, rating, comment) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Lỗi SQL: ' . $conn->error]);
    exit();
}

$stmt->bind_param("iisis", $movie_id, $user_id, $username, $rating, $comment);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Cảm ơn bạn đã đánh giá!']);
} else {
    // Trả về lỗi chi tiết từ MySQL
    echo json_encode(['success' => false, 'message' => 'Lỗi khi thực thi: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>