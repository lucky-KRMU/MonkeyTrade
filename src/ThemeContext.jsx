// Add this to your existing GlobalProvider
const [marketMovers, setMarketMovers] = useState({ gainers: [], losers: [], loading: false });

const fetchMarketData = async () => {
  // Prevent duplicate calls if we already have data
  if (marketMovers.gainers.length > 0) return;

  setMarketMovers(prev => ({ ...prev, loading: true }));
  const API_KEY = import.meta.env.VITE_FINNHUB_KEY;
  
  try {
    // Example: Fetching specific tickers for gainers/losers
    const symbols = ['NVDA', 'AMD', 'PLTR', 'TSLA', 'META', 'NFLX'];
    const data = await Promise.all(
      symbols.map(async (s) => {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${s}&token=${API_KEY}`);
        const json = await res.json();
        return { symbol: s, price: json.c, change: json.d }; // 'd' is change in Finnhub
      })
    );

    // Split into mock gainers/losers based on change (d)
    const gainers = data.filter(s => s.change > 0).slice(0, 3);
    const losers = data.filter(s => s.change < 0).slice(0, 3);

    setMarketMovers({ gainers, losers, loading: false });
  } catch (err) {
    console.error("Error fetching market data:", err);
    setMarketMovers(prev => ({ ...prev, loading: false }));
  }
};

// --- Update your Provider value ---
<GlobalContext.Provider value={{ 
  theme, toggleTheme, holdings, loading, fetchHoldings, 
  marketMovers, fetchMarketData // <--- Add these
}}>
  {children}
</GlobalContext.Provider>