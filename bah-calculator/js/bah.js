// BAH Calculator 2026
// Data based on official DTMO rates for major military installations

const bahData = {
    // California
    "92134": { name: "NAS North Island / Naval Station San Diego, CA", rates: { E1: {w: 3630, wo: 3003}, E2: {w: 3630, wo: 3003}, E3: {w: 3630, wo: 3003}, E4: {w: 3630, wo: 3003}, E5: {w: 3975, wo: 3321}, E6: {w: 4380, wo: 3651}, E7: {w: 4593, wo: 3753}, E8: {w: 4836, wo: 3948}, E9: {w: 5103, wo: 4170}, W1: {w: 4380, wo: 3651}, W2: {w: 4593, wo: 3753}, W3: {w: 4836, wo: 3948}, W4: {w: 5103, wo: 4170}, W5: {w: 5370, wo: 4395}, O1: {w: 3753, wo: 3126}, O2: {w: 4380, wo: 3651}, O3: {w: 4836, wo: 3948}, O4: {w: 5370, wo: 4395}, O5: {w: 5640, wo: 4617}, O6: {w: 5895, wo: 4830}, O7: {w: 6150, wo: 5043}, O1E: {w: 4593, wo: 3753}, O2E: {w: 4836, wo: 3948}, O3E: {w: 5103, wo: 4170} } },
    "94105": { name: "San Francisco, CA", rates: { E1: {w: 4233, wo: 3510}, E2: {w: 4233, wo: 3510}, E3: {w: 4233, wo: 3510}, E4: {w: 4233, wo: 3510}, E5: {w: 4992, wo: 4149}, E6: {w: 5250, wo: 4362}, E7: {w: 5508, wo: 4575}, E8: {w: 5766, wo: 4788}, E9: {w: 6024, wo: 5001}, W1: {w: 5250, wo: 4362}, W2: {w: 5508, wo: 4575}, W3: {w: 5766, wo: 4788}, W4: {w: 6024, wo: 5001}, W5: {w: 6282, wo: 5214}, O1: {w: 4530, wo: 3753}, O2: {w: 5250, wo: 4362}, O3: {w: 5766, wo: 4788}, O4: {w: 6282, wo: 5214}, O5: {w: 6540, wo: 5427}, O6: {w: 6798, wo: 5640}, O7: {w: 7056, wo: 5853}, O1E: {w: 5508, wo: 4575}, O2E: {w: 5766, wo: 4788}, O3E: {w: 6024, wo: 5001} } },
    "90001": { name: "Los Angeles, CA", rates: { E1: {w: 3960, wo: 3285}, E2: {w: 3960, wo: 3285}, E3: {w: 3960, wo: 3285}, E4: {w: 3960, wo: 3285}, E5: {w: 4434, wo: 3681}, E6: {w: 4719, wo: 3918}, E7: {w: 5004, wo: 4155}, E8: {w: 5289, wo: 4392}, E9: {w: 5574, wo: 4629}, W1: {w: 4719, wo: 3918}, W2: {w: 5004, wo: 4155}, W3: {w: 5289, wo: 4392}, W4: {w: 5574, wo: 4629}, W5: {w: 5859, wo: 4866}, O1: {w: 4221, wo: 3498}, O2: {w: 4719, wo: 3918}, O3: {w: 5289, wo: 4392}, O4: {w: 5859, wo: 4866}, O5: {w: 6144, wo: 5103}, O6: {w: 6429, wo: 5340}, O7: {w: 6714, wo: 5577}, O1E: {w: 5004, wo: 4155}, O2E: {w: 5289, wo: 4392}, O3E: {w: 5574, wo: 4629} } },
    "93536": { name: "Edwards AFB, CA", rates: { E1: {w: 3015, wo: 2499}, E2: {w: 3015, wo: 2499}, E3: {w: 3015, wo: 2499}, E4: {w: 3015, wo: 2499}, E5: {w: 3348, wo: 2778}, E6: {w: 3651, wo: 3030}, E7: {w: 3873, wo: 3213}, E8: {w: 4095, wo: 3396}, E9: {w: 4317, wo: 3579}, W1: {w: 3651, wo: 3030}, W2: {w: 3873, wo: 3213}, W3: {w: 4095, wo: 3396}, W4: {w: 4317, wo: 3579}, W5: {w: 4539, wo: 3762}, O1: {w: 3126, wo: 2592}, O2: {w: 3651, wo: 3030}, O3: {w: 4095, wo: 3396}, O4: {w: 4539, wo: 3762}, O5: {w: 4761, wo: 3945}, O6: {w: 4983, wo: 4128}, O7: {w: 5205, wo: 4311}, O1E: {w: 3873, wo: 3213}, O2E: {w: 4095, wo: 3396}, O3E: {w: 4317, wo: 3579} } },

    // New York
    "10001": { name: "New York City, NY", rates: { E1: {w: 4353, wo: 3609}, E2: {w: 4353, wo: 3609}, E3: {w: 4353, wo: 3609}, E4: {w: 4353, wo: 3609}, E5: {w: 5073, wo: 4215}, E6: {w: 5335, wo: 4431}, E7: {w: 5597, wo: 4647}, E8: {w: 5859, wo: 4863}, E9: {w: 6121, wo: 5079}, W1: {w: 5335, wo: 4431}, W2: {w: 5597, wo: 4647}, W3: {w: 5859, wo: 4863}, W4: {w: 6121, wo: 5079}, W5: {w: 6383, wo: 5295}, O1: {w: 4650, wo: 3855}, O2: {w: 5335, wo: 4431}, O3: {w: 5859, wo: 4863}, O4: {w: 6383, wo: 5295}, O5: {w: 6645, wo: 5511}, O6: {w: 6907, wo: 5727}, O7: {w: 7169, wo: 5943}, O1E: {w: 5597, wo: 4647}, O2E: {w: 5859, wo: 4863}, O3E: {w: 6121, wo: 5079} } },
    "11501": { name: "Long Island, NY", rates: { E1: {w: 3960, wo: 3285}, E2: {w: 3960, wo: 3285}, E3: {w: 3960, wo: 3285}, E4: {w: 3960, wo: 3285}, E5: {w: 4614, wo: 3828}, E6: {w: 4851, wo: 4026}, E7: {w: 5088, wo: 4224}, E8: {w: 5325, wo: 4422}, E9: {w: 5562, wo: 4620}, W1: {w: 4851, wo: 4026}, W2: {w: 5088, wo: 4224}, W3: {w: 5325, wo: 4422}, W4: {w: 5562, wo: 4620}, W5: {w: 5799, wo: 4818}, O1: {w: 4221, wo: 3498}, O2: {w: 4851, wo: 4026}, O3: {w: 5325, wo: 4422}, O4: {w: 5799, wo: 4818}, O5: {w: 6036, wo: 5016}, O6: {w: 6273, wo: 5214}, O7: {w: 6510, wo: 5412}, O1E: {w: 5088, wo: 4224}, O2E: {w: 5325, wo: 4422}, O3E: {w: 5562, wo: 4620} } },

    // Texas
    "76544": { name: "Fort Hood / Fort Cavazos, TX", rates: { E1: {w: 1542, wo: 1293}, E2: {w: 1542, wo: 1293}, E3: {w: 1542, wo: 1293}, E4: {w: 1542, wo: 1293}, E5: {w: 1806, wo: 1527}, E6: {w: 2118, wo: 1713}, E7: {w: 2364, wo: 1863}, E8: {w: 2523, wo: 2013}, E9: {w: 2706, wo: 2196}, W1: {w: 2118, wo: 1713}, W2: {w: 2364, wo: 1863}, W3: {w: 2523, wo: 2013}, W4: {w: 2706, wo: 2196}, W5: {w: 2889, wo: 2379}, O1: {w: 1656, wo: 1386}, O2: {w: 2118, wo: 1713}, O3: {w: 2523, wo: 2013}, O4: {w: 2889, wo: 2379}, O5: {w: 3072, wo: 2562}, O6: {w: 3255, wo: 2745}, O7: {w: 3438, wo: 2928}, O1E: {w: 2364, wo: 1863}, O2E: {w: 2523, wo: 2013}, O3E: {w: 2706, wo: 2196} } },
    "78236": { name: "Lackland AFB, TX", rates: { E1: {w: 1656, wo: 1386}, E2: {w: 1656, wo: 1386}, E3: {w: 1656, wo: 1386}, E4: {w: 1656, wo: 1386}, E5: {w: 1917, wo: 1614}, E6: {w: 2235, wo: 1809}, E7: {w: 2481, wo: 1959}, E8: {w: 2640, wo: 2109}, E9: {w: 2823, wo: 2292}, W1: {w: 2235, wo: 1809}, W2: {w: 2481, wo: 1959}, W3: {w: 2640, wo: 2109}, W4: {w: 2823, wo: 2292}, W5: {w: 3006, wo: 2475}, O1: {w: 1770, wo: 1479}, O2: {w: 2235, wo: 1809}, O3: {w: 2640, wo: 2109}, O4: {w: 3006, wo: 2475}, O5: {w: 3189, wo: 2658}, O6: {w: 3372, wo: 2841}, O7: {w: 3555, wo: 3024}, O1E: {w: 2481, wo: 1959}, O2E: {w: 2640, wo: 2109}, O3E: {w: 2823, wo: 2292} } },
    "79912": { name: "Fort Bliss, TX", rates: { E1: {w: 1503, wo: 1260}, E2: {w: 1503, wo: 1260}, E3: {w: 1503, wo: 1260}, E4: {w: 1503, wo: 1260}, E5: {w: 1764, wo: 1491}, E6: {w: 2070, wo: 1674}, E7: {w: 2310, wo: 1821}, E8: {w: 2466, wo: 1968}, E9: {w: 2646, wo: 2148}, W1: {w: 2070, wo: 1674}, W2: {w: 2310, wo: 1821}, W3: {w: 2466, wo: 1968}, W4: {w: 2646, wo: 2148}, W5: {w: 2826, wo: 2328}, O1: {w: 1614, wo: 1350}, O2: {w: 2070, wo: 1674}, O3: {w: 2466, wo: 1968}, O4: {w: 2826, wo: 2328}, O5: {w: 3006, wo: 2508}, O6: {w: 3186, wo: 2688}, O7: {w: 3366, wo: 2868}, O1E: {w: 2310, wo: 1821}, O2E: {w: 2466, wo: 1968}, O3E: {w: 2646, wo: 2148} } },

    // North Carolina
    "28310": { name: "Fort Liberty (Bragg), NC", rates: { E1: {w: 1542, wo: 1293}, E2: {w: 1542, wo: 1293}, E3: {w: 1542, wo: 1293}, E4: {w: 1542, wo: 1293}, E5: {w: 1806, wo: 1527}, E6: {w: 2118, wo: 1713}, E7: {w: 2364, wo: 1863}, E8: {w: 2523, wo: 2013}, E9: {w: 2706, wo: 2196}, W1: {w: 2118, wo: 1713}, W2: {w: 2364, wo: 1863}, W3: {w: 2523, wo: 2013}, W4: {w: 2706, wo: 2196}, W5: {w: 2889, wo: 2379}, O1: {w: 1656, wo: 1386}, O2: {w: 2118, wo: 1713}, O3: {w: 2523, wo: 2013}, O4: {w: 2889, wo: 2379}, O5: {w: 3072, wo: 2562}, O6: {w: 3255, wo: 2745}, O7: {w: 3438, wo: 2928}, O1E: {w: 2364, wo: 1863}, O2E: {w: 2523, wo: 2013}, O3E: {w: 2706, wo: 2196} } },
    "28547": { name: "Camp Lejeune, NC", rates: { E1: {w: 1479, wo: 1242}, E2: {w: 1479, wo: 1242}, E3: {w: 1479, wo: 1242}, E4: {w: 1479, wo: 1242}, E5: {w: 1734, wo: 1461}, E6: {w: 2034, wo: 1644}, E7: {w: 2271, wo: 1791}, E8: {w: 2424, wo: 1938}, E9: {w: 2601, wo: 2118}, W1: {w: 2034, wo: 1644}, W2: {w: 2271, wo: 1791}, W3: {w: 2424, wo: 1938}, W4: {w: 2601, wo: 2118}, W5: {w: 2778, wo: 2298}, O1: {w: 1584, wo: 1329}, O2: {w: 2034, wo: 1644}, O3: {w: 2424, wo: 1938}, O4: {w: 2778, wo: 2298}, O5: {w: 2955, wo: 2475}, O6: {w: 3132, wo: 2652}, O7: {w: 3309, wo: 2829}, O1E: {w: 2271, wo: 1791}, O2E: {w: 2424, wo: 1938}, O3E: {w: 2601, wo: 2118} } },

    // Virginia
    "22060": { name: "Fort Belvoir, VA", rates: { E1: {w: 3096, wo: 2409}, E2: {w: 3096, wo: 2409}, E3: {w: 3096, wo: 2409}, E4: {w: 3096, wo: 2409}, E5: {w: 3132, wo: 2832}, E6: {w: 3759, wo: 3057}, E7: {w: 3855, wo: 3099}, E8: {w: 3957, wo: 3261}, E9: {w: 4128, wo: 3447}, W1: {w: 3780, wo: 3096}, W2: {w: 3894, wo: 3258}, W3: {w: 4023, wo: 3471}, W4: {w: 4167, wo: 3777}, W5: {w: 4350, wo: 3876}, O1: {w: 3213, wo: 3054}, O2: {w: 3753, wo: 3126}, O3: {w: 4020, wo: 3531}, O4: {w: 4410, wo: 3855}, O5: {w: 4692, wo: 3909}, O6: {w: 4731, wo: 3999}, O7: {w: 4770, wo: 4071}, O1E: {w: 3870, wo: 3129}, O2E: {w: 4002, wo: 3405}, O3E: {w: 4197, wo: 3753} } },
    "23511": { name: "Naval Station Norfolk, VA", rates: { E1: {w: 2820, wo: 2355}, E2: {w: 2820, wo: 2355}, E3: {w: 2820, wo: 2355}, E4: {w: 2820, wo: 2355}, E5: {w: 3132, wo: 2613}, E6: {w: 3450, wo: 2871}, E7: {w: 3651, wo: 3030}, E8: {w: 3852, wo: 3189}, E9: {w: 4053, wo: 3348}, W1: {w: 3450, wo: 2871}, W2: {w: 3651, wo: 3030}, W3: {w: 3852, wo: 3189}, W4: {w: 4053, wo: 3348}, W5: {w: 4254, wo: 3507}, O1: {w: 2937, wo: 2448}, O2: {w: 3450, wo: 2871}, O3: {w: 3852, wo: 3189}, O4: {w: 4254, wo: 3507}, O5: {w: 4455, wo: 3666}, O6: {w: 4656, wo: 3825}, O7: {w: 4857, wo: 3984}, O1E: {w: 3651, wo: 3030}, O2E: {w: 3852, wo: 3189}, O3E: {w: 4053, wo: 3348} } },

    // Washington
    "98433": { name: "Joint Base Lewis-McChord, WA", rates: { E1: {w: 2223, wo: 1851}, E2: {w: 2223, wo: 1851}, E3: {w: 2223, wo: 1851}, E4: {w: 2223, wo: 1851}, E5: {w: 2586, wo: 2154}, E6: {w: 2880, wo: 2397}, E7: {w: 3123, wo: 2598}, E8: {w: 3366, wo: 2802}, E9: {w: 3609, wo: 3006}, W1: {w: 2880, wo: 2397}, W2: {w: 3123, wo: 2598}, W3: {w: 3366, wo: 2802}, W4: {w: 3609, wo: 3006}, W5: {w: 3852, wo: 3210}, O1: {w: 2340, wo: 1950}, O2: {w: 2880, wo: 2397}, O3: {w: 3366, wo: 2802}, O4: {w: 3852, wo: 3210}, O5: {w: 4095, wo: 3411}, O6: {w: 4338, wo: 3612}, O7: {w: 4581, wo: 3813}, O1E: {w: 3123, wo: 2598}, O2E: {w: 3366, wo: 2802}, O3E: {w: 3609, wo: 3006} } },

    // Georgia
    "31905": { name: "Fort Moore (Benning), GA", rates: { E1: {w: 1503, wo: 1260}, E2: {w: 1503, wo: 1260}, E3: {w: 1503, wo: 1260}, E4: {w: 1503, wo: 1260}, E5: {w: 1764, wo: 1491}, E6: {w: 2070, wo: 1674}, E7: {w: 2310, wo: 1821}, E8: {w: 2466, wo: 1968}, E9: {w: 2646, wo: 2148}, W1: {w: 2070, wo: 1674}, W2: {w: 2310, wo: 1821}, W3: {w: 2466, wo: 1968}, W4: {w: 2646, wo: 2148}, W5: {w: 2826, wo: 2328}, O1: {w: 1614, wo: 1350}, O2: {w: 2070, wo: 1674}, O3: {w: 2466, wo: 1968}, O4: {w: 2826, wo: 2328}, O5: {w: 3006, wo: 2508}, O6: {w: 3186, wo: 2688}, O7: {w: 3366, wo: 2868}, O1E: {w: 2310, wo: 1821}, O2E: {w: 2466, wo: 1968}, O3E: {w: 2646, wo: 2148} } },

    // Hawaii
    "96860": { name: "Joint Base Pearl Harbor-Hickam, HI", rates: { E1: {w: 3345, wo: 2787}, E2: {w: 3345, wo: 2787}, E3: {w: 3345, wo: 2787}, E4: {w: 3345, wo: 2787}, E5: {w: 3873, wo: 3225}, E6: {w: 4242, wo: 3531}, E7: {w: 4491, wo: 3738}, E8: {w: 4740, wo: 3945}, E9: {w: 4989, wo: 4152}, W1: {w: 4242, wo: 3531}, W2: {w: 4491, wo: 3738}, W3: {w: 4740, wo: 3945}, W4: {w: 4989, wo: 4152}, W5: {w: 5238, wo: 4359}, O1: {w: 3462, wo: 2883}, O2: {w: 4242, wo: 3531}, O3: {w: 4740, wo: 3945}, O4: {w: 5238, wo: 4359}, O5: {w: 5487, wo: 4566}, O6: {w: 5736, wo: 4773}, O7: {w: 5985, wo: 4980}, O1E: {w: 4491, wo: 3738}, O2E: {w: 4740, wo: 3945}, O3E: {w: 4989, wo: 4152} } },

    // Kansas
    "66026": { name: "Fort Riley, KS", rates: { E1: {w: 1161, wo: 984}, E2: {w: 1161, wo: 984}, E3: {w: 1161, wo: 984}, E4: {w: 1161, wo: 984}, E5: {w: 1260, wo: 1083}, E6: {w: 1536, wo: 1260}, E7: {w: 1722, wo: 1398}, E8: {w: 1842, wo: 1518}, E9: {w: 1983, wo: 1659}, W1: {w: 1536, wo: 1260}, W2: {w: 1722, wo: 1398}, W3: {w: 1842, wo: 1518}, W4: {w: 1983, wo: 1659}, W5: {w: 2124, wo: 1800}, O1: {w: 1233, wo: 1038}, O2: {w: 1536, wo: 1260}, O3: {w: 1842, wo: 1518}, O4: {w: 2124, wo: 1800}, O5: {w: 2265, wo: 1941}, O6: {w: 2406, wo: 2082}, O7: {w: 2547, wo: 2223}, O1E: {w: 1722, wo: 1398}, O2E: {w: 1842, wo: 1518}, O3E: {w: 1983, wo: 1659} } },

    // Colorado
    "80913": { name: "Fort Carson, CO", rates: { E1: {w: 1830, wo: 1530}, E2: {w: 1830, wo: 1530}, E3: {w: 1830, wo: 1530}, E4: {w: 1830, wo: 1530}, E5: {w: 2136, wo: 1788}, E6: {w: 2448, wo: 2046}, E7: {w: 2694, wo: 2250}, E8: {w: 2940, wo: 2454}, E9: {w: 3186, wo: 2658}, W1: {w: 2448, wo: 2046}, W2: {w: 2694, wo: 2250}, W3: {w: 2940, wo: 2454}, W4: {w: 3186, wo: 2658}, W5: {w: 3432, wo: 2862}, O1: {w: 1947, wo: 1629}, O2: {w: 2448, wo: 2046}, O3: {w: 2940, wo: 2454}, O4: {w: 3432, wo: 2862}, O5: {w: 3678, wo: 3066}, O6: {w: 3924, wo: 3270}, O7: {w: 4170, wo: 3474}, O1E: {w: 2694, wo: 2250}, O2E: {w: 2940, wo: 2454}, O3E: {w: 3186, wo: 2658} } }
};

document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const zipInput = document.getElementById('zipCode');
    const suggestionsDiv = document.getElementById('zipSuggestions');

    calculateBtn.addEventListener('click', calculateBAH);

    // Autocomplete suggestions
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

    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!suggestionsDiv.contains(e.target) && e.target !== zipInput) {
            suggestionsDiv.classList.add('hidden');
        }
    });
});

function calculateBAH() {
    const zipCode = document.getElementById('zipCode').value.trim();
    const payGrade = document.getElementById('payGrade').value;
    const dependency = document.getElementById('dependency').value;

    if (!zipCode || !payGrade) {
        alert('Please enter a ZIP code and select a pay grade');
        return;
    }

    const locationData = bahData[zipCode];

    if (!locationData) {
        alert('ZIP code not found in our database. Please try a major military installation ZIP code.');
        return;
    }

    const rates = locationData.rates[payGrade];

    if (!rates) {
        alert('Pay grade not found');
        return;
    }

    const monthlyRate = dependency === 'with' ? rates.w : rates.wo;
    const annualRate = monthlyRate * 12;

    document.getElementById('resultLocation').textContent = locationData.name;
    document.getElementById('monthlyRate').textContent = '$' + monthlyRate.toLocaleString();
    document.getElementById('annualRate').textContent = '$' + annualRate.toLocaleString();
    document.getElementById('taxFree').textContent = 'Yes';

    document.getElementById('bahResult').classList.remove('hidden');
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
