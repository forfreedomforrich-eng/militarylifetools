// Military Pay Calculator 2026
// Based on official DFAS 2026 pay tables (3.8% raise)

const basePayData = {
    E1: { 0: 2077.20, 2: 2077.20, 3: 2077.20, 4: 2077.20, 6: 2077.20, 8: 2077.20, 10: 2077.20, 12: 2077.20, 14: 2077.20, 16: 2077.20, 18: 2077.20, 20: 2077.20, 22: 2077.20, 24: 2077.20, 26: 2077.20 },
    E2: { 0: 2317.20, 2: 2317.20, 3: 2317.20, 4: 2317.20, 6: 2317.20, 8: 2317.20, 10: 2317.20, 12: 2317.20, 14: 2317.20, 16: 2317.20, 18: 2317.20, 20: 2317.20, 22: 2317.20, 24: 2317.20, 26: 2317.20 },
    E3: { 0: 2377.80, 2: 2377.80, 3: 2592.90, 4: 2592.90, 6: 2592.90, 8: 2592.90, 10: 2592.90, 12: 2592.90, 14: 2592.90, 16: 2592.90, 18: 2592.90, 20: 2592.90, 22: 2592.90, 24: 2592.90, 26: 2592.90 },
    E4: { 0: 2616.90, 2: 2616.90, 3: 2828.70, 4: 2828.70, 6: 2952.00, 8: 2952.00, 10: 2952.00, 12: 2952.00, 14: 2952.00, 16: 2952.00, 18: 2952.00, 20: 2952.00, 22: 2952.00, 24: 2952.00, 26: 2952.00 },
    E5: { 0: 2849.40, 2: 2849.40, 3: 3222.30, 4: 3222.30, 6: 3346.50, 8: 3470.40, 10: 3606.00, 12: 3606.00, 14: 3606.00, 16: 3606.00, 18: 3606.00, 20: 3606.00, 22: 3606.00, 24: 3606.00, 26: 3606.00 },
    E6: { 0: 3151.20, 2: 3151.20, 3: 3552.90, 4: 3552.90, 6: 3681.60, 8: 3810.00, 10: 4012.50, 12: 4215.00, 14: 4215.00, 16: 4215.00, 18: 4215.00, 20: 4215.00, 22: 4215.00, 24: 4215.00, 26: 4215.00 },
    E7: { 0: 3632.10, 2: 3632.10, 3: 4041.00, 4: 4041.00, 6: 4171.50, 8: 4410.90, 10: 4617.60, 12: 4824.90, 14: 4949.40, 16: 5075.10, 18: 5075.10, 20: 5075.10, 22: 5075.10, 24: 5075.10, 26: 5075.10 },
    E8: { 0: 4476.90, 2: 4476.90, 3: 4854.90, 4: 4854.90, 6: 4984.20, 8: 5239.80, 10: 5386.20, 12: 5533.50, 14: 5680.80, 16: 5832.90, 18: 5980.20, 20: 5980.20, 22: 5980.20, 24: 5980.20, 26: 5980.20 },
    E9: { 0: 5673.30, 2: 5673.30, 3: 5673.30, 4: 5673.30, 6: 5799.90, 8: 5925.30, 10: 5965.20, 12: 6090.60, 14: 6216.00, 16: 6342.30, 18: 6468.00, 20: 6594.00, 22: 6720.00, 24: 6846.00, 26: 6972.00 },
    W1: { 0: 3762.30, 2: 3762.30, 3: 4041.00, 4: 4041.00, 6: 4289.40, 8: 4537.80, 10: 4786.20, 12: 5034.60, 14: 5034.60, 16: 5034.60, 18: 5034.60, 20: 5034.60, 22: 5034.60, 24: 5034.60, 26: 5034.60 },
    W2: { 0: 4192.50, 2: 4192.50, 3: 4440.90, 4: 4440.90, 6: 4689.30, 8: 4937.70, 10: 5186.10, 12: 5434.50, 14: 5559.00, 16: 5683.50, 18: 5683.50, 20: 5683.50, 22: 5683.50, 24: 5683.50, 26: 5683.50 },
    W3: { 0: 4683.90, 2: 4683.90, 3: 4810.50, 4: 4937.70, 6: 5063.10, 8: 5311.50, 10: 5560.20, 12: 5808.60, 14: 5933.00, 16: 6057.50, 18: 6182.00, 20: 6306.50, 22: 6431.00, 24: 6555.50, 26: 6680.00 },
    W4: { 0: 5167.20, 2: 5167.20, 3: 5293.80, 4: 5421.00, 6: 5670.30, 8: 5919.60, 10: 6168.90, 12: 6418.20, 14: 6667.50, 16: 6916.80, 18: 7166.10, 20: 7415.40, 22: 7664.70, 24: 7914.00, 26: 8163.30 },
    W5: { 0: 5874.60, 2: 5874.60, 3: 5874.60, 4: 6000.00, 6: 6249.30, 8: 6498.60, 10: 6747.90, 12: 6997.20, 14: 7246.50, 16: 7495.80, 18: 7745.10, 20: 7994.40, 22: 8243.70, 24: 8493.00, 26: 8742.30 },
    O1: { 0: 4150.20, 2: 4150.20, 3: 4512.90, 4: 4739.40, 6: 4739.40, 8: 4739.40, 10: 4739.40, 12: 4739.40, 14: 4739.40, 16: 4739.40, 18: 4739.40, 20: 4739.40, 22: 4739.40, 24: 4739.40, 26: 4739.40 },
    O2: { 0: 4820.70, 2: 4820.70, 3: 5576.70, 4: 5802.90, 6: 5929.50, 8: 5929.50, 10: 5929.50, 12: 5929.50, 14: 5929.50, 16: 5929.50, 18: 5929.50, 20: 5929.50, 22: 5929.50, 24: 5929.50, 26: 5929.50 },
    O3: { 0: 5222.40, 2: 5222.40, 3: 6111.00, 4: 6337.50, 6: 6463.20, 8: 6812.10, 10: 7028.40, 12: 7028.40, 14: 7028.40, 16: 7028.40, 18: 7028.40, 20: 7028.40, 22: 7028.40, 24: 7028.40, 26: 7028.40 },
    O4: { 0: 6377.40, 2: 6377.40, 3: 7134.30, 4: 7360.80, 6: 7486.50, 8: 7735.80, 10: 7985.10, 12: 8234.40, 14: 8483.70, 16: 8733.00, 18: 8982.30, 20: 8982.30, 22: 8982.30, 24: 8982.30, 26: 8982.30 },
    O5: { 0: 7579.50, 2: 7579.50, 3: 8065.20, 4: 8469.30, 6: 8595.00, 8: 8745.00, 10: 9765.30, 12: 9765.30, 14: 9765.30, 16: 9765.30, 18: 9765.30, 20: 9765.30, 22: 9765.30, 24: 9765.30, 26: 9765.30 },
    O6: { 0: 9171.00, 2: 9171.00, 3: 9860.40, 4: 10108.80, 6: 10234.50, 8: 10360.20, 10: 10485.90, 12: 10485.90, 14: 10485.90, 16: 10485.90, 18: 10485.90, 20: 10485.90, 22: 10485.90, 24: 10485.90, 26: 10485.90 },
    O7: { 0: 11343.60, 2: 11343.60, 3: 11343.60, 4: 11343.60, 6: 11343.60, 8: 11343.60, 10: 11343.60, 12: 11343.60, 14: 11343.60, 16: 11343.60, 18: 11343.60, 20: 11343.60, 22: 11343.60, 24: 11343.60, 26: 11343.60 },
    O1E: { 0: 5222.40, 2: 5222.40, 3: 5222.40, 4: 5222.40, 6: 5576.70, 8: 5783.10, 10: 5993.70, 12: 6200.70, 14: 6484.50, 16: 6484.50, 18: 6484.50, 20: 6484.50, 22: 6484.50, 24: 6484.50, 26: 6484.50 },
    O2E: { 0: 6484.50, 2: 6484.50, 3: 6484.50, 4: 6484.50, 6: 6617.70, 8: 6828.00, 10: 7183.80, 12: 7458.90, 14: 7663.50, 16: 7663.50, 18: 7663.50, 20: 7663.50, 22: 7663.50, 24: 7663.50, 26: 7663.50 },
    O3E: { 0: 7382.70, 2: 7382.70, 3: 7382.70, 4: 7382.70, 6: 7737.00, 8: 8125.50, 10: 8375.70, 12: 8788.20, 14: 9137.10, 16: 9336.90, 18: 9609.60, 20: 9609.60, 22: 9609.60, 24: 9609.60, 26: 9609.60 }
};

// BAS rates 2026
const basRates = {
    enlisted: 452.56,
    officer: 311.68
};

// BAH data (same as BAH calculator)
const bahData = {
    "92134": { name: "San Diego, CA", rates: { E1: {w: 3630, wo: 3003}, E2: {w: 3630, wo: 3003}, E3: {w: 3630, wo: 3003}, E4: {w: 3630, wo: 3003}, E5: {w: 3975, wo: 3321}, E6: {w: 4380, wo: 3651}, E7: {w: 4593, wo: 3753}, E8: {w: 4836, wo: 3948}, E9: {w: 5103, wo: 4170}, W1: {w: 4380, wo: 3651}, W2: {w: 4593, wo: 3753}, W3: {w: 4836, wo: 3948}, W4: {w: 5103, wo: 4170}, W5: {w: 5370, wo: 4395}, O1: {w: 3753, wo: 3126}, O2: {w: 4380, wo: 3651}, O3: {w: 4836, wo: 3948}, O4: {w: 5370, wo: 4395}, O5: {w: 5640, wo: 4617}, O6: {w: 5895, wo: 4830}, O7: {w: 6150, wo: 5043}, O1E: {w: 4593, wo: 3753}, O2E: {w: 4836, wo: 3948}, O3E: {w: 5103, wo: 4170} } },
    "10001": { name: "New York City, NY", rates: { E1: {w: 4353, wo: 3609}, E2: {w: 4353, wo: 3609}, E3: {w: 4353, wo: 3609}, E4: {w: 4353, wo: 3609}, E5: {w: 5073, wo: 4215}, E6: {w: 5335, wo: 4431}, E7: {w: 5597, wo: 4647}, E8: {w: 5859, wo: 4863}, E9: {w: 6121, wo: 5079}, W1: {w: 5335, wo: 4431}, W2: {w: 5597, wo: 4647}, W3: {w: 5859, wo: 4863}, W4: {w: 6121, wo: 5079}, W5: {w: 6383, wo: 5295}, O1: {w: 4650, wo: 3855}, O2: {w: 5335, wo: 4431}, O3: {w: 5859, wo: 4863}, O4: {w: 6383, wo: 5295}, O5: {w: 6645, wo: 5511}, O6: {w: 6907, wo: 5727}, O7: {w: 7169, wo: 5943}, O1E: {w: 5597, wo: 4647}, O2E: {w: 5859, wo: 4863}, O3E: {w: 6121, wo: 5079} } },
    "76544": { name: "Fort Hood, TX", rates: { E1: {w: 1542, wo: 1293}, E2: {w: 1542, wo: 1293}, E3: {w: 1542, wo: 1293}, E4: {w: 1542, wo: 1293}, E5: {w: 1806, wo: 1527}, E6: {w: 2118, wo: 1713}, E7: {w: 2364, wo: 1863}, E8: {w: 2523, wo: 2013}, E9: {w: 2706, wo: 2196}, W1: {w: 2118, wo: 1713}, W2: {w: 2364, wo: 1863}, W3: {w: 2523, wo: 2013}, W4: {w: 2706, wo: 2196}, W5: {w: 2889, wo: 2379}, O1: {w: 1656, wo: 1386}, O2: {w: 2118, wo: 1713}, O3: {w: 2523, wo: 2013}, O4: {w: 2889, wo: 2379}, O5: {w: 3072, wo: 2562}, O6: {w: 3255, wo: 2745}, O7: {w: 3438, wo: 2928}, O1E: {w: 2364, wo: 1863}, O2E: {w: 2523, wo: 2013}, O3E: {w: 2706, wo: 2196} } },
    "28310": { name: "Fort Liberty, NC", rates: { E1: {w: 1542, wo: 1293}, E2: {w: 1542, wo: 1293}, E3: {w: 1542, wo: 1293}, E4: {w: 1542, wo: 1293}, E5: {w: 1806, wo: 1527}, E6: {w: 2118, wo: 1713}, E7: {w: 2364, wo: 1863}, E8: {w: 2523, wo: 2013}, E9: {w: 2706, wo: 2196}, W1: {w: 2118, wo: 1713}, W2: {w: 2364, wo: 1863}, W3: {w: 2523, wo: 2013}, W4: {w: 2706, wo: 2196}, W5: {w: 2889, wo: 2379}, O1: {w: 1656, wo: 1386}, O2: {w: 2118, wo: 1713}, O3: {w: 2523, wo: 2013}, O4: {w: 2889, wo: 2379}, O5: {w: 3072, wo: 2562}, O6: {w: 3255, wo: 2745}, O7: {w: 3438, wo: 2928}, O1E: {w: 2364, wo: 1863}, O2E: {w: 2523, wo: 2013}, O3E: {w: 2706, wo: 2196} } }
};

document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const zipInput = document.getElementById('zipCode');
    const suggestionsDiv = document.getElementById('zipSuggestions');

    calculateBtn.addEventListener('click', calculatePay);

    // Autocomplete for ZIP codes
    zipInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        if (value.length < 2) {
            suggestionsDiv.classList.add('hidden');
            return;
        }

        const matches = Object.entries(bahData).filter(([zip, data]) =>
            zip.includes(value) || data.name.toLowerCase().includes(value)
        );

        if (matches.length > 0) {
            suggestionsDiv.innerHTML = matches.slice(0, 5).map(([zip, data]) =>
                `<div class="suggestion-item" data-zip="${zip}">${data.name} (${zip})</div>`
            ).join('');
            suggestionsDiv.classList.remove('hidden');

            suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    zipInput.value = this.dataset.zip;
                    suggestionsDiv.classList.add('hidden');
                });
            });
        } else {
            suggestionsDiv.classList.add('hidden');
        }
    });

    document.addEventListener('click', function(e) {
        if (!suggestionsDiv.contains(e.target) && e.target !== zipInput) {
            suggestionsDiv.classList.add('hidden');
        }
    });
});

function calculatePay() {
    const payGrade = document.getElementById('payGrade').value;
    const years = parseInt(document.getElementById('years').value);
    const zipCode = document.getElementById('zipCode').value.trim();
    const dependency = document.getElementById('dependency').value;

    if (!payGrade) {
        alert('Please select a pay grade');
        return;
    }

    // Get base pay
    const basePay = getBasePay(payGrade, years);

    // Get BAS
    const isOfficer = payGrade.startsWith('O') || payGrade.startsWith('W');
    const bas = isOfficer ? basRates.officer : basRates.enlisted;

    // Get BAH
    let bah = 0;
    if (zipCode && bahData[zipCode]) {
        const rates = bahData[zipCode].rates[payGrade];
        if (rates) {
            bah = dependency === 'with' ? rates.w : rates.wo;
        }
    }

    const totalMonthly = basePay + bah + bas;
    const totalAnnual = totalMonthly * 12;

    // Display results
    const rankName = getRankName(payGrade);
    document.getElementById('resultRank').textContent = rankName;
    document.getElementById('basePay').textContent = '$' + basePay.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('bahPay').textContent = '$' + bah.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('basPay').textContent = '$' + bas.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('totalMonthly').textContent = '$' + totalMonthly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('totalAnnual').textContent = '$' + totalAnnual.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    document.getElementById('payResult').classList.remove('hidden');
}

function getBasePay(payGrade, years) {
    const gradeData = basePayData[payGrade];
    if (!gradeData) return 0;

    // Find the appropriate years bracket
    const yearBrackets = [0, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26];
    let bracket = 0;
    for (const b of yearBrackets) {
        if (years >= b) bracket = b;
    }

    return gradeData[bracket] || 0;
}

function getRankName(payGrade) {
    const rankNames = {
        E1: 'Private (E-1)',
        E2: 'Private Second Class (E-2)',
        E3: 'Private First Class (E-3)',
        E4: 'Specialist/Corporal (E-4)',
        E5: 'Sergeant (E-5)',
        E6: 'Staff Sergeant (E-6)',
        E7: 'Sergeant First Class (E-7)',
        E8: 'Master Sergeant (E-8)',
        E9: 'Sergeant Major (E-9)',
        W1: 'Warrant Officer 1 (W-1)',
        W2: 'Chief Warrant Officer 2 (W-2)',
        W3: 'Chief Warrant Officer 3 (W-3)',
        W4: 'Chief Warrant Officer 4 (W-4)',
        W5: 'Chief Warrant Officer 5 (W-5)',
        O1: 'Second Lieutenant (O-1)',
        O2: 'First Lieutenant (O-2)',
        O3: 'Captain (O-3)',
        O4: 'Major (O-4)',
        O5: 'Lieutenant Colonel (O-5)',
        O6: 'Colonel (O-6)',
        O7: 'Brigadier General (O-7)',
        O1E: 'Second Lieutenant (O-1E)',
        O2E: 'First Lieutenant (O-2E)',
        O3E: 'Captain (O-3E)'
    };
    return rankNames[payGrade] || payGrade;
}

function copyEmbed(btn) {
    const code = btn.previousElementSibling.textContent;
    navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = 'Copy Code';
        }, 2000);
    });
}
