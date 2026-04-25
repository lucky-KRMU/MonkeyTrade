
***

# 🐒 MonkeyTrade

**MonkeyTrade** is a professional-grade stock market dashboard built with React and Vite. It provides real-time market insights, portfolio tracking, and a persistent watchlist, all wrapped in a sleek, responsive UI with full dark mode support.

### 

## 🚀 Key Features

* **Unified Global State:** Uses a central `ThemeContext.jsx` (Global Provider) to manage themes, API data, and watchlists across all pages.
* **Real-time Data:** Integrated with the **Finnhub Stock API** for live quotes and market movers.
* **Smart Caching:** Implements a 5-minute client-side cache to minimize API calls and prevent hitting rate limits.
* **Persistent Watchlist:** Automatically saves your favorite tickers to `localStorage`, so your list is there even after you close the browser.
* **Dynamic Pagination:** Features a "Load More" system in the watchlist to handle data efficiently.
* **Responsive Dark Mode:** Smooth transitions between Light and Dark themes powered by Tailwind CSS.
* **Reliable Routing:** Seamless navigation using **React Router v6** with a custom 404 "Not Found" page.

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **API:** Finnhub Stock API
* **State Management:** React Context API
* **Routing:** React Router

## 📂 Project Structure

```text
src/
├── App.jsx              # Root component & Route definitions
├── DashboardLayout.jsx  # Main UI shell (Sidebar/Header)
├── DashboardPage.jsx    # Portfolio overview & Metrics
├── ErrorBoundry.jsx     # Global error handling
├── main.jsx             # Application entry point
├── MarketsPage.jsx      # Top Market Gainers & Losers
├── NotFoundPage.jsx     # Custom 404 error handler
├── OrdersPage.jsx       # Trading and order history
├── PortfolioPage.jsx    # Detailed holdings overview
├── SettingsPage.jsx     # User preferences & configuration
├── ThemeContext.jsx     # Global Source of Truth (Theme, API, Watchlist)
└── WatchlistPage.jsx    # Persistent stock tracker with Load More
```

## ⚙️ Getting Started

### 1. Prerequisites
* Node.js (v18+)
* A Finnhub API Key (Available for free at [finnhub.io](https://finnhub.io/))

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/lucky-KRMU/MonkeyTrade.git

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_FINNHUB_KEY=your_actual_api_key_here
```

### 4. Run the Project
```bash
npm run dev
```

## 📄 License
This project is licensed under the MIT License.

## 👤 Author
**Lucky Pawar**
~L. Pawar

---
*Built with precision using React, Vite, and Tailwind.*