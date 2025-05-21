document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const campaignId = params.get("id");
    localStorage.setItem("campaignId", JSON.stringify(campaignId));


    if (!campaignId) {
        alert("No campaign selected");
        return;
    }

    fetch(`http://localhost:3000/campaigns/${campaignId}`)
        .then(res => {
            if (!res.ok) throw new Error("Campaign not found");
            return res.json();
        })
        .then(campaign => {
            document.getElementById("campaign-title").innerText = campaign.title;
            document.getElementById("campaign-description").innerText = campaign.description;
            document.getElementById("campaign-image").src = campaign.image;
            document.querySelector(".campaign-rais-details-numbers-amount-price").innerText = ` $ ${campaign.rewards[0].amount} goal`;
            document.getElementById("campaign-goal").innerText = `raised of $ ${campaign.goal}goal`;
            userData(campaign.creatorId)

        })
        .catch(err => {
            console.error("Error fetching campaign details:", err);
            alert("Failed to load campaign details");
        });

});

async function userData(userid) {
    try {
        const res = await fetch(`http://localhost:3000/users/${userid}`);
        const userdata = await res.json();
        console.log(userdata);
        document.querySelector("#compaigner-img").src = userdata.image;
        document.querySelector(".campaigner-details-name").innerText = userdata.userName;
    } catch (err) {
        console.error("Error fetching user details:", err);
        alert("Failed to load user details");
    };

}


const campaignId = JSON.parse(localStorage.getItem("campaignId"));
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
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
                backerId: currentUser.id,
                amount:pledgeAmount,
                reward: "Ultimate Package",
                status:"processing",
                date:"2025-05-21"
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