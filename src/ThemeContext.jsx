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
  const [lastFetched, setLastFetched] = useState(null);
  const CACHE_DURATION = 300000; // 5 minutes

  const fetchHoldings = async () => {
    if (lastFetched && Date.now() - lastFetched < CACHE_DURATION) return;

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
      setLastFetched(Date.now());
    } catch (err) { console.error("API Fetch Error:", err); } 
    finally { setLoading(false); }
  };

  // --- 3. Market Data State ---
  const [marketMovers, setMarketMovers] = useState({ gainers: [], losers: [], loading: false });

  const fetchMarketData = async () => {
    if (marketMovers.gainers.length > 0) return; // Basic cache
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

  // --- 4. Watchlist State ---
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('userWatchlist');
    return saved ? JSON.parse(saved) : [{ symbol: 'AAPL', price: 175.24, change: 0.72 }];
  });

  useEffect(() => {
    localStorage.setItem('userWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (symbol) => {
    if (!watchlist.find(s => s.symbol === symbol.toUpperCase())) {
      setWatchlist(prev => [...prev, { symbol: symbol.toUpperCase(), price: 0, change: 0 }]);
    }
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist(prev => prev.filter(s => s.symbol !== symbol));
  };

  return (
    <GlobalContext.Provider value={{ 
      theme, toggleTheme, 
      holdings, loading, fetchHoldings,
      marketMovers, fetchMarketData,
      watchlist, addToWatchlist, removeFromWatchlist
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);