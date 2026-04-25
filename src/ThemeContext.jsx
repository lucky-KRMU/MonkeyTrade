import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // --- Theme State ---
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

  // --- API/Caching State ---
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);

  const CACHE_DURATION = 300000; // 5 minutes in milliseconds

  const fetchHoldings = async () => {
    // Cache check
    if (lastFetched && Date.now() - lastFetched < CACHE_DURATION) {
      console.log("Using cached data (API call skipped).");
      return;
    }

    setLoading(true);
    const API_KEY = import.meta.env.VITE_FINNHUB_KEY;
    
    try {
      const symbols = ['AAPL', 'TSLA', 'NVDA'];
      const results = await Promise.all(
        symbols.map(async (s) => {
          const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${s}&token=${API_KEY}`);
          const data = await res.json();
          // Adding static mock data for calculation
          return { symbol: s, currentPrice: data.c || 0, avgCost: 150, shares: 10, pl: ((data.c || 0) - 150) * 10 };
        })
      );
      
      setHoldings(results);
      setLastFetched(Date.now());
    } catch (err) {
      console.error("API Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider value={{ theme, toggleTheme, holdings, loading, fetchHoldings }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);