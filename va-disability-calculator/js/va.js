// VA Disability Rating Calculator 2026
// Uses official VA Combined Ratings Table formula
// Monthly compensation rates effective December 1, 2025

const vaMonthlyRates = {
    noDependents: { 0:0, 10:175.51, 20:346.95, 30:524.26, 40:755.28, 50:1041.59, 60:1316.35, 70:1663.19, 80:2012.31, 90:2319.33, 100:3829.44 },
    withSpouse:   { 0:0, 10:211.41, 20:388.95, 30:573.41, 40:810.53, 50:1102.94, 60:1383.80, 70:1737.74, 80:2093.96, 90:2407.08, 100:3964.92 },
    withFamily:   { 0:0, 10:237.65, 20:420.32, 30:612.93, 40:855.19, 50:1153.69, 60:1440.65, 70:1801.78, 80:2165.10, 90:2486.36, 100:4056.32 }
};

const commonConditions = [
    { name: "Tinnitus (ringing in ears)", system: "Hearing", default: 10 },
    { name: "Hearing Loss", system: "Hearing", default: 0 },
    { name: "PTSD (Post-Traumatic Stress Disorder)", system: "Mental Health", default: 50 },
    { name: "Major Depressive Disorder", system: "Mental Health", default: 30 },
    { name: "Anxiety Disorder", system: "Mental Health", default: 30 },
    { name: "Insomnia / Sleep Apnea", system: "Mental Health", default: 30 },
    { name: "Migraines", system: "Neurological", default: 30 },
    { name: "Traumatic Brain Injury (TBI)", system: "Neurological", default: 40 },
    { name: "Peripheral Neuropathy", system: "Neurological", default: 20 },
    { name: "Radiculopathy (sciatica)", system: "Musculoskeletal", default: 20 },
    { name: "Lower Back Pain / Strain", system: "Musculoskeletal", default: 20 },
    { name: "Knee Injury / Meniscus", system: "Musculoskeletal", default: 10 },
    { name: "Shoulder Injury (rotator cuff)", system: "Musculoskeletal", default: 20 },
    { name: "Tendonitis", system: "Musculoskeletal", default: 10 },
    { name: "Scar (painful / unstable)", system: "Skin", default: 10 },
    { name: "Eczema / Psoriasis", system: "Skin", default: 10 },
    { name: "Hypertension (high BP)", system: "Cardiovascular", default: 10 },
    { name: "GERD / Acid Reflux", system: "Digestive", default: 10 },
    { name: "IBS (Irritable Bowel)", system: "Digestive", default: 10 },
    { name: "Diabetes Type 2", system: "Endocrine", default: 20 },
    { name: "Erectile Dysfunction", system: "Reproductive", default: 0 },
    { name: "Allergic Rhinitis", system: "Respiratory", default: 10 },
    { name: "Sinusitis (chronic)", system: "Respiratory", default: 10 },
    { name: "Asthma", system: "Respiratory", default: 10 },
    { name: "Carpal Tunnel", system: "Musculoskeletal", default: 10 }
];

function calculateCombinedRating(ratings) {
    const sorted = ratings.filter(function(r) { return r > 0; }).sort(function(a, b) { return b - a; });
    if (sorted.length === 0) return 0;
    let remaining = 100;
    for (let i = 0; i < sorted.length; i++) {
        remaining = remaining * (1 - sorted[i] / 100);
    }
    return 100 - remaining;
}

function roundTo10(value) {
    return Math.floor(value / 10) * 10;
}

function calculateVA() {
    const rows = document.querySelectorAll('.condition-row');
    const ratings = [];
    rows.forEach(function(row) {
        const sel = row.querySelector('.condition-rating');
        const v = parseInt(sel.value);
        if (!isNaN(v) && v >= 0 && v <= 100) ratings.push(v);
    });

    if (ratings.length === 0) {
        alert('Please add at least one condition with a rating');
        return;
    }

    const rawCombined = calculateCombinedRating(ratings);
    const combined = roundTo10(rawCombined);
    const dependency = document.getElementById('dependency').value;
    const rateTable = vaMonthlyRates[dependency];
    const monthly = rateTable[combined] || 0;
    const annual = monthly * 12;

    document.getElementById('resultCombined').textContent = combined + '%';
    document.getElementById('resultRaw').textContent = rawCombined.toFixed(1) + '% (mathematical)';
    document.getElementById('resultMonthly').textContent = '$' + monthly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('resultAnnual').textContent = '$' + annual.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    const sortedRatings = ratings.filter(function(r) { return r > 0; }).sort(function(a, b) { return b - a; });
    const breakdown = sortedRatings.map(function(r, i) {
        return '<tr><td style="padding: 0.4rem 0;">Condition ' + (i + 1) + '</td><td style="padding: 0.4rem 0; text-align: right;">' + r + '%</td></tr>';
    }).join('');
    document.getElementById('resultBreakdown').innerHTML = breakdown;

    document.getElementById('vaResult').classList.remove('hidden');
    document.getElementById('vaResult').scrollIntoView({behavior: 'smooth', block: 'start'});
}

function addCondition(defaultRating) {
    if (defaultRating === undefined) defaultRating = 30;
    const container = document.getElementById('conditions');
    const row = document.createElement('div');
    row.className = 'condition-row';
    let optionsHtml = '<option value="">-- Choose a common condition --</option>';
    for (let i = 0; i < commonConditions.length; i++) {
        const c = commonConditions[i];
        optionsHtml += '<option value="' + c.name + '">[' + c.system + '] ' + c.name + ' (' + c.default + '%)</option>';
    }
    let ratingHtml = '';
    const ratings = [0,10,20,30,40,50,60,70,80,90,100];
    for (let i = 0; i < ratings.length; i++) {
        const r = ratings[i];
        ratingHtml += '<option value="' + r + '"' + (r === defaultRating ? ' selected' : '') + '>' + r + '%</option>';
    }
    row.innerHTML =
        '<select class="condition-name" aria-label="Condition name">' + optionsHtml + '</select>' +
        '<select class="condition-rating" aria-label="Rating percent">' + ratingHtml + '</select>' +
        '<button type="button" class="btn-remove" aria-label="Remove">&times;</button>';
    container.appendChild(row);

    const nameSelect = row.querySelector('.condition-name');
    nameSelect.addEventListener('change', function() {
        const val = this.value;
        if (!val) return;
        for (let i = 0; i < commonConditions.length; i++) {
            if (commonConditions[i].name === val) {
                row.querySelector('.condition-rating').value = commonConditions[i].default;
                break;
            }
        }
    });

    row.querySelector('.btn-remove').addEventListener('click', function() { row.remove(); });
}

document.addEventListener('DOMContentLoaded', function() {
    addCondition(30);
    addCondition(10);

    document.getElementById('addCondition').addEventListener('click', function() { addCondition(10); });
    document.getElementById('calculateBtn').addEventListener('click', calculateVA);
});
