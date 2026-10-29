function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

const togglePassword = document.getElementById("togglePassword");
if (togglePassword) {
  togglePassword.addEventListener("click", function () {
    // ... (code cũ giữ nguyên)
    const passwordInput = document.getElementById("password");
    const icon = this;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
}

const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
if (toggleConfirmPassword) {
  toggleConfirmPassword.addEventListener("click", function () {
    // ... (code cũ giữ nguyên)
    const passwordInput = document.getElementById("confirmPassword");
    const icon = this;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !email || !password || !confirmPassword) {
      Swal.fire("Lỗi", "Vui lòng điền đầy đủ thông tin.", "warning");
      return;
    }
    if (!emailRegex.test(email)) {
      Swal.fire("Lỗi", "Vui lòng nhập email hợp lệ.", "warning");
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire("Lỗi", "Mật khẩu xác nhận không khớp.", "warning");
      return;
    }
    if (password.length < 6) {
      Swal.fire("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự.", "warning");
      return;
    }

    fetch("../../api/register.php", {
      // DÙNG ĐƯỜNG DẪN TƯƠNG ĐỐI
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Thành công!",
            text: data.message,
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "../login/index.html";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Đăng ký thất bại",
            text: data.message,
          });
        }
      })
      .catch((error) => {
        console.error("Lỗi Fetch:", error);
        Swal.fire(
          "Lỗi Kết Nối",
          "Không thể kết nối đến server. Vui lòng thử lại sau.",
          "error"
        );
      });
  });
}

function socialLogin(provider) {
  Swal.fire(
    "Thông báo",
    `Chức năng đăng ký bằng ${provider} chưa được hỗ trợ.`,
    "info"
  );
}

window.addEventListener("load", function () {
  createParticles();
  const loginCard = document.querySelector(".login-card");
  if (loginCard) loginCard.style.opacity = "1";
});
