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

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      Swal.fire("Lỗi", "Vui lòng điền đầy đủ email và mật khẩu.", "warning");
      return;
    }
    // Không cần check regex email vì có thể đăng nhập bằng username
    // if (!emailRegex.test(email)) {
    //    Swal.fire('Lỗi', 'Vui lòng nhập email hợp lệ.', 'warning');
    //    return;
    // }

    fetch("../../api/login.php", {
      // DÙNG ĐƯỜNG DẪN TƯƠNG ĐỐI
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
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
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "../../home/index.html";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Thất bại...",
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
    `Chức năng đăng nhập bằng ${provider} chưa được hỗ trợ.`,
    "info"
  );
}

window.addEventListener("load", function () {
  createParticles();
  const loginCard = document.querySelector(".login-card");
  if (loginCard) loginCard.style.opacity = "1";
});
