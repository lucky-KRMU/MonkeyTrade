import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // --- 1. Theme State ---
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      window.document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      window.document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // --- 2. Holdings (Portfolio) State ---
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHoldings = async () => {
    setLoading(true);
    try {
      const API_KEY = import.meta.env.VITE_FINNHUB_KEY;
      const symbols = ['AAPL', 'TSLA', 'NVDA'];
      const results = await Promise.all(
        symbols.map(async (s) => {
          const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${s}&token=${API_KEY}`);
          const data = await res.json();
          return { symbol: s, currentPrice: data.c || 0, avgCost: 150, shares: 10, pl: ((data.c || 0) - 150) * 10 };
        })
      );
      setHoldings(results);
    } catch (err) { console.error("API Error:", err); } 
    finally { setLoading(false); }
  };

  // --- 3. Market Data State ---
  const [marketMovers, setMarketMovers] = useState({ gainers: [], losers: [], loading: false });

  const fetchMarketData = async () => {
    if (marketMovers.gainers.length > 0) return;
    setMarketMovers(prev => ({ ...prev, loading: true }));
    try {
      const API_KEY = import.meta.env.VITE_FINNHUB_KEY;
      const symbols = ['NVDA', 'AMD', 'PLTR', 'TSLA', 'META', 'NFLX'];
      const data = await Promise.all(symbols.map(async (s) => {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${s}&token=${API_KEY}`);
        const json = await res.json();
        return { symbol: s, price: json.c, change: json.d };
      }));
      setMarketMovers({ gainers: data.filter(s => s.change > 0).slice(0, 3), losers: data.filter(s => s.change < 0).slice(0, 3), loading: false });
    } catch (err) { console.error(err); }
  };

  // --- 4. Watchlist State (with Load More) ---
  const [tickerList] = useState(['AAPL', 'TSLA', 'NVDA', 'AMD', 'MSFT', 'META', 'GOOGL', 'AMZN']);
  const [visibleWatchlist, setVisibleWatchlist] = useState([]);

  const loadMore = async () => {
    const currentCount = visibleWatchlist.length;
    const nextBatch = tickerList.slice(currentCount, currentCount + 3);
    if (nextBatch.length === 0) return;

    const API_KEY = import.meta.env.VITE_FINNHUB_KEY;
    try {
      const newStocks = await Promise.all(
        nextBatch.map(async (s) => {
          const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${s}&token=${API_KEY}`);
          const data = await res.json();
          return { symbol: s, price: data.c || 0, change: data.d || 0 };
        })
      );
      setVisibleWatchlist(prev => [...prev, ...newStocks]);
    } catch (err) { console.error("Error loading more:", err); }
  };

  return (
    <GlobalContext.Provider value={{ 
      theme, toggleTheme, 
      holdings, loading, fetchHoldings,
      marketMovers, fetchMarketData,
      visibleWatchlist, loadMore, hasMore: visibleWatchlist.length < tickerList.length
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

// --- Hooks ---
export const useGlobalContext = () => useContext(GlobalContext);

// --- Bridge: Fixes your "useTheme export" error ---
export const useTheme = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useTheme must be used within a GlobalProvider');
  return { theme: context.theme, toggleTheme: context.toggleTheme };
};