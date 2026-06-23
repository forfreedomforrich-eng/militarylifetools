// Military Time Converter
document.addEventListener('DOMContentLoaded', function() {
    initializeDropdowns();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    setupEventListeners();
});

function initializeDropdowns() {
    // Standard hours (1-12)
    const stdHours = document.getElementById('stdHours');
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i.toString().padStart(2, '0');
        option.textContent = i.toString().padStart(2, '0');
        stdHours.appendChild(option);
    }

    // Military hours (00-23)
    const milHours = document.getElementById('milHours');
    for (let i = 0; i <= 23; i++) {
        const option = document.createElement('option');
        option.value = i.toString().padStart(2, '0');
        option.textContent = i.toString().padStart(2, '0');
        milHours.appendChild(option);
    }

    // Minutes (00-59) for both
    const stdMinutes = document.getElementById('stdMinutes');
    const milMinutes = document.getElementById('milMinutes');
    for (let i = 0; i < 60; i++) {
        const val = i.toString().padStart(2, '0');
        
        const opt1 = document.createElement('option');
        opt1.value = val;
        opt1.textContent = val;
        stdMinutes.appendChild(opt1);

        const opt2 = document.createElement('option');
        opt2.value = val;
        opt2.textContent = val;
        milMinutes.appendChild(opt2);
    }
}

function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    // Military time
    const militaryTime = hours.toString().padStart(2, '0') + minutes;
    
    // Standard time
    let standardHours = hours % 12 || 12;
    const period = hours >= 12 ? 'PM' : 'AM';
    
    const timeEl = document.getElementById('currentTime');
    const formatEl = document.getElementById('currentTimeFormat');
    
    timeEl.textContent = militaryTime.substring(0, 2) + ':' + minutes;
    formatEl.textContent = militaryTime + ' / ' + standardHours + ':' + minutes + ' ' + period;
}

function setupEventListeners() {
    document.getElementById('toMilitaryBtn').addEventListener('click', convertToMilitary);
    document.getElementById('toStandardBtn').addEventListener('click', convertToStandard);
}

function convertToMilitary() {
    const hours = document.getElementById('stdHours').value;
    const minutes = document.getElementById('stdMinutes').value;
    const period = document.getElementById('stdPeriod').value;

    if (!hours || !minutes) {
        alert('Please select hours and minutes');
        return;
    }

    let h = parseInt(hours);
    
    if (period === 'AM') {
        if (h === 12) h = 0;
    } else {
        if (h !== 12) h += 12;
    }

    const militaryTime = h.toString().padStart(2, '0') + minutes;
    document.getElementById('militaryOutput').textContent = militaryTime;
}

function convertToStandard() {
    const hours = document.getElementById('milHours').value;
    const minutes = document.getElementById('milMinutes').value;

    if (!hours || !minutes) {
        alert('Please select hours and minutes');
        return;
    }

    let h = parseInt(hours);
    const period = h >= 12 ? 'PM' : 'AM';
    let standardHours = h % 12 || 12;

    document.getElementById('standardOutput').textContent = 
        standardHours.toString().padStart(2, '0') + ':' + minutes + ' ' + period;
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
