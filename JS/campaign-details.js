const params = new URLSearchParams(window.location.search);
const campaignId = params.get("id");

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


