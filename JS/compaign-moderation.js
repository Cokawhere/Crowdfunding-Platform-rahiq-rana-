const adminName = localStorage.getItem("adminName");
const adminImage = localStorage.getItem("adminImage");

if (adminName && adminImage) {
    document.getElementById("admin-name").textContent = adminName;
    document.getElementById("admin-pic").src = adminImage;
}



const campaignsTableBody = document.querySelector("tbody");
const campaignsNumber = document.querySelector(".campaign-number");


async function fetchCampaignsData() {
    const res = await fetch("http://localhost:3000/campaigns");
    const campaigns = await res.json();
    console.log(campaigns);

    renderCampaigns(campaigns);
}

function renderCampaigns(campaigns) {
    campaignsTableBody.innerHTML = " ";
    campaignsNumber.innerText = `${campaigns.length} Campaigns`;
    campaigns.forEach(campaign => {
        console.log(campaign);


        const row = document.createElement("tr")

        let statusText = "";
        let statusClass = "";

        if (campaign.isApproved === true) {
            statusText = "Approved";
            statusClass = "approve-campaign";
        } else if (campaign.isApproved === false) {
            statusText = "Rejected";
            statusClass = "reject-campaign";
        } else {
            statusText = "Pending";
            statusClass = "campaign-status-pending";
        }

        row.innerHTML = `
            <td><img src="${campaign.image}" class="campaign-img">${campaign.title}</td>
            <td>${campaign.creatorId}</td>
            <td><span class="${statusClass}">${statusText}</span></td>
           <td>
    <button class="toggle-status-btn" data-id="${campaign.id}" data-status="${campaign.isApproved}">
        ${campaign.isApproved === true ? "switch" : "switch"}
    </button>
    <button class="delete-campaign" onclick="deleteCampaign(${campaign.id})">Delete</button>
</td>
        `;

        campaignsTableBody.appendChild(row);
    });


    document.querySelectorAll(".toggle-status-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const button = e.target;
            const id = button.dataset.id;
            const currentStatus = button.dataset.status === "true";


            const newStatus = !currentStatus;

            await updateCampaignStatus(id, newStatus);

            const statusCell = button.closest("tr").querySelector("span");
            statusCell.textContent = newStatus ? "Approved" : "Rejected";
            statusCell.className = newStatus ? "approve-campaign" : "reject-campaign";


            button.textContent = newStatus ? "Reject" : "Approve";
            button.dataset.status = newStatus;
        });
    });
}
async function updateCampaignStatus(campaignId, status) {
    await fetch(`http://localhost:3000/campaigns/${campaignId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: status })
    });

    fetchCampaignsData();
}

async function deleteCampaign(campaignId) {
    await fetch(`http://localhost:3000/campaigns/${campaignId}`, {
        method: "DELETE"
    });

    fetchCampaignsData();
}

fetchCampaignsData();