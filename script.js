// Fungsi untuk tombol login
document.getElementById('login-btn').addEventListener('click', function(event) {
    event.preventDefault();  // Mencegah pengiriman form dan memuat ulang halaman
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        // Simulasikan login berhasil (untuk saat ini hanya sembunyikan panel login dan tampilkan aplikasi)
        document.getElementById('login-panel').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    } else {
        alert('Silakan masukkan email dan password');
    }
});

// Fungsi untuk mem-fetch data validator (Simulasi)
const proxyUrl = 'http://194.182.87.85/:3110/api/validators';  // Ganti dengan URL yang sesuai

async function fetchValidators() {
    try {
        const response = await fetch(proxyUrl);
        const validators = await response.json();
        renderValidators(validators);
    } catch (error) {
        console.error('Error fetching validators:', error);
    }
}

// Fungsi untuk merender data validator ke UI
function renderValidators(validators) {
    const validatorContainer = document.getElementById('validator-info');
    validatorContainer.innerHTML = '';

    validators.forEach(validator => {
        const {
            moniker,
            operator_address,
            status,
            tokens,
            commission,
        } = validator;

        const validatorElement = document.createElement('div');
        validatorElement.className = 'validator';

        validatorElement.innerHTML = `
            <h3>${moniker}</h3>
            <p>Address: ${operator_address}</p>
            <p>Status: ${status}</p>
            <p>Tokens: ${tokens}</p>
            <p>Commission Rate: ${commission.commission_rates.rate}</p>
            <p>Misblocks: 🟩🟩🟩🟩🟩🟩🟩🟩</p> <!-- Simulasi data misblock -->
            <p>Rank: 1</p> <!-- Bisa diatur berdasarkan kondisi -->
            <p>Uptime: 99%</p> <!-- Contoh data uptime -->
        `;

        validatorContainer.appendChild(validatorElement);
    });
}

// Panggil fetchValidators untuk load data saat aplikasi dimulai
fetchValidators();
