
const container1 = document.querySelector(".card--container1");
const container2 = document.querySelector(".card--container2");
const container3 = document.querySelector(".card--container3");
const searchInput = document.querySelector(".navebar--search-input");




function createCard(c) {
    const card = document.createElement("div");
    card.className = "home-project-card";
    card.innerHTML = `
   <img src="${c.image}" alt="project-picture" class="home-project-card-picture">
    <div class="home-project-card-text">
        <h4 class="home-project-card-name">${c.title}</h4>
        <p>${c.description}</p>
        <div class="home-project-card-progress-container">
            <div class="progress-bar"></div>
        </div>
        <div class="home-project-card-rais-details">
            <p class="raised">$75,000 raised</p>
            <p class="percent">75%</p>
        </div>
        <div class="home-project-card-forth-row">
            <div class="home-project-card-forth-row-days-left">
                <i class="fa fa-clock-o"></i>
                <p class="">15 days left</p>
            </div>
            <button class="home-project-card-btn" onclick="location.href='campaign-details.html?id=${c.id}'">View Campaign</button>
        </div>
    </div>
`;
    return card;
}


function renderCampaignsToContainers(campaigns) {
    const group1 = campaigns.slice(0, 3);
    const group2 = campaigns.slice(3, 6);
    const group3 = campaigns.slice(6, 9);

    container1.innerHTML = "";
    container2.innerHTML = "";
    container3.innerHTML = "";

    group1.forEach(c => container1.appendChild(createCard(c)));
    group2.forEach(c => container2.appendChild(createCard(c)));
    group3.forEach(c => container3.appendChild(createCard(c)));
}


function loadCampaignsByCategory(category = "") {
    let url = "http://localhost:3000/campaigns?isApproved=true";
    if (category) {
        url += `&category=${category}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => renderCampaignsToContainers(data.slice(0, 9)))
        .catch(err => {
            console.error("faild to upload the campains", err);
            container1.innerHTML = "<p>error is found</p>";
            container2.innerHTML = "";
            container3.innerHTML = "";
        });
}


function loadCampaignsBySearch(keyword) {
    const url = `http://localhost:3000/campaigns?isApproved=true&q=${keyword}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const filtered = data.filter(w =>
                w.title.toLowerCase().includes(keyword.toLowerCase()) ||
                w.description.toLowerCase().includes(keyword.toLowerCase())
            );
            renderCampaignsToContainers(filtered.slice(0, 9));
        })
        .catch(err => {
            console.error("faild to upload the campains", err);
            container1.innerHTML = "<p>Errror found</p>";
            container2.innerHTML = "";
            container3.innerHTML = "";
        });
}


loadCampaignsByCategory();


const categoryButtons = {
    "all-btn": "",
    "tech-btn": "Technology",
    "art-btn": "Art",
    "games-btn": "Games",
    "design-btn": "Design",
    "film-btn": "Film"
};

for (const id in categoryButtons) {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener("click", () => {
            loadCampaignsByCategory(categoryButtons[id]);
        });
    }
}


searchInput.addEventListener("input", e => {
    const keyword = e.target.value.trim();
    if (keyword.length >= 2) {
        loadCampaignsBySearch(keyword);
    } else {
        loadCampaignsByCategory();
    }
});


const profileSelection = document.getElementById('viewProfile');


profileSelection.addEventListener('click', function () {

    const user = JSON.parse(localStorage.getItem("user"));

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
