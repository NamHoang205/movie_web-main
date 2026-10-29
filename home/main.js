document.addEventListener("DOMContentLoaded", function () {
  // --- 1. KHAI BÁO BIẾN ---
  const moviesContainer = document.querySelector(".movies-container");
  const paginationContainer = document.getElementById("pagination-container");
  let favoriteMovieIds = [];
  let sessionData = {};

  // --- 2. KIỂM TRA SESSION & CẬP NHẬT HEADER ---
  fetch("../api/check_session.php")
    .then((response) => response.json())
    .then((data) => {
      sessionData = data;
      if (data.loggedIn) {
        const header = document.querySelector("header");
        // Tìm nút login (nút cuối cùng có class .btn)
        const loginButtons = header.querySelectorAll("a.btn");
        const loginBtn = loginButtons[loginButtons.length - 1]; 
        
        if (loginBtn) {
            loginBtn.textContent = `Hi, ${data.username}`;
            loginBtn.href = "../profile/profile.html";

            const logoutBtn = document.createElement("a");
            logoutBtn.href = "#";
            logoutBtn.className = "btn";
            logoutBtn.textContent = "Logout";
            logoutBtn.style.marginLeft = "15px";
            logoutBtn.onclick = function (e) {
              e.preventDefault();
              fetch("../api/logout.php")
                .then((res) => res.json())
                .then((logoutData) => {
                  if (logoutData.success) {
                    window.location.reload();
                  }
                });
            };
            loginBtn.insertAdjacentElement("afterend", logoutBtn);
        }
      }
    });

  // --- 3. CÁC HÀM HIỂN THỊ (RENDER) ---
  function renderMovies(movies) {
    if (!moviesContainer) return;
    moviesContainer.innerHTML = "";
    if (movies.length === 0) {
      moviesContainer.innerHTML = '<p class="not-found">Không tìm thấy phim nào.</p>';
      return;
    }
    movies.forEach((movie) => {
      const movieLink = document.createElement("a");
      movieLink.classList.add("box");
      movieLink.href = `../movie_page/movie.html?id=${movie.id}`;
      movieLink.innerHTML = `
              <div class="box-img">
                  <img src="${movie.poster_url}" alt="${movie.title}" loading="lazy">
                  <div class="favorite-heart" data-movieid="${movie.id}">
                      <i class='bx bx-heart'></i>
                  </div>
              </div>
              <h3>${movie.title}</h3>
              <span>${movie.duration_min} min | ${movie.genre}</span>`;
      moviesContainer.appendChild(movieLink);
    });
    updateFavoriteHearts();
  }

  function updateFavoriteHearts() {
    document.querySelectorAll(".favorite-heart").forEach((heart) => {
      const movieId = heart.dataset.movieid;
      const icon = heart.querySelector("i");
      if (favoriteMovieIds.includes(parseInt(movieId))) {
        heart.classList.add("favorited");
        icon.classList.remove("bx-heart");
        icon.classList.add("bxs-heart");
      } else {
        heart.classList.remove("favorited");
        icon.classList.remove("bxs-heart");
        icon.classList.add("bx-heart");
      }
    });
  }

  function renderPagination(totalPages, currentPage) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = "";
    if (totalPages <= 1) return;
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      pageBtn.classList.add("page-btn");
      if (i === currentPage) {
        pageBtn.classList.add("active");
      }
      pageBtn.addEventListener("click", () => {
        fetchMoviesByPage(i);
      });
      paginationContainer.appendChild(pageBtn);
    }
  }

  // --- 4. CÁC HÀM TẢI DỮ LIỆU (FETCH) ---
  
  // Hàm 4.1: Lấy danh sách phim theo trang
  function fetchMoviesByPage(pageNumber) {
    let url = `../api/get_movies.php?page=${pageNumber}`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        renderMovies(data.movies);
        renderPagination(data.totalPages, data.currentPage);
      });
  }

  // Hàm 4.2: Hero Slider (Top 3)
  function fetchHeroMovies() {
    fetch("../api/get_top_rated_movies.php")
      .then((response) => response.json())
      .then((movies) => {
        const swiperWrapper = document.querySelector(".home .swiper-wrapper");
        if (!swiperWrapper) return;
        swiperWrapper.innerHTML = "";
        const top3Movies = movies.slice(0, 3);
        top3Movies.forEach((movie) => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide container";
          slide.innerHTML = `
            <img src="${movie.poster_url}" alt="${movie.title}">
            <div class="home-text">
              <span>${movie.genre}</span>
              <h1>${movie.title}</h1>
              <a href="../movie_page/movie.html?id=${movie.id}" class="btn">Xem Ngay</a>
            </div>
          `;
          swiperWrapper.appendChild(slide);
        });
        new Swiper(".home", {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: { delay: 5000, disableOnInteraction: false },
          pagination: { el: ".swiper-pagination", clickable: true },
          navigation: false,
        });
      });
  }

  // Hàm 4.3: Top Rated
  function fetchTopRatedMovies() {
      fetch("../api/get_top_rated_movies.php")
      .then((response) => response.json())
      .then((movies) => {
        const container = document.querySelector(".top-rated-container .swiper-wrapper");
        if (!container) return;
        container.innerHTML = "";
        movies.forEach((movie) => {
          const movieSlide = document.createElement("div");
          movieSlide.classList.add("swiper-slide");
          const avgRating = parseFloat(movie.avg_rating).toFixed(1);
          movieSlide.innerHTML = `
              <a href="../movie_page/movie.html?id=${movie.id}" class="box">
                  <div class="box-img"><img src="${movie.poster_url}" alt="" loading="lazy"></div>
                  <h3>${movie.title}</h3>
                  <span>${movie.duration_min} min | ${movie.genre}</span>
                  <div class="rating-display-home">★ ${avgRating}</div>
              </a>`;
          container.appendChild(movieSlide);
        });
        
        // --- FIX LỖI CONSOLE SWIPER LOOP ---
        // Chỉ bật loop khi số lượng phim >= 10 (vì max slidesPerView là 5)
        const enableLoop = movies.length >= 10; 

        new Swiper(".top-rated-container", {
          spaceBetween: 10,
          loop: enableLoop,
          autoplay: { delay: 4000, disableOnInteraction: false },
          navigation: { nextEl: ".top-rated-container .swiper-button-next", prevEl: ".top-rated-container .swiper-button-prev" },
          centeredSlides: enableLoop, // Chỉ căn giữa nếu loop bật
          centerInsufficientSlides: true, // Căn giữa nếu không đủ slide
          breakpoints: { 0: { slidesPerView: 2 }, 568: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 968: { slidesPerView: 5 } },
        });
      });
  }

  // Hàm 4.4: Random Movies
  function fetchRandomMovies() {
       fetch("../api/get_random_movies.php")
      .then((response) => response.json())
      .then((movies) => {
        const container = document.querySelector(".coming-container .swiper-wrapper");
        if (!container) return;
        container.innerHTML = "";
        movies.forEach((movie) => {
          const slide = document.createElement("div");
          slide.classList.add("swiper-slide", "box");
          slide.innerHTML = `
            <div class="box-img">
                <img src="${movie.poster_url}" alt="${movie.title}" loading="lazy">
                <div class="favorite-heart" data-movieid="${movie.id}">
                      <i class='bx bx-heart'></i>
                </div>
            </div>
            <h3>${movie.title}</h3>
            <span>${movie.duration_min} min | ${movie.genre}</span>
          `;
          // Xử lý click riêng cho ảnh và tên phim để tránh xung đột với nút tim
          slide.querySelector(".box-img img").onclick = () => (window.location.href = `../movie_page/movie.html?id=${movie.id}`);
          slide.querySelector("h3").onclick = () => (window.location.href = `../movie_page/movie.html?id=${movie.id}`);
          container.appendChild(slide);
        });
        updateFavoriteHearts();
        
        // --- FIX LỖI CONSOLE SWIPER LOOP ---
        const enableLoop = movies.length >= 10;

        new Swiper(".coming-container", {
          spaceBetween: 20,
          loop: enableLoop,
          navigation: { nextEl: ".coming-container .swiper-button-next", prevEl: ".coming-container .swiper-button-prev" },
          centeredSlides: enableLoop,
          centerInsufficientSlides: true,
          breakpoints: { 0: { slidesPerView: 2 }, 568: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 968: { slidesPerView: 5 } },
        });
      });
  }
    // Hàm 4.5: Lấy Bảng Xếp Hạng (Top 5)
  // Hàm 4.5: Lấy Bảng Xếp Hạng (Top 5 View cao nhất)
  function fetchRankingMovies() {
    const rankingList = document.getElementById('ranking-list');
    if(!rankingList) return;

    // GỌI API MỚI (get_ranking_movies.php)
    fetch("../api/get_ranking_movies.php")
      .then(res => res.json())
      .then(movies => {
        rankingList.innerHTML = '';

        if(movies.length === 0) {
            rankingList.innerHTML = '<p style="color:#aaa; text-align:center;">Chưa có dữ liệu.</p>';
            return;
        }

        movies.forEach((movie, index) => {
            const rankItem = document.createElement('div');
            rankItem.className = 'ranking-item';
            rankItem.onclick = () => window.location.href = `../movie_page/movie.html?id=${movie.id}`;
            
            // Xử lý hiển thị rating và views
            const rating = movie.avg_rating > 0 ? `★ ${movie.avg_rating}` : 'Chưa có đánh giá';
            // Format số view (ví dụ: 1200 -> 1.2k) - tuỳ chọn, ở đây để nguyên số cho đơn giản
            const views = movie.views ? `${movie.views} views` : '0 views';
            
            // Màu sắc top 1, 2, 3
            let rankColor = '#555';
            if (index === 0) rankColor = '#ff2c1f'; // Đỏ (Top 1)
            else if (index === 1) rankColor = '#00bcd4'; // Xanh (Top 2)
            else if (index === 2) rankColor = '#cd7f32'; // Đồng (Top 3)

            rankItem.innerHTML = `
                <div class="rank-num" style="color: ${rankColor}">${index + 1}</div>
                <div class="rank-img">
                    <img src="${movie.poster_url}" alt="${movie.title}" loading="lazy">
                </div>
                <div class="rank-info">
                    <h4 class="rank-title">${movie.title}</h4>
                    <div class="rank-meta">
                        <span style="color: #aaa; font-size: 0.8rem;"><i class='bx bx-show'></i> ${views}</span>
                        <span class="rank-rating" style="margin-left: 10px; color: #ffb43a;">${rating}</span>
                    </div>
                </div>
            `;
            rankingList.appendChild(rankItem);
        });
      })
      .catch(err => {
          console.error("Lỗi ranking:", err);
          rankingList.innerHTML = '<p>Lỗi tải BXH.</p>';
      });
  }

  // --- 5. LẮNG NGHE SỰ KIỆN CHUNG ---
  moviesContainer.addEventListener("click", function (e) {
    const heart = e.target.closest(".favorite-heart");
    if (heart) {
      e.preventDefault();
      e.stopPropagation();
      if (!sessionData.loggedIn) {
        Swal.fire("Thông báo", "Bạn cần đăng nhập để sử dụng chức năng này!", "info");
        return;
      }
      const movieId = heart.dataset.movieid;
      fetch("../api/toggle_favorite.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie_id: movieId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            if (data.action === "added") {
              favoriteMovieIds.push(parseInt(movieId));
            } else {
              favoriteMovieIds = favoriteMovieIds.filter((id) => id !== parseInt(movieId));
            }
            updateFavoriteHearts();
          }
        });
    }
  });

  // Sự kiện click tim cho phần Slider (Ủy quyền sự kiện cho body hoặc container cha)
  document.body.addEventListener("click", function (e) {
    const heart = e.target.closest(".swiper-slide .favorite-heart");
    if (heart) {
        e.preventDefault();
        e.stopPropagation();
        if (!sessionData.loggedIn) {
            Swal.fire("Thông báo", "Bạn cần đăng nhập để sử dụng chức năng này!", "info");
            return;
        }
        const movieId = heart.dataset.movieid;
        fetch("../api/toggle_favorite.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ movie_id: movieId }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                if (data.action === "added") {
                    favoriteMovieIds.push(parseInt(movieId));
                } else {
                    favoriteMovieIds = favoriteMovieIds.filter((id) => id !== parseInt(movieId));
                }
                updateFavoriteHearts();
            }
        });
    }
  });


  // --- 6. KHỞI CHẠY ---
  fetch("../api/check_favorites.php")
    .then((res) => res.json())
    .then((data) => {
      favoriteMovieIds = data;
      fetchMoviesByPage(1);
      fetchTopRatedMovies();
      fetchRandomMovies();
      fetchHeroMovies();
      fetchRankingMovies();  // <--- GỌI HÀM MỚI Ở ĐÂY
    });
});