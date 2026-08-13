// Post-9/11 GI Bill Calculator 2026
// Based on VA.gov official rates for 2025-2026 academic year

// Private/foreign school tuition cap (2025-2026 academic year)
const TUITION_CAP_PRIVATE = 28937.93;
const BOOKS_STIPEND = 1000; // $1,000/year
// E-5 with dependents BAH average (national); user can override by ZIP later

function getTier(months) {
    if (months >= 36) return { pct: 100, label: '100% (36+ months)' };
    if (months >= 30) return { pct: 90, label: '90% (30-36 months)' };
    if (months >= 24) return { pct: 80, label: '80% (24-30 months)' };
    if (months >= 18) return { pct: 70, label: '70% (18-24 months)' };
    if (months >= 12) return { pct: 60, label: '60% (12-18 months)' };
    if (months >= 6) return { pct: 50, label: '50% (6-12 months)' };
    if (months >= 1.5) return { pct: 40, label: '40% (90 days - 6 months)' };
    return { pct: 0, label: 'Not eligible (less than 90 days)' };
}

function calculateGI() {
    const months = parseFloat(document.getElementById('months').value);
    const schoolType = document.getElementById('schoolType').value;
    const inStateValue = document.getElementById('inState').value;
    const zipCode = document.getElementById('zipCode').value.trim();
    const inState = inStateValue === 'yes';
    const tuitionInState = parseFloat(document.getElementById('tuitionInState').value) || 0;
    const tuitionOutState = parseFloat(document.getElementById('tuitionOutState').value) || 0;
    const tuitionActual = parseFloat(document.getElementById('tuitionActual').value) || 0;

    if (isNaN(months) || months < 0) {
        alert('Please enter months of qualifying service');
        return;
    }

    const tier = getTier(months);
    const tierPct = tier.pct / 100;

    // Tuition calculation
    let tuition = 0;
    let tuitionNote = '';
    if (schoolType === 'public') {
        // Public school: GI Bill pays 100% of in-state tuition (regardless of tier? No - multiplied by tier)
        // Tier 100% = full in-state. Tier 90% = 90% of in-state.
        if (inState && tuitionInState > 0) {
            tuition = tuitionInState * tierPct;
            tuitionNote = 'In-state tuition: $' + tuitionInState.toLocaleString() + ' × ' + tier.pct + '% = $' + tuition.toLocaleString();
        } else if (!inState && tuitionOutState > 0) {
            // Out of state: GI Bill pays only in-state rate (unless Yellow Ribbon)
            tuition = tuitionInState * tierPct;
            tuitionNote = 'Out-of-state: GI Bill covers in-state portion only ($' + tuitionInState.toLocaleString() + ' × ' + tier.pct + '% = $' + tuition.toLocaleString() + '). You pay difference of $' + (tuitionOutState - tuition).toLocaleString() + '/yr (unless Yellow Ribbon applies).';
        } else {
            tuition = 0;
            tuitionNote = 'Enter your school\'s tuition to see exact coverage.';
        }
    } else if (schoolType === 'private') {
        // Private: capped at TUITION_CAP_PRIVATE
        const capped = Math.min(tuitionActual, TUITION_CAP_PRIVATE);
        tuition = capped * tierPct;
        tuitionNote = 'Private school: GI Bill caps at $' + TUITION_CAP_PRIVATE.toLocaleString() + '/yr (2025-26). Actual tuition: $' + tuitionActual.toLocaleString() + '. Covered: $' + tuition.toLocaleString() + (tuitionActual > TUITION_CAP_PRIVATE ? '. Difference of $' + (tuitionActual - capped).toLocaleString() + ' may be covered by Yellow Ribbon program.' : '');
    } else if (schoolType === 'foreign') {
        const capped = Math.min(tuitionActual, TUITION_CAP_PRIVATE);
        tuition = capped * tierPct;
        tuitionNote = 'Foreign school: GI Bill caps at $' + TUITION_CAP_PRIVATE.toLocaleString() + '/yr. Actual: $' + tuitionActual.toLocaleString() + '. Covered: $' + tuition.toLocaleString();
    } else if (schoolType === 'vocational') {
        tuition = Math.min(tuitionActual, TUITION_CAP_PRIVATE) * tierPct;
        tuitionNote = 'Vocational/Technical: covered up to $' + TUITION_CAP_PRIVATE.toLocaleString() + '/yr cap.';
    }

    // Housing allowance: E-5 with dependents BAH at school ZIP
    // Simplified: average E-5 BAH with dependents ~ $1,800/mo nationally (using ZIP lookup would be more accurate)
    // For this MVP, use a flat estimate; users should check with their school VA office
    const housingMonthly = 1800; // approximate E-5 with dependents national average
    const housingAnnual = housingMonthly * 12 * tierPct;

    const booksAnnual = BOOKS_STIPEND * tierPct;

    const totalAnnual = tuition + housingAnnual + booksAnnual;
    const total4Year = totalAnnual * 4;

    document.getElementById('resultTier').textContent = tier.label;
    document.getElementById('resultTuition').textContent = '$' + tuition.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + '/yr';
    document.getElementById('resultHousing').textContent = '$' + housingMonthly.toLocaleString() + '/mo ($' + housingAnnual.toLocaleString(0) + '/yr)';
    document.getElementById('resultBooks').textContent = '$' + booksAnnual.toLocaleString(0) + '/yr';
    document.getElementById('resultAnnual').textContent = '$' + totalAnnual.toLocaleString(0);
    document.getElementById('result4Year').textContent = '$' + total4Year.toLocaleString(0);
    document.getElementById('resultTuitionNote').textContent = tuitionNote;
    document.getElementById('giResult').classList.remove('hidden');
    document.getElementById('giResult').scrollIntoView({behavior: 'smooth', block: 'start'});
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateBtn').addEventListener('click', calculateGI);
    // Trigger initial calculation with defaults
    calculateGI();
});
