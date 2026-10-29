// =======================================================
// === CODE HOÀN CHỈNH VÀ GỘP NHẤT CHO admin.js ===
// =======================================================

document.addEventListener("DOMContentLoaded", function () {
  // --- BẢO VỆ TRANG ADMIN ---
  fetch("../api/check_session.php")
    .then((response) => response.json())
    .then((data) => {
      if (!data.loggedIn || data.role !== "admin") {
        Swal.fire({
          icon: "error",
          title: "Truy cập bị từ chối!",
          text: "Bạn không có quyền truy cập trang này.",
          allowOutsideClick: false,
        }).then(() => {
          window.location.href = "../home/index.html";
        });
      }
    });

  // --- KHAI BÁO BIẾN CHUNG ---
  const modal = document.getElementById("movie-modal");
  const addMovieBtn = document.getElementById("add-movie-btn");
  const closeBtn = document.querySelector(".close-btn");
  const movieForm = document.getElementById("movie-form");
  const modalTitle = document.getElementById("modal-title");
  const moviesTableBody = document.getElementById("movies-table-body");
  const usersTableBody = document.getElementById("users-table-body");

  // --- CHỨC NĂNG QUẢN LÝ PHIM ---

  // Mở modal thêm/sửa phim
  addMovieBtn.onclick = () => {
    modal.style.display = "block";
    modalTitle.textContent = "Thêm phim mới";
    movieForm.reset();
    document.getElementById("movie-id").value = "";
  };

  // Đóng modal
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Tải danh sách phim
  function fetchMovies() {
    fetch("../api/get_movies.php") // API này không có ?page sẽ trả về tất cả phim
      .then((response) => response.json())
      .then((movies) => {
        moviesTableBody.innerHTML = "";
        movies.forEach((movie) => {
          const row = `
                        <tr>
                            <td>${movie.id}</td>
                            <td><img src="${movie.poster_url}" alt="${movie.title}"></td>
                            <td>${movie.title}</td>
                            <td>${movie.genre}</td>
                            <td class="action-btns">
                                <button class="edit-btn" data-id="${movie.id}">Sửa</button>
                                <button class="delete-btn" data-id="${movie.id}">Xóa</button>
                            </td>
                        </tr>
                    `;
          moviesTableBody.innerHTML += row;
        });
      });
  }

  // Xử lý form thêm/sửa phim
  movieForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const movieData = Object.fromEntries(new FormData(movieForm).entries());
    const url = movieData.id
      ? "../api/update_movie.php"
      : "../api/add_movie.php";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(movieData),
    })
      .then((response) => response.json())
      .then((data) => {
        modal.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: data.message,
          timer: 1500,
          showConfirmButton: false,
        });
        fetchMovies();
      });
  });

  // Xử lý nút Sửa và Xóa phim
  moviesTableBody.addEventListener("click", function (e) {
    const target = e.target;
    const id = target.dataset.id;

    if (target.classList.contains("delete-btn")) {
      Swal.fire({
        title: "Bạn chắc chắn không?",
        text: "Hành động này sẽ xóa phim vĩnh viễn!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Vâng, xóa nó đi!",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch("../api/delete_movie.php", {
            method: "POST",
            body: JSON.stringify({ id: id }),
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire("Đã xóa!", data.message, "success");
              fetchMovies();
            });
        }
      });
    }

    // Tìm đoạn: if (target.classList.contains("edit-btn"))
// Và sửa phần bên trong .then((movie) => { ... }) như sau:

        if (target.classList.contains("edit-btn")) {
          fetch(`../api/get_movie_details.php?id=${id}`)
            .then((res) => res.json())
            .then((movie) => {
              // Điền các trường cũ
              document.getElementById('movie-id').value = movie.id;
              document.getElementById('title').value = movie.title;
              document.getElementById('genre').value = movie.genre;
              document.getElementById('duration_min').value = movie.duration_min;
              document.getElementById('poster_url').value = movie.poster_url;
              document.getElementById('description').value = movie.description;
              document.getElementById('trailer_url').value = movie.trailer_url;
              document.getElementById('movie_source_url').value = movie.movie_source_url || '';

              // --- ĐIỀN CÁC TRƯỜNG MỚI ---
              document.getElementById('country').value = movie.country || '';
              document.getElementById('director').value = movie.director || '';
              document.getElementById('actors').value = movie.actors || '';
              document.getElementById('release_year').value = movie.release_year || '';

              modalTitle.textContent = "Cập nhật phim";
              modal.style.display = "block";
            });
        }
  });

  // --- CHỨC NĂNG QUẢN LÝ NGƯỜI DÙNG ---

  // Tải danh sách người dùng
  function fetchUsers() {
    fetch("../api/get_users.php")
      .then((response) => response.json())
      .then((users) => {
        if (!usersTableBody || users.error) return;
        usersTableBody.innerHTML = "";
        users.forEach((user) => {
          const userDate = new Date(user.created_at).toLocaleDateString(
            "vi-VN"
          );
          const row = `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>
                                <select class="role-select" data-userid="${
                                  user.id
                                }">
                                    <option value="user" ${
                                      user.role === "user" ? "selected" : ""
                                    }>User</option>
                                    <option value="admin" ${
                                      user.role === "admin" ? "selected" : ""
                                    }>Admin</option>
                                </select>
                            </td>
                            <td>${userDate}</td>
                            <td class="action-btns">
                                <button class="delete-user-btn" data-userid="${
                                  user.id
                                }">Xóa</button>
                            </td>
                        </tr>
                    `;
          usersTableBody.innerHTML += row;
        });
      });
  }

  // Xử lý sự kiện trên bảng người dùng
  usersTableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-user-btn")) {
      const userId = e.target.dataset.userid;
      Swal.fire({
        title: "Bạn chắc chắn không?",
        text: `Bạn sắp xóa người dùng có ID: ${userId}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Vâng, xóa đi!",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch("../api/delete_user.php", {
            method: "POST",
            body: JSON.stringify({ user_id: userId }),
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire(
                "Thông báo",
                data.message,
                data.success ? "success" : "error"
              );
              fetchUsers();
            });
        }
      });
    }
  });

  usersTableBody.addEventListener("change", function (e) {
    if (e.target.classList.contains("role-select")) {
      const userId = e.target.dataset.userid;
      const newRole = e.target.value;
      fetch("../api/update_user_role.php", {
        method: "POST",
        body: JSON.stringify({ user_id: userId, new_role: newRole }),
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire(
            "Thông báo",
            data.message,
            data.success ? "success" : "error"
          );
          fetchUsers();
        });
    }
  });

  // --- KHỞI CHẠY ---
  fetchMovies();
  fetchUsers();
});
