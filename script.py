# Create the complete HTML file with improved functionality
html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Options Straddle Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-brand">
            <h1>Options Straddle Dashboard</h1>
        </div>
        <ul class="nav-links">
            <li><a href="#" onclick="showTab('dashboard')" class="nav-link active">Dashboard</a></li>
            <li><a href="#" onclick="showTab('calculator')" class="nav-link">Straddle Calculator</a></li>
            <li><a href="#" onclick="showTab('strategies')" class="nav-link">Saved Strategies</a></li>
            <li><a href="#" onclick="showTab('earnings')" class="nav-link">Earnings Calendar</a></li>
        </ul>
    </nav>

    <div class="market-status">
        <div class="status-item">
            <span class="label">VIX:</span>
            <span class="value" id="vix-value">16.24</span>
        </div>
        <div class="status-item">
            <span class="label">S&P 500:</span>
            <span class="value" id="sp500-value">5,346.12</span>
        </div>
    </div>

    <main class="container">
        <!-- Dashboard Tab -->
        <div id="dashboard" class="tab-content active">
            <div class="dashboard-grid">
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-number" id="total-strategies">0</div>
                    <div class="stat-label">Total Strategies</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📈</div>
                    <div class="stat-number" id="active-strategies">0</div>
                    <div class="stat-label">Active Strategies</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-number" id="total-premium">$0.00</div>
                    <div class="stat-label">Total Premium at Risk</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📅</div>
                    <div class="stat-number" id="upcoming-earnings">20</div>
                    <div class="stat-label">Upcoming Earnings</div>
                </div>
            </div>
            
            <div class="recent-activity">
                <h3>Recent Activity</h3>
                <div id="activity-list">
                    <p>Welcome to your Options Straddle Dashboard. Start by creating your first strategy using the Straddle Calculator.</p>
                </div>
            </div>
        </div>

        <!-- Straddle Calculator Tab -->
        <div id="calculator" class="tab-content">
            <div class="calculator-section">
                <h2>Create New Straddle Strategy</h2>
                <form id="straddle-form" class="straddle-form">
                    <div class="form-group">
                        <label for="stock-select">Stock Symbol *</label>
                        <select id="stock-select" name="stock" required>
                            <option value="">Select a company</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="earnings-date">Earnings Date *</label>
                        <input type="date" id="earnings-date" name="earningsDate" readonly required>
                    </div>

                    <div class="form-group">
                        <label for="expiry-date">Options Expiry Date *</label>
                        <input type="date" id="expiry-date" name="expiryDate" required>
                    </div>

                    <div class="form-group">
                        <label for="strike-price">Strike Price * ($)</label>
                        <input type="number" id="strike-price" name="strikePrice" step="0.01" min="0" required>
                    </div>

                    <div class="form-group">
                        <label for="call-premium">Call Premium * ($)</label>
                        <input type="number" id="call-premium" name="callPremium" step="0.01" min="0" required>
                    </div>

                    <div class="form-group">
                        <label for="put-premium">Put Premium * ($)</label>
                        <input type="number" id="put-premium" name="putPremium" step="0.01" min="0" required>
                    </div>

                    <div class="form-group">
                        <label for="notes">Notes (Optional)</label>
                        <textarea id="notes" name="notes" rows="3" placeholder="Add any additional notes about this strategy..."></textarea>
                    </div>

                    <div class="form-actions">
                        <button type="button" id="calculate-btn" class="btn btn-primary">Calculate Strategy</button>
                        <button type="button" id="save-btn" class="btn btn-secondary" disabled>Save Strategy</button>
                        <button type="button" id="reset-btn" class="btn btn-tertiary">Reset Form</button>
                    </div>

                    <div id="error-message" class="error-message"></div>
                </form>

                <div id="results-section" class="results-section hidden">
                    <h3>Strategy Results</h3>
                    <div class="results-grid">
                        <div class="result-item">
                            <span class="result-label">Maximum Loss</span>
                            <span class="result-value loss" id="max-loss">-</span>
                            <span class="result-description">Total premium paid</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Maximum Gain</span>
                            <span class="result-value gain" id="max-gain">Unlimited</span>
                            <span class="result-description">Theoretically unlimited</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Upper Breakeven</span>
                            <span class="result-value" id="upper-breakeven">-</span>
                            <span class="result-description">Strike + total premium</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Lower Breakeven</span>
                            <span class="result-value" id="lower-breakeven">-</span>
                            <span class="result-description">Strike - total premium</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Saved Strategies Tab -->
        <div id="strategies" class="tab-content">
            <div class="strategies-section">
                <h2>Saved Strategies</h2>
                <div class="table-container">
                    <table id="strategies-table" class="data-table">
                        <thead>
                            <tr>
                                <th>Stock</th>
                                <th>Earnings Date</th>
                                <th>Expiry Date</th>
                                <th>Strike</th>
                                <th>Call Premium</th>
                                <th>Put Premium</th>
                                <th>Max Loss</th>
                                <th>Upper BE</th>
                                <th>Lower BE</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="strategies-tbody">
                        </tbody>
                    </table>
                    <div id="no-strategies" class="no-data">
                        <p>No saved strategies yet. Create your first strategy using the calculator.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings Calendar Tab -->
        <div id="earnings" class="tab-content">
            <div class="earnings-section">
                <h2>Upcoming Earnings (Top 20 S&P 500)</h2>
                <div class="filter-buttons">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="week">Next Week</button>
                    <button class="filter-btn" data-filter="month">Next Month</button>
                    <button class="filter-btn" data-filter="quarter">Next Quarter</button>
                </div>
                <div class="table-container">
                    <table id="earnings-table" class="data-table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Symbol</th>
                                <th>Next Earnings Date</th>
                                <th>Market Cap</th>
                                <th>Days Until</th>
                            </tr>
                        </thead>
                        <tbody id="earnings-tbody">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>

    <script src="script.js"></script>
</body>
</html>'''

# Save the HTML file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("HTML file created successfully!")