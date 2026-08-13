// Military Uniform Size Converter
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('findSizeBtn').addEventListener('click', findSize);
});

function findSize() {
    const branch = document.getElementById('branch').value;
    const measurementType = document.getElementById('measurementType').value;
    const measurement = parseFloat(document.getElementById('measurement').value);
    const unit = document.getElementById('unit').value;

    if (isNaN(measurement) || measurement <= 0) {
        alert('Please enter a valid measurement');
        return;
    }

    // Convert cm to inches if needed
    let inches = measurement;
    if (unit === 'cm') {
        inches = measurement / 2.54;
    }

    const size = calculateSize(branch, measurementType, inches);
    displayResult(size);
}

function calculateSize(branch, type, inches) {
    const sizeChart = getSizeChart(branch);
    const measurements = sizeChart[type];

    if (!measurements) {
        return { size: 'N/A', alpha: 'N/A', numeric: 'N/A', nato: 'N/A' };
    }

    let size = 'N/A';

    // Find the matching size
    for (const [sizeName, ranges] of Object.entries(measurements)) {
        if (inches >= ranges.min && inches <= ranges.max) {
            size = sizeName;
            break;
        }
    }

    // Convert to NATO size if applicable
    let natoSize = 'N/A';
    if (type === 'chest' && size !== 'N/A') {
        natoSize = Math.round(inches * 2.54);
    }

    return {
        size: size,
        alpha: size,
        numeric: size,
        nato: natoSize !== 'N/A' ? `${natoSize} cm` : 'N/A'
    };
}

function getSizeChart(branch) {
    const charts = {
        army: {
            height: {
                'XSR': { min: 63, max: 65.5 },
                'SR': { min: 66, max: 69 },
                'LR': { min: 69.5, max: 72 },
                'XLR': { min: 72.5, max: 75 }
            },
            chest: {
                'XS': { min: 33, max: 34.5 },
                'S': { min: 35, max: 37 },
                'M': { min: 38, max: 40 },
                'L': { min: 42, max: 44 },
                'XL': { min: 46, max: 48 },
                '2XL': { min: 50, max: 52 },
                '3XL': { min: 54, max: 56 }
            },
            waist: {
                '28': { min: 27.5, max: 28.5 },
                '30': { min: 29.5, max: 30.5 },
                '32': { min: 31.5, max: 32.5 },
                '34': { min: 33.5, max: 34.5 },
                '36': { min: 35.5, max: 36.5 },
                '38': { min: 37.5, max: 38.5 },
                '40': { min: 39.5, max: 40.5 },
                '42': { min: 41.5, max: 42.5 },
                '44': { min: 43.5, max: 44.5 }
            },
            neck: {
                'XS': { min: 14, max: 14.5 },
                'S': { min: 15, max: 15.5 },
                'M': { min: 16, max: 16.5 },
                'L': { min: 17, max: 17.5 },
                'XL': { min: 18, max: 18.5 },
                '2XL': { min: 19, max: 19.5 },
                '3XL': { min: 20, max: 20.5 }
            },
            sleeve: {
                'XS': { min: 32, max: 33 },
                'S': { min: 33, max: 34 },
                'M': { min: 34, max: 35 },
                'L': { min: 35, max: 36 },
                'XL': { min: 36, max: 37 },
                '2XL': { min: 37, max: 38 },
                '3XL': { min: 38, max: 39 }
            },
            inseam: {
                'SR': { min: 29, max: 31 },
                'LR': { min: 31, max: 33 },
                'XLR': { min: 33, max: 35 }
            }
        },
        navy: {
            height: {
                'XSR': { min: 63, max: 65.5 },
                'SR': { min: 66, max: 69 },
                'LR': { min: 69.5, max: 72 },
                'XLR': { min: 72.5, max: 75 }
            },
            chest: {
                'XS': { min: 33, max: 34.5 },
                'S': { min: 35, max: 37 },
                'M': { min: 38, max: 40 },
                'L': { min: 42, max: 44 },
                'XL': { min: 46, max: 48 },
                '2XL': { min: 50, max: 52 },
                '3XL': { min: 54, max: 56 }
            },
            waist: {
                '28': { min: 27.5, max: 28.5 },
                '30': { min: 29.5, max: 30.5 },
                '32': { min: 31.5, max: 32.5 },
                '34': { min: 33.5, max: 34.5 },
                '36': { min: 35.5, max: 36.5 },
                '38': { min: 37.5, max: 38.5 },
                '40': { min: 39.5, max: 40.5 },
                '42': { min: 41.5, max: 42.5 },
                '44': { min: 43.5, max: 44.5 }
            },
            neck: {
                'XS': { min: 14, max: 14.5 },
                'S': { min: 15, max: 15.5 },
                'M': { min: 16, max: 16.5 },
                'L': { min: 17, max: 17.5 },
                'XL': { min: 18, max: 18.5 },
                '2XL': { min: 19, max: 19.5 },
                '3XL': { min: 20, max: 20.5 }
            },
            sleeve: {
                'XS': { min: 32, max: 33 },
                'S': { min: 33, max: 34 },
                'M': { min: 34, max: 35 },
                'L': { min: 35, max: 36 },
                'XL': { min: 36, max: 37 },
                '2XL': { min: 37, max: 38 },
                '3XL': { min: 38, max: 39 }
            },
            inseam: {
                'SR': { min: 29, max: 31 },
                'LR': { min: 31, max: 33 },
                'XLR': { min: 33, max: 35 }
            }
        },
        airforce: {
            height: {
                'XSR': { min: 63, max: 65.5 },
                'SR': { min: 66, max: 69 },
                'LR': { min: 69.5, max: 72 },
                'XLR': { min: 72.5, max: 75 }
            },
            chest: {
                'XS': { min: 33, max: 34.5 },
                'S': { min: 35, max: 37 },
                'M': { min: 38, max: 40 },
                'L': { min: 42, max: 44 },
                'XL': { min: 46, max: 48 },
                '2XL': { min: 50, max: 52 },
                '3XL': { min: 54, max: 56 }
            },
            waist: {
                '28': { min: 27.5, max: 28.5 },
                '30': { min: 29.5, max: 30.5 },
                '32': { min: 31.5, max: 32.5 },
                '34': { min: 33.5, max: 34.5 },
                '36': { min: 35.5, max: 36.5 },
                '38': { min: 37.5, max: 38.5 },
                '40': { min: 39.5, max: 40.5 },
                '42': { min: 41.5, max: 42.5 },
                '44': { min: 43.5, max: 44.5 }
            },
            neck: {
                'XS': { min: 14, max: 14.5 },
                'S': { min: 15, max: 15.5 },
                'M': { min: 16, max: 16.5 },
                'L': { min: 17, max: 17.5 },
                'XL': { min: 18, max: 18.5 },
                '2XL': { min: 19, max: 19.5 },
                '3XL': { min: 20, max: 20.5 }
            },
            sleeve: {
                'XS': { min: 32, max: 33 },
                'S': { min: 33, max: 34 },
                'M': { min: 34, max: 35 },
                'L': { min: 35, max: 36 },
                'XL': { min: 36, max: 37 },
                '2XL': { min: 37, max: 38 },
                '3XL': { min: 38, max: 39 }
            },
            inseam: {
                'SR': { min: 29, max: 31 },
                'LR': { min: 31, max: 33 },
                'XLR': { min: 33, max: 35 }
            }
        },
        marines: {
            height: {
                'XSR': { min: 63, max: 65.5 },
                'SR': { min: 66, max: 69 },
                'LR': { min: 69.5, max: 72 },
                'XLR': { min: 72.5, max: 75 }
            },
            chest: {
                'XS': { min: 33, max: 34.5 },
                'S': { min: 35, max: 37 },
                'M': { min: 38, max: 40 },
                'L': { min: 42, max: 44 },
                'XL': { min: 46, max: 48 },
                '2XL': { min: 50, max: 52 },
                '3XL': { min: 54, max: 56 }
            },
            waist: {
                '28': { min: 27.5, max: 28.5 },
                '30': { min: 29.5, max: 30.5 },
                '32': { min: 31.5, max: 32.5 },
                '34': { min: 33.5, max: 34.5 },
                '36': { min: 35.5, max: 36.5 },
                '38': { min: 37.5, max: 38.5 },
                '40': { min: 39.5, max: 40.5 },
                '42': { min: 41.5, max: 42.5 },
                '44': { min: 43.5, max: 44.5 }
            },
            neck: {
                'XS': { min: 14, max: 14.5 },
                'S': { min: 15, max: 15.5 },
                'M': { min: 16, max: 16.5 },
                'L': { min: 17, max: 17.5 },
                'XL': { min: 18, max: 18.5 },
                '2XL': { min: 19, max: 19.5 },
                '3XL': { min: 20, max: 20.5 }
            },
            sleeve: {
                'XS': { min: 32, max: 33 },
                'S': { min: 33, max: 34 },
                'M': { min: 34, max: 35 },
                'L': { min: 35, max: 36 },
                'XL': { min: 36, max: 37 },
                '2XL': { min: 37, max: 38 },
                '3XL': { min: 38, max: 39 }
            },
            inseam: {
                'SR': { min: 29, max: 31 },
                'LR': { min: 31, max: 33 },
                'XLR': { min: 33, max: 35 }
            }
        },
        coastguard: {
            height: {
                'XSR': { min: 63, max: 65.5 },
                'SR': { min: 66, max: 69 },
                'LR': { min: 69.5, max: 72 },
                'XLR': { min: 72.5, max: 75 }
            },
            chest: {
                'XS': { min: 33, max: 34.5 },
                'S': { min: 35, max: 37 },
                'M': { min: 38, max: 40 },
                'L': { min: 42, max: 44 },
                'XL': { min: 46, max: 48 },
                '2XL': { min: 50, max: 52 },
                '3XL': { min: 54, max: 56 }
            },
            waist: {
                '28': { min: 27.5, max: 28.5 },
                '30': { min: 29.5, max: 30.5 },
                '32': { min: 31.5, max: 32.5 },
                '34': { min: 33.5, max: 34.5 },
                '36': { min: 35.5, max: 36.5 },
                '38': { min: 37.5, max: 38.5 },
                '40': { min: 39.5, max: 40.5 },
                '42': { min: 41.5, max: 42.5 },
                '44': { min: 43.5, max: 44.5 }
            },
            neck: {
                'XS': { min: 14, max: 14.5 },
                'S': { min: 15, max: 15.5 },
                'M': { min: 16, max: 16.5 },
                'L': { min: 17, max: 17.5 },
                'XL': { min: 18, max: 18.5 },
                '2XL': { min: 19, max: 19.5 },
                '3XL': { min: 20, max: 20.5 }
            },
            sleeve: {
                'XS': { min: 32, max: 33 },
                'S': { min: 33, max: 34 },
                'M': { min: 34, max: 35 },
                'L': { min: 35, max: 36 },
                'XL': { min: 36, max: 37 },
                '2XL': { min: 37, max: 38 },
                '3XL': { min: 38, max: 39 }
            },
            inseam: {
                'SR': { min: 29, max: 31 },
                'LR': { min: 31, max: 33 },
                'XLR': { min: 33, max: 35 }
            }
        }
    };

    return charts[branch] || charts.army;
}

function displayResult(size) {
    document.getElementById('sizeValue').textContent = size.size;
    document.getElementById('armyAlpha').textContent = size.alpha;
    document.getElementById('armyNumeric').textContent = size.numeric;
    document.getElementById('natoSize').textContent = size.nato;
    document.getElementById('sizeResult').classList.remove('hidden');
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
