const currentUser = JSON.parse(localStorage.getItem("user"));
document.getElementById("welcomeMsg").innerText = `Welcome Back, ${currentUser.userName}`;
const pledgeCardsContainer = document.getElementById("pledgeCardsContainer");

const totalAmountOFPledges = document.getElementById("totalAmountOFPledges");
const activeCampaigns = document.getElementById("activeCampaigns");

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/pledges")
        .then(res => res.json())
        .then(allPledges => {

            const userPledges = allPledges.filter(pledge => pledge.userId === currentUser.id);
            displayPledges(userPledges);
            document.getElementById("totalPledges").innerText = userPledges.length;

        })
        .catch(err => console.error("Failed to fetch pledges", err));

        fetch("http://localhost:3000/campaigns")
        .then(res => res.json())
        .then(allCampaigns=>{
            document.getElementById("activeCampaigns").innerText = allCampaigns.filter(c => c.isApproved ===true).length;
        })
});



function displayPledges(pledges) {
    pledgeCardsContainer.innerHTML = "";

    if (pledges.length === 0) {
        pledgeCardsContainer.innerHTML = `<p class='text-muted'>You don't have any pledges for any campaign.</p>`;
        return;
    }

    pledges.forEach(pledge => {
        fetch(`http://localhost:3000/campaigns/${pledge.campaignId}`)
        .then(res => res.json())
        .then(campaign => {
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
                <a href="campaigner-campaign-details.html?id=${campaign.id}">View Campaign</a>
            </div>
            `;

            pledgeCardsContainer.appendChild(card);
        })
        .catch(err => {
            console.error(`Error in fetching campaign ${pledge.campaignId}`, err);
        });
    });
}
