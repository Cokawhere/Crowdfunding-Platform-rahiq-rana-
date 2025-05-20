const updateForm = document.querySelector('.campaign-update-form');
const campaignId = localStorage.getItem("selectedCampaignId");
const errorMsg = document.querySelector('.errorMsg');

updateForm.addEventListener('submit', async(e)=>{

    e.preventDefault();
    const updateTitle = document.getElementById('update-title').value.trim();
    const updateContent = document.getElementById('update-content').value.trim();

    const date = new Date().toLocaleString();

    const allUpdatesRes =  await fetch(`http://localhost:3000/updates`);
    const allUpdates = await allUpdatesRes.json();
    const id =  allUpdates.length + 1;

    const newUpdate = {
        id,
        campaignId,
        title: updateTitle,
        content: updateContent,
        date
    };

    try {
        const res = await fetch("http://localhost:3000/updates", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUpdate)
        });

        if (res.ok) {
            window.location.href = 'campaigner-campaign-details.html';
        } else {
            errorMsg.textContent = "Failed to post update.";
        }
    } catch (err) {
        console.error("Error posting update:", err);
        errorMsg.textContent = "An error occurred.";
    }
    });

