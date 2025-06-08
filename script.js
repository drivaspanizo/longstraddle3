// S&P 500 Top 20 Companies Data with Earnings Dates
const SP500_COMPANIES = [
    { symbol: "MSFT", name: "Microsoft Corporation", earnings: "2025-07-15", marketCap: "3.321T" },
    { symbol: "NVDA", name: "NVIDIA Corporation", earnings: "2025-07-18", marketCap: "3.605T" },
    { symbol: "AAPL", name: "Apple Inc.", earnings: "2025-07-22", marketCap: "3.363T" },
    { symbol: "AMZN", name: "Amazon.com Inc.", earnings: "2025-07-25", marketCap: "2.475T" },
    { symbol: "GOOGL", name: "Alphabet Inc. Class A", earnings: "2025-07-24", marketCap: "2.432T" },
    { symbol: "META", name: "Meta Platforms Inc.", earnings: "2025-07-26", marketCap: "1.503T" },
    { symbol: "AVGO", name: "Broadcom Inc.", earnings: "2025-07-20", marketCap: "699B" },
    { symbol: "BRK.B", name: "Berkshire Hathaway Inc. Class B", earnings: "2025-08-02", marketCap: "1.062T" },
    { symbol: "TSLA", name: "Tesla Inc.", earnings: "2025-07-17", marketCap: "1.147T" },
    { symbol: "WMT", name: "Walmart Inc.", earnings: "2025-08-15", marketCap: "707B" },
    { symbol: "JPM", name: "JPMorgan Chase & Co.", earnings: "2025-07-12", marketCap: "673B" },
    { symbol: "V", name: "Visa Inc.", earnings: "2025-07-23", marketCap: "647B" },
    { symbol: "LLY", name: "Eli Lilly and Company", earnings: "2025-07-30", marketCap: "629B" },
    { symbol: "MA", name: "Mastercard Incorporated", earnings: "2025-07-28", marketCap: "490B" },
    { symbol: "NFLX", name: "Netflix Inc.", earnings: "2025-07-19", marketCap: "478B" },
    { symbol: "ORCL", name: "Oracle Corporation", earnings: "2025-06-10", marketCap: "444B" },
    { symbol: "COST", name: "Costco Wholesale Corporation", earnings: "2025-07-31", marketCap: "408B" },
    { symbol: "XOM", name: "Exxon Mobil Corporation", earnings: "2025-07-29", marketCap: "406B" },
    { symbol: "PG", name: "Procter & Gamble Company", earnings: "2025-07-21", marketCap: "352B" },
    { symbol: "JNJ", name: "Johnson & Johnson", earnings: "2025-07-16", marketCap: "341B" }
];

// Global variables
let savedStrategies = JSON.parse(localStorage.getItem('straddleStrategies')) || [];
let currentStrategy = null;

// DOM Elements
const stockSelect = document.getElementById('stock-select');
const earningsDate = document.getElementById('earnings-date');
const expiryDate = document.getElementById('expiry-date');
const strikePrice = document.getElementById('strike-price');
const callPremium = document.getElementById('call-premium');
const putPremium = document.getElementById('put-premium');
const notes = document.getElementById('notes');
const calculateBtn = document.getElementById('calculate-btn');
const saveBtn = document.getElementById('save-btn');
const resetBtn = document.getElementById('reset-btn');
const errorMessage = document.getElementById('error-message');
const resultsSection = document.getElementById('results-section');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    populateStockDropdown();
    setupEventListeners();
    updateDashboardStats();
    populateEarningsCalendar();
    showTab('dashboard');
}

// Populate stock dropdown with S&P 500 companies
function populateStockDropdown() {
    stockSelect.innerHTML = '<option value="">Select a company</option>';

    SP500_COMPANIES.forEach(company => {
        const option = document.createElement('option');
        option.value = company.symbol;
        option.textContent = `${company.symbol} - ${company.name}`;
        option.dataset.earnings = company.earnings;
        stockSelect.appendChild(option);
    });
}

// Setup all event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabName = e.target.getAttribute('onclick').match(/'(.*?)'/)[1];
            showTab(tabName);
        });
    });

    // Stock selection change - auto-update earnings date
    stockSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption.dataset.earnings) {
            earningsDate.value = selectedOption.dataset.earnings;

            // Auto-set expiry date to the Friday after earnings (typical options expiry)
            const earningsDateObj = new Date(selectedOption.dataset.earnings);
            const expiryDateObj = getNextFriday(earningsDateObj);
            expiryDate.value = formatDate(expiryDateObj);
        } else {
            earningsDate.value = '';
            expiryDate.value = '';
        }
        clearResults();
    });

    // Form buttons
    calculateBtn.addEventListener('click', calculateStrategy);
    saveBtn.addEventListener('click', saveStrategy);
    resetBtn.addEventListener('click', resetForm);

    // Input validation
    [strikePrice, callPremium, putPremium].forEach(input => {
        input.addEventListener('input', validateForm);
    });

    // Filter buttons for earnings calendar
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterEarningsCalendar(this.dataset.filter);
        });
    });
}

// Tab system
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Find and activate the correct nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        const onclick = link.getAttribute('onclick');
        if (onclick && onclick.includes(tabName)) {
            link.classList.add('active');
        }
    });

    // Load specific tab content
    if (tabName === 'strategies') {
        loadSavedStrategies();
    } else if (tabName === 'earnings') {
        populateEarningsCalendar();
    }
}

// Get next Friday after a given date (for options expiry)
function getNextFriday(date) {
    const result = new Date(date);
    result.setDate(result.getDate() + (5 - result.getDay() + 7) % 7);
    return result;
}

// Format date for input fields
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Validate form inputs
function validateForm() {
    const isValid = stockSelect.value && 
                   earningsDate.value && 
                   expiryDate.value &&
                   strikePrice.value && 
                   parseFloat(strikePrice.value) > 0 &&
                   callPremium.value && 
                   parseFloat(callPremium.value) >= 0 &&
                   putPremium.value && 
                   parseFloat(putPremium.value) >= 0;

    calculateBtn.disabled = !isValid;
    return isValid;
}

// Calculate long straddle strategy
function calculateStrategy() {
    if (!validateForm()) {
        showError('Please fill in all required fields with valid values.');
        return;
    }

    const strike = parseFloat(strikePrice.value);
    const callPrem = parseFloat(callPremium.value);
    const putPrem = parseFloat(putPremium.value);

    if (strike <= 0) {
        showError('Strike price must be greater than 0.');
        return;
    }

    if (callPrem < 0 || putPrem < 0) {
        showError('Premiums cannot be negative.');
        return;
    }

    // Long Straddle Calculations
    const totalPremium = callPrem + putPrem;
    const maxLoss = totalPremium;
    const upperBreakeven = strike + totalPremium;
    const lowerBreakeven = strike - totalPremium;

    // Validate expiry date is after earnings date
    const earningsDateObj = new Date(earningsDate.value);
    const expiryDateObj = new Date(expiryDate.value);

    if (expiryDateObj <= earningsDateObj) {
        showError('Expiry date must be after earnings date.');
        return;
    }

    // Store current strategy
    currentStrategy = {
        symbol: stockSelect.value,
        earningsDate: earningsDate.value,
        expiryDate: expiryDate.value,
        strike: strike,
        callPremium: callPrem,
        putPremium: putPrem,
        totalPremium: totalPremium,
        maxLoss: maxLoss,
        upperBreakeven: upperBreakeven,
        lowerBreakeven: lowerBreakeven,
        notes: notes.value,
        createdAt: new Date().toISOString()
    };

    // Display results
    displayResults(currentStrategy);

    // Enable save button
    saveBtn.disabled = false;

    // Clear any error messages
    hideError();
}

// Display calculation results
function displayResults(strategy) {
    document.getElementById('max-loss').textContent = `-$${strategy.maxLoss.toFixed(2)}`;
    document.getElementById('max-gain').textContent = 'Unlimited';
    document.getElementById('upper-breakeven').textContent = `$${strategy.upperBreakeven.toFixed(2)}`;
    document.getElementById('lower-breakeven').textContent = `$${strategy.lowerBreakeven.toFixed(2)}`;

    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Save strategy to localStorage
function saveStrategy() {
    if (!currentStrategy) {
        showError('Please calculate a strategy first.');
        return;
    }

    // Add unique ID
    currentStrategy.id = Date.now().toString();

    // Add to saved strategies
    savedStrategies.push(currentStrategy);

    // Save to localStorage
    localStorage.setItem('straddleStrategies', JSON.stringify(savedStrategies));

    // Update dashboard stats
    updateDashboardStats();

    // Add to activity log
    addToActivityLog(`Saved new ${currentStrategy.symbol} straddle strategy`);

    // Show success message
    showSuccess('Strategy saved successfully!');

    // Reset form
    resetForm();
}

// Delete strategy
function deleteStrategy(id) {
    if (confirm('Are you sure you want to delete this strategy?')) {
        savedStrategies = savedStrategies.filter(strategy => strategy.id !== id);
        localStorage.setItem('straddleStrategies', JSON.stringify(savedStrategies));
        loadSavedStrategies();
        updateDashboardStats();
        addToActivityLog('Deleted a strategy');
    }
}

// Load and display saved strategies
function loadSavedStrategies() {
    const tbody = document.getElementById('strategies-tbody');
    const noStrategies = document.getElementById('no-strategies');

    if (savedStrategies.length === 0) {
        tbody.innerHTML = '';
        noStrategies.style.display = 'block';
        return;
    }

    noStrategies.style.display = 'none';

    tbody.innerHTML = savedStrategies.map(strategy => {
        const earningsDateObj = new Date(strategy.earningsDate);
        const daysUntilEarnings = Math.ceil((earningsDateObj - new Date()) / (1000 * 60 * 60 * 24));
        const status = daysUntilEarnings > 0 ? 'Active' : 'Expired';

        return `
            <tr>
                <td>${strategy.symbol}</td>
                <td>${formatDisplayDate(strategy.earningsDate)}</td>
                <td>${formatDisplayDate(strategy.expiryDate)}</td>
                <td>$${strategy.strike.toFixed(2)}</td>
                <td>$${strategy.callPremium.toFixed(2)}</td>
                <td>$${strategy.putPremium.toFixed(2)}</td>
                <td class="loss">-$${strategy.maxLoss.toFixed(2)}</td>
                <td>$${strategy.upperBreakeven.toFixed(2)}</td>
                <td>$${strategy.lowerBreakeven.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteStrategy('${strategy.id}')">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Populate earnings calendar
function populateEarningsCalendar() {
    const tbody = document.getElementById('earnings-tbody');
    const today = new Date();

    tbody.innerHTML = SP500_COMPANIES.map(company => {
        const earningsDateObj = new Date(company.earnings);
        const daysUntil = Math.ceil((earningsDateObj - today) / (1000 * 60 * 60 * 24));

        return `
            <tr>
                <td>${company.name}</td>
                <td>${company.symbol}</td>
                <td>${formatDisplayDate(company.earnings)}</td>
                <td>$${company.marketCap}</td>
                <td>${daysUntil > 0 ? daysUntil : 'Past'}</td>
            </tr>
        `;
    }).join('');
}

// Filter earnings calendar
function filterEarningsCalendar(filter) {
    const today = new Date();
    let filteredCompanies = [];

    switch(filter) {
        case 'week':
            const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            filteredCompanies = SP500_COMPANIES.filter(company => {
                const earningsDate = new Date(company.earnings);
                return earningsDate >= today && earningsDate <= nextWeek;
            });
            break;
        case 'month':
            const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
            filteredCompanies = SP500_COMPANIES.filter(company => {
                const earningsDate = new Date(company.earnings);
                return earningsDate >= today && earningsDate <= nextMonth;
            });
            break;
        case 'quarter':
            const nextQuarter = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
            filteredCompanies = SP500_COMPANIES.filter(company => {
                const earningsDate = new Date(company.earnings);
                return earningsDate >= today && earningsDate <= nextQuarter;
            });
            break;
        default:
            filteredCompanies = SP500_COMPANIES;
    }

    const tbody = document.getElementById('earnings-tbody');
    tbody.innerHTML = filteredCompanies.map(company => {
        const earningsDateObj = new Date(company.earnings);
        const daysUntil = Math.ceil((earningsDateObj - today) / (1000 * 60 * 60 * 1000));

        return `
            <tr>
                <td>${company.name}</td>
                <td>${company.symbol}</td>
                <td>${formatDisplayDate(company.earnings)}</td>
                <td>$${company.marketCap}</td>
                <td>${daysUntil > 0 ? daysUntil : 'Past'}</td>
            </tr>
        `;
    }).join('');
}

// Update dashboard statistics
function updateDashboardStats() {
    const totalStrategies = savedStrategies.length;
    const activeStrategies = savedStrategies.filter(strategy => {
        const earningsDate = new Date(strategy.earningsDate);
        return earningsDate > new Date();
    }).length;

    const totalPremiumAtRisk = savedStrategies
        .filter(strategy => new Date(strategy.earningsDate) > new Date())
        .reduce((total, strategy) => total + strategy.maxLoss, 0);

    document.getElementById('total-strategies').textContent = totalStrategies;
    document.getElementById('active-strategies').textContent = activeStrategies;
    document.getElementById('total-premium').textContent = `$${totalPremiumAtRisk.toFixed(2)}`;
}

// Add to activity log
function addToActivityLog(message) {
    const activityList = document.getElementById('activity-list');
    const timestamp = new Date().toLocaleString();
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `<span class="timestamp">${timestamp}</span>: ${message}`;

    if (activityList.children.length === 0 || activityList.children[0].textContent.includes('Welcome')) {
        activityList.innerHTML = '';
    }

    activityList.insertBefore(activityItem, activityList.firstChild);

    // Keep only last 5 activities
    while (activityList.children.length > 5) {
        activityList.removeChild(activityList.lastChild);
    }
}

// Reset form
function resetForm() {
    document.getElementById('straddle-form').reset();
    currentStrategy = null;
    saveBtn.disabled = true;
    clearResults();
    hideError();
}

// Clear results section
function clearResults() {
    resultsSection.classList.add('hidden');
    saveBtn.disabled = true;
}

// Error handling
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(hideError, 5000);
}

function hideError() {
    errorMessage.classList.remove('show');
}

function showSuccess(message) {
    // Create temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #38a169 0%, #48bb78 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    successDiv.textContent = message;

    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => document.body.removeChild(successDiv), 300);
    }, 3000);
}

// Utility function to format dates for display
function formatDisplayDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Add CSS animations for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .activity-item {
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(99, 179, 237, 0.1);
        color: #a0aec0;
    }

    .activity-item:last-child {
        border-bottom: none;
    }

    .timestamp {
        color: #63b3ed;
        font-size: 0.875rem;
    }
`;
document.head.appendChild(style);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to calculate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!calculateBtn.disabled) {
            calculateStrategy();
        }
    }

    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!saveBtn.disabled) {
            saveStrategy();
        }
    }

    // Escape to reset form
    if (e.key === 'Escape') {
        resetForm();
    }
});

// Expose functions to global scope for inline event handlers
window.showTab = showTab;
window.deleteStrategy = deleteStrategy;