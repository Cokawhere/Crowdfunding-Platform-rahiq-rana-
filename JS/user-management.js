const adminName = localStorage.getItem("adminName");
const adminImage = localStorage.getItem("adminImage");

if (adminName && adminImage) {
    document.getElementById("admin-name").textContent = adminName;
    document.getElementById("admin-pic").src = adminImage;
}


const usersTableBody = document.getElementById("users-table-tr-container");

async function fetchUsers() {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    renderUsers(users);

}

function renderUsers(users) {
    usersTableBody.innerHTML = "";
    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${user.image}" class="user-img">${user.userName}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
            <td>
        ${user.role !== "admin" ? `<button class="${user.isActive ? 'ban-user' : 'activate-user'}"
        onclick="toggleUserStatus(${user.id}, ${user.isActive})">
        ${user.isActive ? 'Ban' : 'Activate'}
         </button>`
      : ""
  }
</td>
            </td>
        `;
        usersTableBody.appendChild(row);
    });

    document.querySelector(".user-number").textContent = `${users.length} users`;


}

async function toggleUserStatus(userId, currentStatus) {

    console.log("typeof userId:", typeof userId); 
    console.log("userId:", userId);
    const newStatus = !currentStatus;

    await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus })
    });

    fetchUsers();
}

fetchUsers();