<?php
// Nhúng file kết nối database
include 'db_connect.php';

// Lấy dữ liệu JSON được gửi từ script.js
$data = json_decode(file_get_contents('php://input'), true);

// Lấy thông tin từ dữ liệu
$username = $data['username'];
$email = $data['email'];
$password = $data['password'];

// --- BƯỚC VALIDATION ---
// 1. Kiểm tra xem email đã tồn tại chưa
$sql_check_email = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql_check_email);
$stmt->bind_param("s", $email);
$stmt->execute();
$result_email = $stmt->get_result();

if ($result_email->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email đã được sử dụng!']);
    $conn->close();
    exit(); // Dừng thực thi
}

// 2. Kiểm tra xem username đã tồn tại chưa
$sql_check_user = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql_check_user);
$stmt->bind_param("s", $username);
$stmt->execute();
$result_user = $stmt->get_result();

if ($result_user->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Username đã tồn tại!']);
    $conn->close();
    exit(); // Dừng thực thi
}

// --- BƯỚC XỬ LÝ ---
// Mã hóa mật khẩu - BƯỚC CỰC KỲ QUAN TRỌNG
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Chuẩn bị câu lệnh SQL để chèn người dùng mới
$sql_insert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql_insert);
$stmt->bind_param("sss", $username, $email, $hashed_password);

// Thực thi câu lệnh và trả về kết quả
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Đã có lỗi xảy ra. Vui lòng thử lại.']);
}

// Đóng kết nối
$stmt->close();
$conn->close();

?>