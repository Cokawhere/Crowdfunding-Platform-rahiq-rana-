const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
document.getElementById("welcomeMsg").innerText = `Welcome Back, ${currentUser.userName}`;
const campaignId = JSON.parse(localStorage.getItem("campaignId"));


const pledgeCardsContainer = document.getElementById("pledgeCardsContainer");
const totalAmountOFPledges = document.getElementById("totalAmountOFPledges");
const activeCampaigns = document.getElementById("activeCampaigns");

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/pledges")
        .then(res => res.json())
        .then(allPledges => {
            const userPledges = allPledges.filter(p => p.backerId === currentUser.id);
            document.getElementById("totalPledges").innerText = userPledges.length;

            fetch("http://localhost:3000/campaigns")
                .then(res => res.json())
                .then(allCampaigns => {
                    // عرض الحملات الفعالة
                    activeCampaigns.innerText = allCampaigns.filter(c => c.isApproved).length;

                    // عرض الحملات اللي المستخدم عمل عليها pledge
                    displayPledges(userPledges, allCampaigns);
                })
                .catch(err => console.error("Failed to fetch campaigns", err));
        })
        .catch(err => console.error("Failed to fetch pledges", err));
});

function displayPledges(pledges, allCampaigns) {
    pledgeCardsContainer.innerHTML = "";
    console.log("User pledges:", pledges);

    if (pledges.length === 0) {
        pledgeCardsContainer.innerHTML = `<p class='text-muted'>You don't have any pledges for any campaign.</p>`;
        return;
    }

    pledges.forEach(pledge => {
        const campaign = allCampaigns.find(c => c.id === pledge.campaignId);
        if (!campaign) return;

        const card = document.createElement("div");
        card.className = "backer--dashbord--Pledges__history--cards col-sm-12 col-lg-6";

        card.innerHTML = `
            <img class="backer--dashbord--Pledges__history--cards-img" 
                src="${campaign.image}">
            <div class="backer--dashbord--Pledges__history--cards__info1">
                <p>${campaign.title}</p>
                <p>$${pledge.amount}</p>
            </div>
            <div class="backer--dashbord--Pledges__history--cards__info2">
                <a href="campaigner-campaign-details.html?id=${campaign.id}"></a>
            </div>
        `;

        pledgeCardsContainer.appendChild(card);
    });
}
