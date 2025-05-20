async function adminDashBoardGetDta() {
    try {
        const userData = await fetch("http://localhost:3000/users");
        const users = await userData.json();

        const campaignData = await fetch("http://localhost:3000/campaigns");
        const campaigns = await campaignData.json();

        const pledgesData = await fetch("http://localhost:3000/pledges");
        const pledges = await pledgesData.json();

        const totalPledges = pledges.length;
        const totalUsers = users.length;

        const totalCampaigns = campaigns.filter(c => c.isApproved === true).length;
        const admin = users.find(c => c.role === "admin");

        const adminName = admin.userName;
        const adminImage = admin.image;

        localStorage.setItem("adminName", adminName);
        localStorage.setItem("adminImage", adminImage);

        const data = {
            totalCampaigns,
            totalPledges,
            totalUsers,
            adminName,
            adminImage,
        }
        return data;
    } catch (error) { console.error("Error fetching admin dashboard data:", error) }
}


function displayAdminDashboardData(data) {
    if (!data) return;

    document.getElementById("total-users").textContent = data.totalUsers;
    document.getElementById("active-campaigns").textContent = data.totalCampaigns;
    document.getElementById("total-pledges").textContent = data.totalPledges;
    document.getElementById("admin-name").textContent = data.adminName;
    document.getElementById("admin-image").src = data.adminImage;

}


adminDashBoardGetDta().then(data => displayAdminDashboardData(data));

