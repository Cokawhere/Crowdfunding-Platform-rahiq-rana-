const form = document.getElementById("createCampaignForm");
const currentUser = JSON.parse(localStorage.getItem("user"));

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById('campaign-title').value.trim();
  const goal = parseInt(document.getElementById('campaign-target').value.trim());
  const description = document.getElementById('campaign-description').value;
  const deadline = document.getElementById('campaign-date').value.trim();
  const rewardTitle = document.getElementById('reward-title').value.trim();
  const rewardAmount = parseInt(document.getElementById('reward-amount').value.trim());
  const imageInput = document.getElementById("campaign-img");

  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    const base64Image = reader.result;

    fetch("http://localhost:3001/campaigns")
      .then(res => res.json())
      .then(allCampaigns => {
        const id = allCampaigns.length + 1;

        const campaignData = {
          id,
          creatorId: currentUser.id,
          title,
          description,
          goal,
          deadline,
          isApproved: false,
          image: base64Image, 
          rewards: [
            {
              id: 5,
              title: rewardTitle,
              amount: rewardAmount
            }
          ]
        };

        return fetch("http://localhost:3001/campaigns", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(campaignData)
        });
      })
      .then(res => res.json())
      .then(data => {
        window.location.href = 'campaigner-dashboard.html';
      })
      .catch(err => {
        console.error("Erroe in creating campaign", err);
        alert("An error occured");
      });
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    fetch("http://localhost:3001/campaigns")
      .then(res => res.json())
      .then(allCampaigns => {
        const id = allCampaigns.length + 1;

        const campaignData = {
          id,
          creatorId: currentUser.id,
          title,
          description,
          goal,
          deadline,
          isApproved: false,
          image: null, 
          rewards: [
            {
              id: 1,
              title: rewardTitle,
              amount: rewardAmount
            }
          ]
        };

        return fetch("http://localhost:3001/campaigns", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(campaignData)
        });
      })
      .then(res => res.json())
      .then(data => {
        window.location.href = 'campaigner-dashboard.html';
      })
      .catch(err => {
        console.error("Erroe in creating campaign", err);
        alert("An rrror occured");
      });
  }
});
