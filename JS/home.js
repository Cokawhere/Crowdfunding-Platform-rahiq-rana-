const profileSelection = document.getElementById('viewProfile');
const user = JSON.parse(localStorage.getItem("user"));
const logOut = document.getElementById('logout-btn');

logOut.addEventListener('click', function(){
    window.location.href = "login.html";
    user = null;

});

profileSelection.addEventListener('click', function(){


    if (!user) {
        window.location.href = "login.html";
    }

    if (user.role === 'campaigner') {
        window.location.href = "campaigner-dashboard.html";
    } else if (user.role === 'backer') {
        window.location.href = "backer-dashboard.html";
    } else {
       window.location.href = "login.html";
    }

});