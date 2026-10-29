document.addEventListener('DOMContentLoaded', function () {
    const movieTitle = document.getElementById('movie-title');
    const movieGenre = document.getElementById('movie-genre');
    const movieDuration = document.getElementById('movie-duration');
    const movieDescription = document.getElementById('movie-description');
    const moviePoster = document.getElementById('movie-poster-img');
    const movieTrailer = document.getElementById('movie-trailer');
    const reviewsList = document.getElementById('reviews-list');
    const addReviewContainer = document.getElementById('add-review-form-container');
    const watchMovieBtn = document.getElementById('watch-movie-btn');
    const playerContainer = document.getElementById('movie-player-container');
    const moviePlayer = document.getElementById('movie-player');
    const relatedContainer = document.querySelector('.related-container');

    // Element cho nút yêu thích (MỚI)
    const favBtn = document.getElementById('movie-favorite-btn');
    const favIcon = favBtn ? favBtn.querySelector('i') : null;
    let isUserLoggedIn = false; // Biến cờ kiểm tra login

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    if (!movieId) {
        movieTitle.textContent = 'Không tìm thấy phim!';
        return;
    }

    // --- 1. LẤY CHI TIẾT PHIM ---
    fetch(`../api/get_movie_details.php?id=${movieId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) { movieTitle.textContent = data.error; return; }
            
            document.title = data.title;
            movieTitle.textContent = data.title;
            movieGenre.textContent = `Thể loại: ${data.genre}`;
            movieDuration.textContent = `Thời lượng: ${data.duration_min} phút`;
        	document.getElementById('movie-country').textContent = data.country || "Đang cập nhật";
            document.getElementById('movie-year').textContent = data.release_year || "---";
            document.getElementById('movie-director').textContent = data.director || "Đang cập nhật";
            document.getElementById('movie-actors').textContent = data.actors || "Đang cập nhật";
            movieDescription.textContent = data.description;
            
            if (data.poster_url.startsWith('http')) {
                moviePoster.src = data.poster_url;
            } else {
                moviePoster.src = data.poster_url.startsWith('../') ? data.poster_url : `../${data.poster_url}`;
            }

            const trailerContainer = document.querySelector('.trailer-container');
            if (data.trailer_url) {
                const videoIdMatch = data.trailer_url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
                if (videoIdMatch && videoIdMatch[1]) {
                    movieTrailer.src = `https://www.youtube.com/embed/${videoIdMatch[1]}`;
                } else if (trailerContainer) trailerContainer.style.display = 'none';
            } else if (trailerContainer) trailerContainer.style.display = 'none';

            if (data.movie_source_url) {
                const watchBtn = document.getElementById("watch-movie-btn");
                watchBtn.style.display = 'inline-block';
                watchBtn.href = `../watch_movie/watch.html?id=${movieId}&source=${encodeURIComponent(data.movie_source_url)}`;
            }

            if (data.genre) {
                let firstGenre = data.genre.split(',')[0].trim();
                fetchRelatedMovies(firstGenre, movieId);
            } else {
                document.querySelector('.related-section').style.display = 'none';
            }
        })
        .catch(error => { console.error('Lỗi tải chi tiết phim:', error); });

    // --- 2. HÀM LẤY PHIM LIÊN QUAN ---
    function fetchRelatedMovies(genre, currentId) {
        const relatedWrapper = document.getElementById('related-wrapper');
        
        fetch(`../api/get_movies.php?genre=${encodeURIComponent(genre)}&page=1`)
            .then(res => res.json())
            .then(data => {
                const movies = data.movies || [];
                const relatedMovies = movies.filter(m => m.id != currentId).slice(0, 15);

                if (relatedMovies.length === 0) {
                    document.querySelector('.related-section').style.display = 'none';
                    return;
                }

                relatedWrapper.innerHTML = '';
                relatedMovies.forEach(movie => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    
                    slide.innerHTML = `
                        <a href="movie.html?id=${movie.id}" class="related-box">
                            <div class="related-img-box">
                                <img src="${movie.poster_url}" alt="${movie.title}" loading="lazy">
                            </div>
                            <h3>${movie.title}</h3>
                            <span>${movie.duration_min} min</span>
                        </a>
                    `;
                    relatedWrapper.appendChild(slide);
                });

                new Swiper(".related-swiper", {
                    slidesPerView: 2,
                    spaceBetween: 15,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    breakpoints: {
                        500: { slidesPerView: 3, spaceBetween: 15 },
                        768: { slidesPerView: 4, spaceBetween: 20 },
                        1024: { slidesPerView: 5, spaceBetween: 25 },
                    },
                });
            })
            .catch(err => console.error("Lỗi tải phim liên quan:", err));
    }

    // --- 3. XỬ LÝ CHECK SESSION & YÊU THÍCH (MỚI THÊM) ---
    fetch('../api/check_session.php')
        .then(res => res.json())
        .then(sessionData => {
            isUserLoggedIn = sessionData.loggedIn;

            // Xử lý Form Review
            if (isUserLoggedIn) {
                // ... (Code render form review cũ giữ nguyên) ...
                 addReviewContainer.innerHTML = `
                    <form id="add-review-form"><h4>Đánh giá của bạn</h4><div class="star-rating">
                        <input type="radio" id="5-stars" name="rating" value="5" /><label for="5-stars">★</label>
                        <input type="radio" id="4-stars" name="rating" value="4" /><label for="4-stars">★</label>
                        <input type="radio" id="3-stars" name="rating" value="3" /><label for="3-stars">★</label>
                        <input type="radio" id="2-stars" name="rating" value="2" /><label for="2-stars">★</label>
                        <input type="radio" id="1-star" name="rating" value="1" required/><label for="1-star">★</label>
                    </div><textarea id="review-comment" placeholder="Viết bình luận..."></textarea><button type="submit">Gửi</button></form>`;
                
                // Add event listener cho review form
                 document.getElementById('add-review-form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const ratingInput = document.querySelector('input[name="rating"]:checked');
                    if (!ratingInput) { Swal.fire('Lỗi', 'Vui lòng chọn số sao.', 'warning'); return; }
                    
                    fetch('../api/add_review.php', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ 
                            movie_id: movieId, 
                            rating: ratingInput.value, 
                            comment: document.getElementById('review-comment').value 
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire(data.success ? 'Thành công!' : 'Lỗi!', data.message, data.success ? 'success' : 'error');
                        if(data.success) { fetchReviews(); this.reset(); }
                    });
                });

                // --- XỬ LÝ NÚT YÊU THÍCH ---
                if (favBtn) {
                    favBtn.style.display = 'flex'; // Hiện nút tim
                    // Check xem phim đã thích chưa
                    fetch('../api/check_favorites.php')
                        .then(r => r.json())
                        .then(favIds => {
                            if(favIds.includes(parseInt(movieId))) {
                                favBtn.classList.add('favorited');
                                favIcon.classList.remove('bx-heart');
                                favIcon.classList.add('bxs-heart');
                            }
                        });
                }
            } else {
                addReviewContainer.innerHTML = '<p><a href="../signup-in-main/login/index.html" style="color:var(--main-color)">Đăng nhập</a> để đánh giá.</p>';
                // Khách chưa login vẫn hiện tim để biết
                if(favBtn) favBtn.style.display = 'flex';
            }
        });

    // --- SỰ KIỆN CLICK NÚT TIM (MỚI THÊM) ---
    if(favBtn) {
        favBtn.addEventListener('click', () => {
            if (!isUserLoggedIn) {
                Swal.fire("Thông báo", "Bạn cần đăng nhập để thêm vào yêu thích!", "info");
                return;
            }

            favBtn.style.opacity = '0.7';

            fetch("../api/toggle_favorite.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ movie_id: movieId }),
            })
            .then(res => res.json())
            .then(data => {
                favBtn.style.opacity = '1';
                if (data.success) {
                    if (data.action === "added") {
                        favBtn.classList.add("favorited");
                        favIcon.classList.remove("bx-heart");
                        favIcon.classList.add("bxs-heart");
                        Swal.fire({
                            icon: 'success',
                            title: 'Đã thêm vào yêu thích!',
                            toast: true, position: 'top-end',
                            showConfirmButton: false, timer: 1500
                        });
                    } else {
                        favBtn.classList.remove("favorited");
                        favIcon.classList.remove("bxs-heart");
                        favIcon.classList.add("bx-heart");
                         Swal.fire({
                            icon: 'success',
                            title: 'Đã bỏ yêu thích!',
                            toast: true, position: 'top-end',
                            showConfirmButton: false, timer: 1500
                        });
                    }
                }
            })
            .catch(err => {
                console.error(err);
                favBtn.style.opacity = '1';
            });
        });
    }

    // --- 4. RENDER REVIEW ---
    function renderReviews(reviews) {
        reviewsList.innerHTML = '';
        if (reviews.length === 0) { reviewsList.innerHTML = '<p>Chưa có đánh giá nào.</p>'; return; }
        reviews.forEach(review => {
            const reviewBox = document.createElement('div');
            reviewBox.className = 'review-box';
            const ratingStars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            const reviewDate = new Date(review.created_at).toLocaleDateString('vi-VN');
            reviewBox.innerHTML = `
                <div class="review-header"><strong>${review.username}</strong><span class="rating-display">${ratingStars}</span><span>- ${reviewDate}</span></div>
                <p>${review.comment}</p>`;
            reviewsList.appendChild(reviewBox);
        });
    }

    function fetchReviews() {
        fetch(`../api/get_reviews.php?movie_id=${movieId}`)
            .then(res => res.json()).then(data => renderReviews(data));
    }

    fetchReviews();
});