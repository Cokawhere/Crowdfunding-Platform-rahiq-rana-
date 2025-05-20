const campaignId = localStorage.getItem("selectedCampaignId"); 
const errorMsg = document.querySelector('.errorMsg');
document.addEventListener("DOMContentLoaded", () => {
    
    fetch(`http://localhost:3000/campaigns/${campaignId}`)
    .then(res => res.json())
    .then(campaign => {
        document.getElementById("campaign-title").value = campaign.title;
        document.getElementById("campaign-description").value = campaign.description;
        document.getElementById("campaign-target").value = campaign.goal;
        document.getElementById("campaign-date").value = campaign.deadline;
        document.getElementById("rewardTitle").value = campaign.rewards[0].title;
        document.getElementById("rewardAmount").value = campaign.rewards[0].amount;
        // document.getElementById("campaign-img").src = campaign.image;
        
    })
    .catch(err => {
        console.error("Failed to load campaign:", err);
    });
});

const editForm = document.querySelector('.edit-campaign-form');

editForm.addEventListener('submit', (e)=>{
    e.preventDefault();
      
    const editedCampaign = {
    title: document.getElementById("campaign-title").value,
    description: document.getElementById("campaign-description").value,
    goal: Number(document.getElementById("campaign-target").value),
    deadline: document.getElementById("campaign-date").value,
    rewards: [
        {
        "id": 1,  //id needs to be dynamic 
        "title": document.getElementById("rewardTitle").value,
        "amount": document.getElementById("rewardAmount").value
        }
    ]
    };
    fetch(`http://localhost:3000/campaigns/${campaignId}`, {
        method: "PATCH", 
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCampaign),
        })
        .then(res => {
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        })
        .then(data => {
            window.location.href = `campaigner-campaign-details.html?id=${campaignId}`;
        })
        .catch(error => {
            errorMsg.innerHTML = error;
        });
})