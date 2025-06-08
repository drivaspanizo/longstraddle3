# Create a comprehensive README file for the project
readme_content = '''# Professional Long Straddle Options Trading Dashboard

A comprehensive web application for analyzing and managing long straddle options strategies around earnings announcements. This dashboard provides sophisticated analytics for profiting from volatility increases that typically occur when companies report quarterly results.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## 🚀 Features

### 📊 Advanced Options Calculator
- **Dropdown Stock Selection**: Choose from top 20 S&P 500 companies by market capitalization
- **Auto-updating Earnings Dates**: Earnings dates automatically populate when selecting a company
- **Options Expiry Date Field**: Specify custom expiry dates for your options contracts
- **Real-time Calculations**: Instant calculation of maximum loss, unlimited gain potential, and breakeven points
- **Professional Validation**: Comprehensive form validation with helpful error messages

### 💼 Strategy Management
- **Save Strategies**: Persist multiple straddle configurations with detailed notes
- **Portfolio Tracking**: Monitor all saved strategies with comprehensive metrics
- **Risk Assessment**: Track total premium at risk across all active positions
- **Strategy History**: View all historical strategies with creation timestamps

### 📅 Earnings Calendar
- **S&P 500 Integration**: Top 20 companies with upcoming earnings dates
- **Smart Filtering**: Filter by "Next Week", "Next Month", "Next Quarter", or view all
- **Market Cap Data**: See company valuations to assess volatility potential
- **Days Until Earnings**: Real-time countdown to earnings announcements

### 🎨 Professional Interface
- **Dark Financial Theme**: Optimized for extended trading sessions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Navigation**: Tab-based interface with smooth transitions
- **Real-time Updates**: Live market status indicators (VIX, S&P 500)

## 📈 Long Straddle Strategy

The long straddle strategy involves:
- **Buying a call option** at a specific strike price
- **Buying a put option** at the same strike price and expiration date
- **Profiting from large price movements** in either direction

### Key Calculations
- **Maximum Loss**: Total premium paid (Call Premium + Put Premium)
- **Maximum Gain**: Unlimited (theoretically)
- **Upper Breakeven**: Strike Price + Total Premium
- **Lower Breakeven**: Strike Price - Total Premium

## 🛠 Installation & Setup

### Quick GitHub Deployment

1. **Fork or Download** this repository
2. **Upload Files** to your GitHub repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access Your Dashboard**:
   - Your dashboard will be available at: `https://yourusername.github.io/repository-name/`

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/longstraddle-dashboard.git

# Navigate to the directory
cd longstraddle-dashboard

# Open in your preferred browser
open index.html
```

## 🎯 Usage Guide

### Creating a New Strategy

1. **Navigate to "Straddle Calculator"** tab
2. **Select a Company** from the dropdown (earnings date auto-populates)
3. **Set Expiry Date** for your options contracts
4. **Enter Strike Price** and premiums for both call and put options
5. **Click "Calculate Strategy"** to see results
6. **Save Strategy** to track in your portfolio

### Managing Saved Strategies

1. **Visit "Saved Strategies"** tab to view all strategies
2. **Monitor Performance** with breakeven points and risk metrics
3. **Delete Strategies** that are no longer relevant
4. **Track Total Risk** across all active positions

### Using the Earnings Calendar

1. **Access "Earnings Calendar"** tab
2. **Filter by timeframe** using the filter buttons
3. **Review upcoming earnings** for strategy planning
4. **Identify high-volatility opportunities** from major companies

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Calculate current strategy
- **Ctrl/Cmd + S**: Save current strategy
- **Escape**: Reset form and clear results

## 🏢 Included Companies

The dashboard includes the top 20 S&P 500 companies by market capitalization:

| Symbol | Company | Market Cap | Upcoming Earnings |
|--------|---------|------------|-------------------|
| MSFT | Microsoft Corporation | $3.321T | July 15, 2025 |
| NVDA | NVIDIA Corporation | $3.605T | July 18, 2025 |
| AAPL | Apple Inc. | $3.363T | July 22, 2025 |
| AMZN | Amazon.com Inc. | $2.475T | July 25, 2025 |
| GOOGL | Alphabet Inc. | $2.432T | July 24, 2025 |
| ... | ... | ... | ... |

*Note: Earnings dates are projections and should be verified with official company announcements.*

## 🔧 Technical Specifications

### Technologies Used
- **HTML5**: Semantic markup with modern form elements
- **CSS3**: Grid, Flexbox, animations, and responsive design
- **Vanilla JavaScript**: ES6+ features, localStorage, DOM manipulation
- **No Dependencies**: Pure web technologies for maximum compatibility

### Browser Compatibility
- **Chrome**: 70+
- **Firefox**: 65+
- **Safari**: 12+
- **Edge**: 79+

### Performance Features
- **Local Storage**: Strategies persist across browser sessions
- **Optimized Calculations**: Efficient real-time computations
- **Responsive Images**: Adaptive loading for all screen sizes
- **Smooth Animations**: Hardware-accelerated transitions

## 📱 Mobile Optimization

The dashboard is fully optimized for mobile trading:
- **Touch-friendly Interface**: Large tap targets and gesture support
- **Responsive Tables**: Horizontal scrolling with fixed headers
- **Mobile Navigation**: Collapsible menu for small screens
- **Optimized Typography**: Readable fonts at all sizes

## 🔐 Data Privacy & Security

- **Local Storage Only**: All data stays on your device
- **No External APIs**: No third-party data transmission
- **Client-side Processing**: All calculations performed locally
- **No Registration Required**: Use immediately without accounts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This dashboard is for educational and informational purposes only. Options trading involves substantial risk and is not suitable for all investors. The information provided should not be considered as financial advice. Always consult with a qualified financial advisor before making investment decisions.

## 🆘 Support

If you encounter any issues or have questions:

1. **Check the Issues** section of the repository
2. **Create a New Issue** with detailed description
3. **Include screenshots** if reporting UI problems
4. **Specify browser and version** for compatibility issues

## 🔄 Version History

### v1.0.0 (Current)
- Initial release with full functionality
- S&P 500 company integration
- Complete straddle calculator
- Strategy management system
- Earnings calendar with filtering
- Responsive design implementation

---

**Happy Trading! 📈**

*Built with ❤️ for options traders who love volatility around earnings.*'''

# Save the README file
with open('README.md', 'w', encoding='utf-8') as f:
    f.write(readme_content)

print("README.md file created successfully!")