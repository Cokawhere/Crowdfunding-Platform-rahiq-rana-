const rewardAmount = document.querySelector('.campaign-details-reward-card-money-amount');
const rewardName = document.querySelector('.campaign-details-reward-card-reward-name');
const rewardBackersCount = document.getElementById('rewardBackersCount');
const progressBar = document.querySelector('.progress-bar');

document.addEventListener("DOMContentLoaded", () => {
  const campaignId = localStorage.getItem("selectedCampaignId");
  
    fetch(`http://localhost:3000/campaigns/${campaignId}`)
    .then(res => {
        if (!res.ok) {
        throw new Error("Campaign not found");
        }
        return res.json();
    })
    .then(campaign => {
        document.getElementById("campaign-title").innerText = campaign.title;
        document.getElementById("campaign-description").innerText = campaign.description;
        document.getElementById("campaign-goal").innerText = `Raised of ${campaign.goal}$`;
        document.getElementById("campaign-deadline").innerText = campaign.deadline;
        document.getElementById("campaign-image").src = campaign.image;
        document.getElementById("campaign-goal-aside").innerText = campaign.goal;
        document.getElementById("campaign-deadline-aside").innerText = campaign.deadline;
        rewardAmount.innerText = campaign.rewards[0].amount;
        rewardName.innerText = campaign.rewards[0].title;

        //////////////////// this must be changed to raised amount / goal 
        progressBar.style.width = '0';

    })
    .catch(err => {
        console.error("Error fetching campaign details:", err);
    });

    fetch(`http://localhost:3000/updates?campaignId=${campaignId}`)
    .then(res => res.json())
    .then(updates => {
        displayUpdate(updates);
    })
    .catch(err => {
        console.error("Error fetching campaign updates:", err);
    });


    fetch(`http://localhost:3000/pledges?campaignId=${campaignId}`)
    .then(res => res.json())
    .then(pledges => {
        displayPledges(pledges);
    })
    .catch(err => {
        console.error("Error fetching campaign pledges:", err);
    });

});



function displayUpdate(updates){
    const container = document.querySelector(".campaign-details-campaign-updates");

    if (updates.length === 0) {
        container.innerHTML += `<p>No updates yet for this campaign.</p>`;
        return;
    }

    const updatesContainer = document.createElement("div");
    updatesContainer.id = "campaign-updates-container";

    updates.forEach(update => {
    const card = document.createElement("div");
    card.className = "campaign-details-campaign-updates-card";

    card.innerHTML = `
      <p class="campaign-details-campaign-updates-card-title">${update.title}</p>
      <p class="campaign-details-campaign-updates-card-date">${update.date}</p>
      <p>${update.content}</p>
      <a href="#" class="campaign-details-campaign-updates-card-read-more">Read More →</a>
    `;

    container.appendChild(card);
    });
}




function displayPledges(pledges){
    const container = document.querySelector('.campaign-details-campaign-pledges');

    if (pledges.length === 0) {
        container.innerHTML += `<p>No Pledges yet for this campaign.</p>`;
        return;
    }

    const pledgesContainer = document.querySelector('.campaign-pledges-container');
    pledgesContainer.innerHTML = "";

    pledges.forEach(async pledge => {
        try {
            // to get backer name
            const userRes = await fetch(`http://localhost:3000/users/${pledge.userId}`);
            const user = await userRes.json();

            // to get campaign to fetch rewards
            const campaignRes = await fetch(`http://localhost:3000/campaigns/${pledge.campaignId}`);
            const campaign = await campaignRes.json();

            const reward = campaign.rewards.find(reward => reward.id === pledge.rewardId);

            const card = document.createElement("div");
            card.className = "campaign-pledge-card";

            card.innerHTML = `
                <div class="backer-name">${user.userName}</div>
                <h4 class="pledge-amount">${pledge.amount}$</h4>
                <div class="reward-selected">${reward ? reward.title : "No reward selected"}</div>
            `;

            container.appendChild(card);

        } catch (err) {
            console.error("Error loading pledge info:", err);
        }
    });
}





