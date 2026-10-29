document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video-player');
    const params = new URLSearchParams(window.location.search);
    
    // Lấy cả ID và Nguồn phim từ URL (nhờ Bước 1)
    const movieId = params.get('id');
    const movieUrl = params.get('source');

    // --- XỬ LÝ PHÁT VIDEO (Giữ nguyên như cũ) ---
    if (!movieUrl) {
        alert("Không tìm thấy nguồn phim!");
        return;
    }
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(movieUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = movieUrl;
    } else {
        alert("Trình duyệt của bạn không hỗ trợ xem phim định dạng này.");
    }

    // --- PHẦN MỚI: TẢI THÔNG TIN PHIM ---
    if (movieId) {
        fetch(`../api/get_movie_details.php?id=${movieId}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) { return; }
                
                // Cập nhật tiêu đề và mô tả
                document.title = `Đang xem: ${data.title}`;
                document.getElementById('movie-title').textContent = data.title;
                document.getElementById('movie-description').textContent = data.description || "Không có mô tả.";
            })
            .catch(err => {
                console.error("Lỗi tải chi tiết phim:", err);
                document.getElementById('movie-title').textContent = "Không thể tải thông tin phim.";
            });
    } else {
        document.getElementById('movie-title').textContent = "Không rõ phim";
    }
});