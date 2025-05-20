const currentUser = JSON.parse(localStorage.getItem("user"));
const wlcomeMsg = document.getElementById('user-welcome-msg');
const totalCampaigns = document.getElementById('totalCampaigns');
const approvedCampaigns = document.getElementById('approvedCampaigns');
const totalSupporter = document.getElementById('totalSupporter');
wlcomeMsg.innerText = `Welcome back, ${currentUser.userName}`;

document.addEventListener('DOMContentLoaded', () => {
    // console.log(currentUser); 

    fetch("http://localhost:3000/campaigns")
        .then(result => result.json())
        .then(allCampaigns => {
            const userCampaigns = allCampaigns.filter(campaign => campaign.creatorId === currentUser.id);
            totalCampaigns.innerText = userCampaigns.length;
            approvedCampaigns.innerText = userCampaigns.filter(campaign => campaign.isApproved === true).length;

            fetch("http://localhost:3000/pledges").then(res => res.json()).then(allPledges => {
                const userSupporters = allPledges.filter(pledge => pledge.campaignerId === currentUser.id);
                totalSupporter.innerText = userSupporters.length;
            })

            displayCampaigns(userCampaigns); 

            const container = document.querySelector(".campainer-dashboard-created-campaigns-cards");
            container.addEventListener("click", function (e) {
                const target = e.target;
                const card = target.closest(".campainer-dashboard-created-campaigns-card");

                if (!card) return;

                const campaignId = card.getAttribute("data-campaign-id");
                localStorage.setItem("selectedCampaignId", campaignId);

                if (target.closest(".campaign-edit-btn")) {
                    window.location.href = 'edit-campaign.html';
                } else if (target.closest(".campaign-view-btn")) {
                    window.location.href = 'campaigner-campaign-details.html';
                } else if (target.closest(".campaign-update-btn")) {
                    window.location.href = 'post-update.html';
                }
            });
        })
        .catch(err => {
            console.error("Error fetching campaigns:", err);
        });
});


function displayCampaigns(campaigns) {
  const campaignsContainer = document.querySelector(".campainer-dashboard-created-campaigns-cards");
  campaignsContainer.innerHTML = "";

  if (campaigns.length === 0) {
    campaignsContainer.innerHTML = "<p>You have no created campaigns</p>";
    return;
  }

  campaigns.forEach(campaign => {
    const approvedClass = campaign.isApproved ? "campaign-status-approved" : "campaign-status-pending";
    const approvedText = campaign.isApproved ? "Approved" : "Pending";
    campaign.raisedAmount = 0;
    const progress = Math.round((campaign.raisedAmount / campaign.goal) * 100);

    const card = document.createElement("div");
    card.className = "campainer-dashboard-created-campaigns-card";

    card.setAttribute("data-campaign-id", campaign.id); 

    card.innerHTML = `
      <div class="campainer-dashboard-created-campaigns-card-row">
          <p class="campaign-title">${campaign.title}</p>
          <div class="${approvedClass}">${approvedText}</div>
      </div>
      <div class="campainer-dashboard-created-campaigns-card-row">
          <p>Progress</p>
          <div class="pledge-progress">${campaign.raisedAmount} / ${campaign.goal}$</div>
      </div>
      <div class="campaign-progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
      </div>
      <div class="campainer-dashboard-created-campaigns-card-btns">
          <button class="campaign-edit-btn"><i class="fa fa-pencil-square-o"></i> Edit</button> 
          <button class="campaign-view-btn"><i class="fa fa-eye"></i>View</button> 
          <button class="campaign-update-btn"><i class="fa fa-bullhorn"></i>Update</button>
      </div>
    `;

    campaignsContainer.appendChild(card);
  });
}
