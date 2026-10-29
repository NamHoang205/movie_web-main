<?php
include 'db_connect.php'; // Đã bao gồm header JSON và kết nối $conn

// Bật báo cáo lỗi chi tiết (CHỈ DÙNG ĐỂ DEBUG, nên tắt đi sau khi sửa xong)
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

try {
    // --- Trường hợp có yêu cầu phân trang (Trang chủ) ---
    if (isset($_GET['page'])) {
        $movies_per_page = 10;
        $base_sql_select = "SELECT * FROM movies";
        $base_sql_count = "SELECT COUNT(id) as total FROM movies";
        $where_clause = "";
        $params_where = []; // Mảng chứa tham số cho WHERE
        $types_where = "";   // Chuỗi chứa kiểu dữ liệu cho WHERE

        // Xử lý lọc theo thể loại
        // Xử lý lọc theo thể loại (Đa thể loại - Fix)
        if (isset($_GET['genre']) && !empty($_GET['genre'])) {
            $where_clause = " WHERE genre LIKE ?";  // Đổi thành LIKE
            $params_where[] = "%" . $_GET['genre'] . "%"; // Thêm dấu % để tìm kiếm chuỗi con
            $types_where .= "s";
        }

        // --- Đếm tổng số phim (có áp dụng filter nếu cần) ---
        $total_movies_sql = $base_sql_count . $where_clause;
        $stmt_total = $conn->prepare($total_movies_sql);
        if (!$stmt_total) throw new Exception("SQL Error (Count Prepare): " . $conn->error);
        if (!empty($params_where)) {
            // Chỉ bind nếu có tham số WHERE
            $stmt_total->bind_param($types_where, ...$params_where);
        }
        if(!$stmt_total->execute()) throw new Exception("SQL Error (Count Execute): " . $stmt_total->error);
        $total_result = $stmt_total->get_result();
        $total_row = $total_result->fetch_assoc();
        $total_movies = $total_row['total'];
        $total_pages = ceil($total_movies / $movies_per_page);
        $stmt_total->close();

        // --- Tính toán phân trang ---
        $current_page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        if ($current_page < 1) $current_page = 1;
        $offset = ($current_page - 1) * $movies_per_page;

        // --- Lấy phim cho trang hiện tại (có áp dụng filter và phân trang) ---
        $sql = $base_sql_select . $where_clause . " ORDER BY id DESC LIMIT ? OFFSET ?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) throw new Exception("SQL Error (Select Prepare): " . $conn->error);

        // --- Gắn tham số động ---
        $types_final = $types_where . "ii"; // Thêm kiểu 'integer' cho LIMIT và OFFSET
        $params_final = array_merge($params_where, [$movies_per_page, $offset]); // Gộp mảng tham số

        // Kiểm tra xem có tham số nào không trước khi bind
        if (!empty($params_final)) {
             $stmt->bind_param($types_final, ...$params_final);
        }
        // --- Kết thúc gắn tham số ---

        if(!$stmt->execute()) throw new Exception("SQL Error (Select Execute): " . $stmt->error);
        $result = $stmt->get_result();

        $movies = [];
        while($row = $result->fetch_assoc()) { $movies[] = $row; }
        $stmt->close();

        // Trả về kết quả cho trang chủ
        echo json_encode([
            'movies' => $movies,
            'totalPages' => $total_pages,
            'currentPage' => $current_page
        ]);

    // --- Trường hợp không phân trang (Trang Admin) ---
    } else {
        $sql = "SELECT * FROM movies ORDER BY id DESC";
        $result = $conn->query($sql);
        if ($result === false) throw new Exception("SQL Error (Select All): " . $conn->error);

        $movies = [];
        while($row = $result->fetch_assoc()) { $movies[] = $row; }

        // Trả về kết quả cho trang Admin
        echo json_encode($movies);
    }

} catch (Exception $e) {
    // Nếu có bất kỳ lỗi nào xảy ra, trả về lỗi JSON
    http_response_code(500); // Set HTTP status code to 500
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    // Luôn đóng kết nối
    if (isset($conn)) { $conn->close(); }
}
?>