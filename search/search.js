document.addEventListener('DOMContentLoaded', () => {
    const moviesGrid = document.getElementById('movies-grid');
    const resultCount = document.getElementById('result-count');
    const filterForm = document.getElementById('filter-form');
    
    // BIẾN MỚI: Lưu danh sách phim yêu thích
    let favoriteMovieIds = [];
    let isLoggedIn = false;

    // --- 0. KIỂM TRA SESSION & LẤY DANH SÁCH YÊU THÍCH ---
    function checkSessionAndFavorites() {
        // Kiểm tra login
        fetch('../api/check_session.php')
            .then(res => res.json())
            .then(data => {
                isLoggedIn = data.loggedIn;
                if(isLoggedIn) {
                    // Nếu đã login, lấy danh sách yêu thích
                    fetch('../api/check_favorites.php')
                        .then(res => res.json())
                        .then(favData => {
                            favoriteMovieIds = favData;
                            // Sau khi có dữ liệu yêu thích mới tải bộ lọc và phim
                            loadFilterOptions();
                        });
                } else {
                    loadFilterOptions();
                }
            });
    }

    // --- HÀM TẢI OPTION BỘ LỌC ---
    function loadFilterOptions() {
        fetch('../api/get_filter_options.php')
            .then(res => res.json())
            .then(data => {
                const genreSelect = document.getElementById('filter-genre');
                const countrySelect = document.getElementById('filter-country');
                const yearSelect = document.getElementById('filter-year');

                // Xóa options cũ (trừ option đầu tiên "Tất cả")
                if(genreSelect) {
                    genreSelect.innerHTML = '<option value="">Tất cả</option>';
                    data.genres.forEach(g => {
                        const opt = document.createElement('option');
                        opt.value = g; opt.textContent = g;
                        genreSelect.appendChild(opt);
                    });
                }

                if(countrySelect) {
                    countrySelect.innerHTML = '<option value="">Tất cả</option>';
                    data.countries.forEach(c => {
                        const opt = document.createElement('option');
                        opt.value = c; opt.textContent = c;
                        countrySelect.appendChild(opt);
                    });
                }

                if (yearSelect && yearSelect.tagName === 'SELECT') {
                    yearSelect.innerHTML = '<option value="">Tất cả</option>';
                    data.years.forEach(y => {
                        const opt = document.createElement('option');
                        opt.value = y; opt.textContent = y;
                        yearSelect.appendChild(opt);
                    });
                }

                applyUrlParams();
            })
            .catch(err => console.error("Lỗi tải bộ lọc:", err));
    }

    function applyUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.has('title')) document.getElementById('filter-title').value = urlParams.get('title');
        if(urlParams.has('genre')) document.getElementById('filter-genre').value = urlParams.get('genre');
        if(urlParams.has('country')) document.getElementById('filter-country').value = urlParams.get('country');
        if(urlParams.has('year')) document.getElementById('filter-year').value = urlParams.get('year');
        if(urlParams.has('director')) document.getElementById('filter-director').value = urlParams.get('director');

        searchMovies();
    }

    function searchMovies() {
        const title = document.getElementById('filter-title').value;
        const genre = document.getElementById('filter-genre').value;
        const country = document.getElementById('filter-country').value;
        const year = document.getElementById('filter-year').value;
        const actor = document.getElementById('filter-actor').value;
        const director = document.getElementById('filter-director').value;

        let apiUrl = `../api/advanced_search.php?t=${new Date().getTime()}`;
        if(title) apiUrl += `&title=${encodeURIComponent(title)}`;
        if(genre) apiUrl += `&genre=${encodeURIComponent(genre)}`;
        if(country) apiUrl += `&country=${encodeURIComponent(country)}`;
        if(year) apiUrl += `&year=${encodeURIComponent(year)}`;
        if(actor) apiUrl += `&actor=${encodeURIComponent(actor)}`;
        if(director) apiUrl += `&director=${encodeURIComponent(director)}`;

        moviesGrid.innerHTML = '<p>Đang tìm kiếm...</p>';

        fetch(apiUrl)
            .then(res => res.json())
            .then(movies => {
                moviesGrid.innerHTML = '';
                resultCount.textContent = `Tìm thấy ${movies.length} kết quả`;

                if(movies.length === 0) {
                    moviesGrid.innerHTML = '<p>Không tìm thấy phim nào phù hợp.</p>';
                    return;
                }

                movies.forEach(movie => {
                    // Kiểm tra xem phim này có trong danh sách yêu thích không
                    const isFav = favoriteMovieIds.includes(parseInt(movie.id));
                    const heartClass = isFav ? 'bxs-heart' : 'bx-heart';
                    const activeClass = isFav ? 'favorited' : '';

                    const card = document.createElement('div'); // Đổi thẻ a thành div để dễ xử lý click heart
                    card.className = 'movie-card';
                    card.style.position = 'relative'; // Để định vị trái tim

                    card.innerHTML = `
                        <a href="../movie_page/movie.html?id=${movie.id}" style="text-decoration:none; color:inherit;">
                            <img src="${movie.poster_url}" alt="${movie.title}" loading="lazy">
                        </a>
                        <div class="favorite-heart ${activeClass}" data-movieid="${movie.id}">
                            <i class='bx ${heartClass}'></i>
                        </div>
                        <div class="movie-info">
                            <a href="../movie_page/movie.html?id=${movie.id}" style="text-decoration:none; color:inherit;">
                                <h3>${movie.title}</h3>
                                <span>${movie.release_year || '---'} | ${movie.genre}</span>
                            </a>
                        </div>
                    `;
                    moviesGrid.appendChild(card);
                });
            });
    }

    // --- XỬ LÝ CLICK TIM (EVENT DELEGATION) ---
    moviesGrid.addEventListener('click', function(e) {
        const heart = e.target.closest('.favorite-heart');
        if (heart) {
            e.preventDefault(); // Ngăn chuyển trang nếu click vào tim
            
            if (!isLoggedIn) {
                Swal.fire("Thông báo", "Bạn cần đăng nhập để sử dụng chức năng này!", "info");
                return;
            }

            const movieId = heart.dataset.movieid;
            const icon = heart.querySelector('i');

            fetch("../api/toggle_favorite.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ movie_id: movieId }),
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    if (data.action === "added") {
                        heart.classList.add("favorited");
                        icon.classList.remove("bx-heart");
                        icon.classList.add("bxs-heart");
                        favoriteMovieIds.push(parseInt(movieId));
                    } else {
                        heart.classList.remove("favorited");
                        icon.classList.remove("bxs-heart");
                        icon.classList.add("bx-heart");
                        favoriteMovieIds = favoriteMovieIds.filter(id => id !== parseInt(movieId));
                    }
                }
            });
        }
    });

    filterForm.addEventListener('submit', (e) => { e.preventDefault(); searchMovies(); });
    document.getElementById('btn-reset').addEventListener('click', () => { filterForm.reset(); searchMovies(); });

    // Khởi chạy
    checkSessionAndFavorites();
});