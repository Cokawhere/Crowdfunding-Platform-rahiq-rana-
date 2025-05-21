const form = document.getElementById("createCampaignForm");
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(currentUser);

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

    fetch("http://localhost:3000/campaigns")
      .then(res => res.json())
      .then(allCampaigns => {
        const id = allCampaigns.length + 1;

        reader.onloadend = function () {
          const base64Image = reader.result;

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
                id: 1,
                title: rewardTitle,
                amount: rewardAmount
              }
            ]
          };

          fetch("http://localhost:3000/campaigns", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(campaignData)
          })
            .then(() => {
              window.location.href = 'campaigner-dashboard.html';
            })
            .catch(err => {
              console.error("Error in creating campaign", err);
              alert("an error occured");
            });
        };

        reader.readAsDataURL(file);
      });
    });




const profileSelection = document.getElementById('viewProfile');


profileSelection.addEventListener('click', function () {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

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