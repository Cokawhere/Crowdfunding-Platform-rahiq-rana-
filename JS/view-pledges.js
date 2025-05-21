const adminName = localStorage.getItem("adminName");
const adminImage = localStorage.getItem("adminImage");

if (adminName && adminImage) {
    document.getElementById("admin-name").textContent = adminName;
    document.getElementById("admin-pic").src = adminImage;
}


async function getData(){
    const pledgesContainer = document.querySelector("tbody");

    try {
        const [pledgesRes, campaignsRes, usersRes] = await Promise.all([
            fetch("http://localhost:3000/pledges"),
            fetch("http://localhost:3000/campaigns"),
            fetch("http://localhost:3000/users")
        ]);

        const pledges = await pledgesRes.json();
        const campaigns = await campaignsRes.json();
        const users = await usersRes.json();

        pledgesContainer.innerHTML = ""; 

        pledges.forEach(pledge => {
            const campaign = campaigns.find(c => c.id == pledge.campaignId);
            const backer = users.find(u => u.id == pledge.backerId);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${campaign.title }</td>
                <td>${backer.userName }</td>
                <td>$${pledge.amount}</td>
                <td>${pledge.reward}</td>
                <td><span class="${pledge.status === "successful" ? "successful-pledge" : "processing-pledge"}">${pledge.status.charAt(0).toUpperCase() + pledge.status.slice(1)}</span></td>
                <td>${new Date(pledge.date).toLocaleDateString()}</td>
                
            `;
            pledgesContainer.appendChild(row);
        });

        document.querySelector(".pledges-number").textContent = `${pledges.length} Pledges`;

    } catch (error) {
        console.error("Error loading pledges:", error);
    }
    }
    getData();