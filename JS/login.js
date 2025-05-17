const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("error");


form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();


  fetch(`http://localhost:3000/users?email=${email}&password=${password}`).then((result) => result.json())
  .then((data) => {
      if (data.length === 1) {
        const user = data[0];

        if (!user.isActive) {
          errorMsg.textContent = "Account is banned.";
          return;
        }

        localStorage.setItem("user", JSON.stringify(user));

        switch (user.role) {
          case "admin":
            window.location.href = "admin-dashboard.html";
            break;
          case "campaigner":
            window.location.href = "home.html";
            break;
          case "backer":
            window.location.href = "home.html";
            break;
        }
        
      } else {
        errorMsg.textContent = "Invalid email or password.";
      }
    })
    .catch((err) => {
      console.error(err);
      errorMsg.textContent = "Login error.";
    });
}); 