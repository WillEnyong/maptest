// Ubah URL berikut ke URL proxy server Anda
const proxyUrl = 'http://194.182.87.85/:3110/api/validators';

async function fetchValidators() {
    try {
        const response = await fetch(proxyUrl);
        const validators = await response.json();
        renderValidators(validators);
    } catch (error) {
        console.error('Error fetching validators:', error);
    }
}

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
