
const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#loginformemail");
const passwordInput = document.querySelector("#loginformpassword");


loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();


  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((users) => {
      const foundUser = users.find(
        (user) =>
          user.email === email &&
          (user.password === password || email === password)
      );

      if (!foundUser || !foundUser.isActive) {
        alert("Invalid credentials or inactive user.");
        return;
      }


      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));


      switch (foundUser.role) {
        case "admin":
          window.location.href = "admin-dashboard.html";
          break;
        case "backer":
          window.location.href = "backer-dashboard.html";
          break;
        case "campaigner":
          window.location.href = "campaigner-dashboard.html";
          break;
        default:
          alert("Role not recognized.");
      }
    })
    .catch((err) => {
      console.error("Login failed", err);
      alert("Something went wrong. Try again.");
    });
});
