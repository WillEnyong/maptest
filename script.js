// Login simulation
document.getElementById('login-btn').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple login check
    if (email && password) {
        document.getElementById('login-panel').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        initializeMap();
    } else {
        alert("Please enter email and password.");
    }
});

let map, markers, workerNodes = [];

// Initialize Leaflet Map
function initializeMap() {
    map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    markers = L.layerGroup().addTo(map);
}

// Display form to add worker node
document.getElementById('add-worker-btn').addEventListener('click', function () {
    document.getElementById('worker-form').style.display = 'block';
});

// Hide form on cancel
document.getElementById('cancel-btn').addEventListener('click', function () {
    document.getElementById('worker-form').style.display = 'none';
});

// Get location from IPInfo.io
async function getLocation(ip) {
    const token = 'fcf6464ef561dc'; // Token IPInfo.io Anda
    try {
        const response = await fetch(`https://ipinfo.io/${ip}?token=${token}`);
        const data = await response.json();
        if (data && data.loc) {
            const [lat, lng] = data.loc.split(',');
            return { lat: parseFloat(lat), lng: parseFloat(lng) };
        }
        return null;
    } catch (error) {
        console.error("Error fetching IP location:", error);
        return null;
    }
}

// Add worker node
document.getElementById('submit-btn').addEventListener('click', async function () {
    const ip = document.getElementById('worker-ip').value;
    const moniker = document.getElementById('moniker').value;
    const address = document.getElementById('worker-address').value;

    if (ip && moniker && address) {
        const location = await getLocation(ip);
        if (location) {
            const marker = L.marker([location.lat, location.lng]).addTo(markers);
            marker.bindPopup(`<b>${moniker}</b><br>${address}`);
            workerNodes.push({ ip, moniker, address, location });

            document.getElementById('worker-form').style.display = 'none';
            document.getElementById('worker-ip').value = '';
            document.getElementById('moniker').value = '';
            document.getElementById('worker-address').value = '';
        } else {
            alert("Lokasi tidak ditemukan untuk IP yang diberikan.");
        }
    }
});

// Delete worker node (dummy functionality for this example)
document.getElementById('delete-btn').addEventListener('click', function () {
    // This should have code to delete node (depends on implementation)
    alert("Worker node deleted (placeholder).");
});
