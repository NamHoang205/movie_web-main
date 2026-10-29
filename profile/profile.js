document.addEventListener("DOMContentLoaded", function () {
  // --- 1. LẤY THÔNG TIN CÁ NHÂN ---
  fetch("../api/check_session.php")
    .then((res) => res.json())
    .then((data) => {
      if (!data.loggedIn) {
        window.location.href = "../signup-in-main/login/index.html";
        return;
      }
      document.getElementById("username").textContent = data.username;
      document.getElementById("username-title").textContent = data.username; // Tiêu đề lớn
      document.getElementById("email").textContent =
        data.email || "Chưa cập nhật";
    });

  // --- 2. LẤY DANH SÁCH PHIM YÊU THÍCH (MỚI) ---
  fetchFavorites();

  function fetchFavorites() {
    const favContainer = document.getElementById("favorites-list");
    
    fetch("../api/get_favorites.php")
      .then((res) => res.json())
      .then((movies) => {
        favContainer.innerHTML = "";
        
        if (movies.length === 0) {
          favContainer.innerHTML = "<p style='grid-column: 1/-1; color: #aaa;'>Bạn chưa thích phim nào.</p>";
          return;
        }

        movies.forEach((movie) => {
          const movieEl = document.createElement("div");
          movieEl.className = "fav-item";
          movieEl.innerHTML = `
              <img src="${movie.poster_url}" alt="${movie.title}">
              <div class="fav-info">
                  <h3>${movie.title}</h3>
                  <div class="fav-btn-group">
                      <a href="../movie_page/movie.html?id=${movie.id}" class="btn-view-fav">Xem</a>
                      <button class="btn-remove-fav" onclick="removeFavorite(${movie.id})"><i class='bx bxs-trash'></i></button>
                  </div>
              </div>
          `;
          favContainer.appendChild(movieEl);
        });
      })
      .catch(err => console.error("Lỗi tải favorites:", err));
  }

  // Hàm xóa phim khỏi danh sách yêu thích
  window.removeFavorite = function(movieId) {
      Swal.fire({
          title: 'Bỏ thích phim này?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Đúng, bỏ đi',
          cancelButtonText: 'Không'
      }).then((result) => {
          if (result.isConfirmed) {
              fetch("../api/toggle_favorite.php", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ movie_id: movieId }),
              })
              .then(res => res.json())
              .then(data => {
                  if (data.success) {
                      fetchFavorites(); // Tải lại danh sách
                      Swal.fire('Đã xóa', '', 'success');
                  }
              });
          }
      });
  };

  // --- 3. LẤY LỊCH SỬ BÌNH LUẬN (GIỮ NGUYÊN) ---
  fetch("../api/get_user_reviews.php")
    .then((res) => res.json())
    .then((reviews) => {
      const historyContainer = document.getElementById("reviews-history");
      historyContainer.innerHTML = "";
      if (reviews.length === 0) {
        historyContainer.innerHTML = "<p style='color:#aaa'>Bạn chưa có bình luận nào.</p>";
        return;
      }
      reviews.forEach((review) => {
        const ratingStars =
          "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
        const reviewDate = new Date(review.created_at).toLocaleDateString(
          "vi-VN"
        );

        const reviewEl = document.createElement("div");
        reviewEl.className = "review-item";
        reviewEl.innerHTML = `
            <div class="review-info">
                Đã đánh giá <a href="../movie_page/movie.html?id=${review.movie_id}">${review.movie_title}</a>
                <span class="rating-display">${ratingStars}</span> - ${reviewDate}
            </div>
            <p>"${review.comment}"</p>
        `;
        historyContainer.appendChild(reviewEl);
      });
    });

  // --- 4. XỬ LÝ ĐỔI MẬT KHẨU (GIỮ NGUYÊN) ---
  document.getElementById("change-password-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const current_password = document.getElementById("current_password").value;
      const new_password = document.getElementById("new_password").value;
      const confirm_password = document.getElementById("confirm_password").value;

      if(new_password !== confirm_password) {
          Swal.fire('Lỗi', 'Mật khẩu mới không khớp!', 'error');
          return;
      }

      fetch("../api/change_password.php", {
        method: "POST",
        body: JSON.stringify({
          current_password,
          new_password,
          confirm_password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire({
            title: data.success ? "Thành công!" : "Lỗi!",
            text: data.message,
            icon: data.success ? "success" : "error",
          });
          if (data.success) {
            document.getElementById("change-password-form").reset();
          }
        });
    });
});