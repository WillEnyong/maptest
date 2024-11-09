document.addEventListener('DOMContentLoaded', function () {
    // Inisialisasi peta
    const map = L.map('map').setView([51.505, -0.09], 13); // Atur koordinat peta dan level zoom

    // Menambahkan tile layer dari OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Memanggil API dari VPS untuk mengambil data validator
    fetch('http://your-vps-ip:3110/validators')  // Ganti dengan IP atau domain VPS Anda
        .then(response => response.json())
        .then(data => {
            renderValidators(data);
            // Simulasi peta dengan menambahkan marker untuk setiap validator
            data.validators.forEach(validator => {
                const { moniker, operator_address, location } = validator;

                // Jika data lokasi ada, tampilkan marker
                if (location && location.lat && location.lng) {
                    L.marker([location.lat, location.lng]).addTo(map)
                        .bindPopup(`<b>${moniker}</b><br>Address: ${operator_address}`);
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function renderValidators(validators) {
    const validatorContainer = document.getElementById('validator-info');
    validatorContainer.innerHTML = '';

    validators.forEach(validator => {
        const { moniker, operator_address, status, tokens, commission } = validator;

        const validatorElement = document.createElement('div');
        validatorElement.className = 'validator';

        validatorElement.innerHTML = `
            <h3>${moniker}</h3>
            <p>Address: ${operator_address}</p>
            <p>Status: ${status}</p>
            <p>Tokens: ${tokens}</p>
            <p>Commission Rate: ${commission.commission_rates.rate}</p>
        `;

        validatorContainer.appendChild(validatorElement);
    });
}
