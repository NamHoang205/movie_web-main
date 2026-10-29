<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

include 'db_connect.php';

// Nhận dữ liệu JSON
$data = json_decode(file_get_contents("php://input"));

if (isset($data->email)) {
    $email = $conn->real_escape_string($data->email);

    // 1. Kiểm tra email người nhận có tồn tại trong hệ thống không
    $checkUser = $conn->query("SELECT id, username FROM users WHERE email = '$email'");
    
    if ($checkUser->num_rows > 0) {
        $user = $checkUser->fetch_assoc();
        
        // 2. Tạo token và lưu vào DB
        $token = bin2hex(random_bytes(32)); 
        $conn->query("DELETE FROM password_resets WHERE email = '$email'");
        $sql = "INSERT INTO password_resets (email, token) VALUES ('$email', '$token')";
        
        if ($conn->query($sql)) {
            // Tạo Link Reset
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
            $host = $_SERVER['HTTP_HOST'];
            $resetLink = $protocol . "://" . $host . "/signup-in-main/reset_password/index.html?token=" . $token . "&email=" . $email;

            // --- CẤU HÌNH GỬI MAIL ---
            $mail = new PHPMailer(true);

            try {
                // Bật chế độ debug nếu muốn xem lỗi chi tiết (xóa dấu // ở dòng dưới khi cần)
                // $mail->SMTPDebug = 2; 

                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                
                // --- THÔNG TIN EMAIL GỬI MỚI CỦA BẠN ---
                $mail->Username   = 'japananimevietsub12@gmail.com'; // Email gửi
                $mail->Password   = 'xkkq zwfq gdda phev'; // <--- QUAN TRỌNG: Thay 16 ký tự App Password của japananimevietsub12 vào đây
                // ---------------------------------------

                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port       = 465;
                $mail->CharSet    = 'UTF-8';

                // Người gửi
                $mail->setFrom('japananimevietsub12@gmail.com', 'Hỗ Trợ Movie Web'); // Tên hiển thị khi gửi đến
                
                // Người nhận (Là email khách nhập vào)
                $mail->addAddress($email, $user['username']);

                // Nội dung
                $mail->isHTML(true);
                $mail->Subject = 'Yêu cầu đặt lại mật khẩu';
                $mail->Body    = "
                    <div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
                        <h3 style='color: #d32f2f;'>Xin chào {$user['username']},</h3>
                        <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn trên <strong>Movie Web</strong>.</p>
                        <p>Vui lòng bấm vào nút bên dưới để tạo mật khẩu mới:</p>
                        <p>
                            <a href='$resetLink' style='background-color: #ffd700; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;'>
                                Đặt Lại Mật Khẩu
                            </a>
                        </p>
                        <p style='font-size: 0.9em; color: #666;'>Hoặc copy đường dẫn này: <br> <a href='$resetLink'>$resetLink</a></p>
                        <hr style='border: none; border-top: 1px solid #eee;'>
                        <p style='font-size: 0.8em; color: #999;'>Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
                    </div>
                ";

                $mail->send();
                
                echo json_encode([
                    'success' => true, 
                    'message' => 'Đã gửi email thành công! Vui lòng kiểm tra hộp thư đến hoặc Spam.'
                ]);
            } catch (Exception $e) {
                echo json_encode([
                    'success' => false, 
                    'message' => "Lỗi gửi mail: " . $mail->ErrorInfo
                ]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi Database: ' . $conn->error]);
        }
    } else {
        // Lỗi này hiện ra nếu email khách nhập KHÔNG có trong database
        echo json_encode(['success' => false, 'message' => 'Email này chưa được đăng ký tài khoản!']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Vui lòng nhập email!']);
}
$conn->close();
?>