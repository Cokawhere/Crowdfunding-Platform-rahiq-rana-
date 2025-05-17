const profileSelection = document.getElementById('viewProfile');


profileSelection.addEventListener('click', function(){

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "login.html";
    }

    if (user.role === 'campaigner') {
        window.location.href = "campaigner-dashboard.html";
    } else if (user.role === 'backer') {
        window.location.href = "backer-dashboard.html";
    } else {
        alert("Unknown user role.");
    }

});