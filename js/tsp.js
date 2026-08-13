// TSP Withdrawal Calculator 2026
// Calculates sustainable monthly withdrawal from TSP balance
// Accounts for taxes, early-withdrawal penalties, and growth

function calculateTSP() {
    const balance = parseFloat(document.getElementById('balance').value);
    const monthlyWithdrawal = parseFloat(document.getElementById('monthlyWithdrawal').value);
    const tspType = document.getElementById('tspType').value;
    const age = parseInt(document.getElementById('age').value);
    const taxBracket = parseFloat(document.getElementById('taxBracket').value) / 100;
    const annualReturn = parseFloat(document.getElementById('annualReturn').value) / 100;

    if (isNaN(balance) || balance <= 0) { alert('Please enter a valid TSP balance'); return; }
    if (isNaN(monthlyWithdrawal) || monthlyWithdrawal <= 0) { alert('Please enter a valid monthly withdrawal amount'); return; }

    const r = Math.pow(1 + annualReturn, 1/12) - 1;
    const isRoth = tspType === 'roth';
    const isEarly = age < 59;
    const monthlyTaxRate = taxBracket / 12;
    const earlyPenalty = isEarly && !isRoth ? 0.10 : (isEarly && isRoth ? 0.10 : 0);

    // Net monthly withdrawal after taxes + penalty
    const taxAmount = isRoth ? 0 : monthlyWithdrawal * monthlyTaxRate;
    const penaltyAmount = isEarly ? monthlyWithdrawal * 0.10 : 0;
    const netMonthly = monthlyWithdrawal - taxAmount - penaltyAmount;

    // Months until depletion (simplified annuity formula)
    let months = 0;
    let running = balance;
    let totalWithdrawn = 0;
    let totalTax = 0;
    let totalPenalty = 0;

    if (r === 0) {
        // Simple: balance / withdrawal
        months = Math.floor(balance / monthlyWithdrawal);
        totalWithdrawn = monthlyWithdrawal * months;
        totalTax = taxAmount * months;
        totalPenalty = penaltyAmount * months;
    } else {
        // Iterate month by month
        while (running > 0 && months < 600) {
            running = running * (1 + r) - monthlyWithdrawal;
            totalWithdrawn += monthlyWithdrawal;
            totalTax += taxAmount;
            totalPenalty += penaltyAmount;
            months++;
        }
    }

    const years = months / 12;

    document.getElementById('resultNetMonthly').textContent = '$' + netMonthly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('resultDuration').textContent = years >= 1 ? years.toFixed(1) + ' years (' + months + ' months)' : months + ' months';
    document.getElementById('resultTotalWithdrawn').textContent = '$' + totalWithdrawn.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('resultTotalTax').textContent = '$' + (totalTax + totalPenalty).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});

    let notes = '';
    if (isRoth && !isEarly) {
        notes = '<strong>Roth TSP, age ' + age + ' (qualified withdrawal):</strong> Tax-free! No income tax, no 10% penalty. You get the full $' + monthlyWithdrawal.toLocaleString() + '/mo.';
    } else if (isRoth && isEarly) {
        const earningsRatio = 0.5;
        const penaltyAmt = monthlyWithdrawal * earningsRatio * 0.10;
        notes = '<strong>Roth TSP, age ' + age + ' (early withdrawal):</strong> Earnings portion subject to 10% penalty (~10% of $' + monthlyWithdrawal.toLocaleString() + ' = $' + penaltyAmt.toFixed(2) + '/mo). Contributions can be withdrawn tax-free anytime.';
    } else if (!isRoth && !isEarly) {
        notes = '<strong>Traditional TSP, age ' + age + ':</strong> Subject to ' + (taxBracket * 100) + '% federal income tax (~$' + taxAmount.toFixed(2) + '/mo). State tax may also apply. No 10% penalty.';
    } else {
        notes = '<strong>Traditional TSP, age ' + age + ' (early withdrawal):</strong> Subject to ' + (taxBracket * 100) + '% federal income tax + 10% early-withdrawal penalty (~$' + (taxAmount + penaltyAmount).toFixed(2) + '/mo total). Consider TSP loans or hardship withdrawals as alternatives.';
    }
    document.getElementById('resultNote').innerHTML = notes;

    document.getElementById('tspResult').classList.remove('hidden');
    document.getElementById('tspResult').scrollIntoView({behavior: 'smooth', block: 'start'});
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateBtn').addEventListener('click', calculateTSP);
    calculateTSP();
});
