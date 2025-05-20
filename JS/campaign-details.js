const campaignId = JSON.parse(localStorage.getItem("selectedCampaignId"));
const currentUser = JSON.parse(localStorage.getItem("user"));
const pledgePaymentBtn = document.querySelector('.bledge-payment-btn');

pledgePaymentBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const pledgeAmount = document.getElementById('pledge-amount-input').value.trim();

    fetch('http://localhost:3000/pledges')
        .then(res => res.json()) 
        .then(allPledges => {
          const id = allPledges.length + 1;

          const newPledge = {
            id,
            campaignId,
            userId: currentUser.id, 
            pledgeAmount,
            rewardId: 1
          };

          return fetch("http://localhost:3000/pledges", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newPledge)
          });
      })
      .then(res => {
          if (!res.ok) throw new Error("Failed to create pledge");
          window.location.href = 'backer-dashboard.html';
      })
      .catch(err => {
          console.error("Error in payment", err);
          alert("An error occurred");
      });
});



const params = new URLSearchParams(window.location.search);
// const campaignId = params.get("id");

if (campaignId) {
    fetch(`http://localhost:3000/campaigns/${campaignId}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector("h1").textContent = data.title;
            document.querySelector(".campaign-details-img").src = data.image;
            document.querySelector(".campaign-details-about p").textContent = data.description;
        })
        .catch(err => console.error("faild to upload the campaign", err));
}


document.addEventListener("DOMContentLoaded", () => {
    const campaignId = localStorage.getItem("selectedCampaignId");
    
        console.log("Selected ID:", campaignId);

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
            document.getElementById("campaign-goal").innerText = `Raised of ${campaign.goal}$ goal`;
            document.getElementById("campaign-deadline").innerText = campaign.deadline;
            document.getElementById("campaign-image").src = campaign.image;
        })
        .catch(err => {
            console.error("Error fetching campaign details:", err);
            alert("Failed to load campaign details");
      });

});