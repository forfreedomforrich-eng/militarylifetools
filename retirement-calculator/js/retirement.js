// Military Retirement Pay Calculator 2026
// Uses official DFAS retirement pay tables (3.8% raise for 2026)
// Supports both Legacy (pre-2018) and BRS (Blended Retirement System)

const ret2026 = {
    E7:  { h3: 5683.20, base: 4824.90 },
    E8:  { h3: 6388.20, base: 5533.50 },
    E9:  { h3: 7305.00, base: 6090.60 },
    O5:  { h3: 10567.80, base: 9765.30 },
    O6:  { h3: 12318.60, base: 10485.90 },
    O7:  { h3: 14041.80, base: 11343.60 },
    W4:  { h3: 7672.50, base: 6418.20 },
    W5:  { h3: 9010.20, base: 6997.20 }
};

function calculateRetirement() {
    const years = parseInt(document.getElementById('years').value);
    const rank = document.getElementById('rank').value;
    const system = document.getElementById('system').value;

    if (isNaN(years) || years < 20 || years > 40) {
        alert('Years of service must be between 20 and 40');
        return;
    }
    if (!rank || !ret2026[rank]) {
        alert('Please select a valid rank');
        return;
    }

    // Multiplier formula
    let multiplier;
    if (system === 'legacy') {
        // Legacy: 50% at 20, +2.5%/year, cap 75% at 40
        multiplier = Math.min(0.5 + (years - 20) * 0.025, 0.75);
    } else {
        // BRS: 40% at 20, +2%/year, cap 60% at 30
        multiplier = Math.min(0.4 + (years - 20) * 0.02, 0.60);
    }

    const high3 = ret2026[rank].h3;
    const monthly = high3 * multiplier;
    const annual = monthly * 12;

    // BRS also gets TSP matching (1% automatic + up to 4% match = 5% total)
    // Assume average TSP balance and 4% personal contribution + 5% match for illustration
    let tspNote = '';
    if (system === 'brs') {
        tspNote = 'BRS includes Thrift Savings Plan (TSP) with 1% automatic + up to 4% agency match (5% total). Estimate: $300-800/month extra from TSP, depending on balance and growth.';
    } else {
        tspNote = 'Legacy system does NOT include TSP matching. Only the defined-benefit pension above.';
    }

    document.getElementById('resultMultiplier').textContent = (multiplier * 100).toFixed(1) + '%';
    document.getElementById('resultHigh3').textContent = '$' + high3.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('resultMonthly').textContent = '$' + monthly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('resultAnnual').textContent = '$' + annual.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('resultLumpSum').textContent = '$' + (monthly * 36).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('resultTspNote').textContent = tspNote;

    document.getElementById('retResult').classList.remove('hidden');
    document.getElementById('retResult').scrollIntoView({behavior: 'smooth', block: 'start'});
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateBtn').addEventListener('click', calculateRetirement);
});
