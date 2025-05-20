const form = document.getElementById('signupForm');
const errorMsg = document.getElementById("error");
// const bcrypt = require('bcrypt');

form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    const userName = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();


    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}`);
      const data = await res.json();
      
    if (data.length > 0) {
      errorMsg.textContent = "User already exists.";
      return;
    }

    // const saltRounds = 10;
    // bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
    //   if (err) throw err;
    // });

    
    const allUsersRes =  await fetch(`http://localhost:3000/users`);
    const allUsers = await allUsersRes.json();
    const id =  allUsers.length + 1;
    const newUser = {
      id,
      userName,
      email,
      password,
      role: 'backer',
      isActive: true
    };

    const addUser = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });

    if (addUser.ok) {
      window.location.href = "login.html";
    } else {
      errorMsg.textContent = "Signup failed. Try again.";
    }

  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Something went wrong.";
  }
});