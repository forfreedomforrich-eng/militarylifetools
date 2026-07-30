/**
 * Military ETS Countdown Timer
 * Tracks separation date with milestones
 */

(function() {
    'use strict';

    // DOM Elements
    const etsDateInput = document.getElementById('ets-date');
    const startCountdownBtn = document.getElementById('start-countdown');
    const countdownDisplay = document.getElementById('countdown-display');
    const milestonesSection = document.getElementById('milestones');
    const embedSection = document.getElementById('embed-section');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const etsMessage = document.getElementById('ets-message');
    const embedCode = document.getElementById('embed-code');
    const copyEmbedBtn = document.getElementById('copy-embed');
    const dateError = document.getElementById('date-error');

    // Milestone elements
    const milestone12 = document.getElementById('milestone-12');
    const milestone6 = document.getElementById('milestone-6');
    const milestone3 = document.getElementById('milestone-3');
    const milestone1 = document.getElementById('milestone-1');
    const status12 = document.getElementById('status-12');
    const status6 = document.getElementById('status-6');
    const status3 = document.getElementById('status-3');
    const status1 = document.getElementById('status-1');

    // Timer interval
    let countdownInterval = null;

    // Initialize
    function init() {
        // Set placeholder
        etsDateInput.setAttribute('placeholder', 'MM/DD/YYYY');
        
        // Event listeners
        startCountdownBtn.addEventListener('click', startCountdown);
        copyEmbedBtn.addEventListener('click', copyEmbedCode);

        // Enter key support
        etsDateInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                startCountdown();
            }
        });

        // Auto-format date input (add slashes automatically)
        etsDateInput.addEventListener('input', function(e) {
            clearError();
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2 && value.length <= 4) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            } else if (value.length > 4) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4, 8);
            }
            e.target.value = value;
        });

        // Load saved date if exists
        const savedDate = localStorage.getItem('etsDate');
        if (savedDate) {
            etsDateInput.value = savedDate;
            startCountdown();
        }
    }

    // Format date for input field (YYYY-MM-DD)
    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Format date for display
    function formatDateForDisplay(dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Parse date from MM/DD/YYYY format
    function parseDate(dateStr) {
        const parts = dateStr.split('/');
        if (parts.length !== 3) return null;
        
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        
        if (isNaN(month) || isNaN(day) || isNaN(year)) return null;
        if (month < 1 || month > 12) return null;
        if (day < 1 || day > 31) return null;
        if (year < 2000 || year > 2100) return null;
        
        // Check if date is valid
        const date = new Date(year, month - 1, day);
        if (date.getMonth() !== month - 1 || date.getDate() !== day) return null;
        
        return date;
    }

    // Validate date
    function validateDate(dateStr) {
        if (!dateStr) {
            return { valid: false, message: 'Please enter a date' };
        }

        // Check format
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
            return { valid: false, message: 'Please use MM/DD/YYYY format' };
        }

        const date = parseDate(dateStr);
        if (!date) {
            return { valid: false, message: 'Invalid date. Please check your input.' };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) {
            return { valid: false, message: 'This date has already passed. Please enter a future date.' };
        }

        // Check if date is more than 10 years in the future
        const tenYearsFromNow = new Date(today);
        tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
        if (date > tenYearsFromNow) {
            return { valid: false, message: 'Date seems too far in the future. Please check your date.' };
        }

        return { valid: true, date: date };
    }

    // Show error message
    function showError(message) {
        dateError.textContent = message;
        dateError.style.display = 'block';
    }

    // Clear error message
    function clearError() {
        dateError.textContent = '';
        dateError.style.display = 'none';
    }

    // Start countdown
    function startCountdown() {
        clearError();
        const dateStr = etsDateInput.value.trim();
        const validation = validateDate(dateStr);

        if (!validation.valid) {
            showError(validation.message);
            return;
        }

        // Save date to localStorage
        localStorage.setItem('etsDate', dateStr);

        // Show countdown display
        countdownDisplay.classList.remove('hidden');
        milestonesSection.classList.remove('hidden');
        embedSection.classList.remove('hidden');

        // Generate embed code
        generateEmbedCode();

        // Clear existing interval
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        // Start countdown
        updateCountdown(validation.date);
        countdownInterval = setInterval(function() {
            updateCountdown(validation.date);
        }, 1000);
    }

    // Update countdown display
    function updateCountdown(targetDate) {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            // Countdown finished
            clearInterval(countdownInterval);
            daysEl.textContent = '000';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            etsMessage.textContent = '🎉 Congratulations! You have reached your ETS date!';
            etsMessage.style.color = '#28a745';
            
            // Update milestones
            updateMilestones(targetDate, true);
            return;
        }

        // Calculate time units
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update display
        daysEl.textContent = String(days).padStart(3, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');

        // Update message
        updateMessage(days);

        // Update milestones
        updateMilestones(targetDate, false);
    }

    // Update status message
    function updateMessage(days) {
        if (days > 365) {
            const years = Math.floor(days / 365);
            const remainingDays = days % 365;
            etsMessage.textContent = `${years} year${years > 1 ? 's' : ''} and ${remainingDays} day${remainingDays > 1 ? 's' : ''} until your ETS`;
        } else if (days > 30) {
            const months = Math.floor(days / 30);
            const remainingDays = days % 30;
            etsMessage.textContent = `${months} month${months > 1 ? 's' : ''} and ${remainingDays} day${remainingDays > 1 ? 's' : ''} until your ETS`;
        } else if (days > 0) {
            etsMessage.textContent = `${days} day${days > 1 ? 's' : ''} until your ETS`;
        } else {
            etsMessage.textContent = 'Today is your ETS date!';
        }
    }

    // Update milestones
    function updateMilestones(targetDate, completed) {
        const now = new Date();
        const diff = targetDate - now;
        const daysUntil = Math.ceil(diff / (1000 * 60 * 60 * 24));

        // Reset all statuses
        [status12, status6, status3, status1].forEach(function(status) {
            status.className = 'milestone-status';
            status.textContent = 'Pending';
        });

        if (completed || daysUntil <= 0) {
            // All milestones completed
            [status12, status6, status3, status1].forEach(function(status) {
                status.classList.add('completed');
                status.textContent = '✓ Completed';
            });
            return;
        }

        // 12 months = 365 days
        if (daysUntil > 365) {
            status12.classList.add('upcoming');
            status12.textContent = 'Upcoming';
        } else {
            status12.classList.add('completed');
            status12.textContent = '✓ Completed';
        }

        // 6 months = 182 days
        if (daysUntil > 182) {
            status6.classList.add('upcoming');
            status6.textContent = 'Upcoming';
        } else {
            status6.classList.add('completed');
            status6.textContent = '✓ Completed';
        }

        // 3 months = 91 days
        if (daysUntil > 91) {
            status3.classList.add('upcoming');
            status3.textContent = 'Upcoming';
        } else {
            status3.classList.add('completed');
            status3.textContent = '✓ Completed';
        }

        // 1 month = 30 days
        if (daysUntil > 30) {
            status1.classList.add('upcoming');
            status1.textContent = 'Upcoming';
        } else {
            status1.classList.add('completed');
            status1.textContent = '✓ Completed';
        }
    }

    // Generate embed code
    function generateEmbedCode() {
        const currentUrl = window.location.href.split('?')[0];
        const embedUrl = currentUrl + '?date=' + encodeURIComponent(etsDateInput.value);
        
        const embedHtml = '<iframe src="' + embedUrl + '" width="100%" height="600" frameborder="0" title="Military ETS Countdown Timer"></iframe>';
        
        embedCode.value = embedHtml;
    }

    // Copy embed code
    function copyEmbedCode() {
        embedCode.select();
        embedCode.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            copyEmbedBtn.textContent = 'Copied!';
            copyEmbedBtn.style.backgroundColor = '#28a745';
            
            setTimeout(function() {
                copyEmbedBtn.textContent = 'Copy Code';
                copyEmbedBtn.style.backgroundColor = '';
            }, 2000);
        } catch (err) {
            alert('Failed to copy embed code. Please copy manually.');
        }
    }

    // Check for URL parameters (for embed)
    function checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const dateParam = urlParams.get('date');
        
        if (dateParam) {
            // Decode URL parameter
            const decodedDate = decodeURIComponent(dateParam);
            etsDateInput.value = decodedDate;
            startCountdown();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
            checkUrlParams();
        });
    } else {
        init();
        checkUrlParams();
    }

})();
