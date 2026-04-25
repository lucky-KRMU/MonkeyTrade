import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUpRight, PlusCircle, Loader2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// --- Configuration ---
// const API_KEY = import.meta.env.VITE_FINNHUB_KEY;
const SYMBOLS = ['AAPL', 'TSLA', 'NVDA'];

// Static holding data used as the "base" to calculate P/L
const userHoldings = [
  { symbol: 'AAPL', shares: 50, avgCost: 150.00 },
  { symbol: 'TSLA', shares: 20, avgCost: 250.00 },
  { symbol: 'NVDA', shares: 10, avgCost: 400.00 },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Quotes for all symbols
        const holdingsPromises = userHoldings.map(async (h) => {
          const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${h.symbol}&token=${API_KEY}`);
          const data = await res.json();
          return {
            ...h,
            currentPrice: data.c,
            pl: (data.c - h.avgCost) * h.shares
          };
        });

        // 2. Fetch Chart Data (Last 30 days)
        const to = Math.floor(Date.now() / 1000);
        const from = to - (30 * 24 * 60 * 60);
        const chartRes = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=${from}&to=${to}&token=${API_KEY}`);
        const cData = await chartRes.json();
        // --- ADD THIS LINE ---
        console.log("Finnhub Raw Chart Data:", cData);
        // ---------------------

        if (cData.s === 'ok') {
          // Your processing logic...
        } else {
          console.error("Finnhub returned:", cData.s);
        }

        // Transform chart data
        const formattedChart = cData.t?.map((timestamp, index) => ({
          name: new Date(timestamp * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
          value: cData.c[index] * 100 // Mock portfolio growth based on AAPL trend
        })) || [];

        setHoldings(await Promise.all(holdingsPromises));
        setChartData(formattedChart);
      } catch (err) {
        console.error("Error fetching Finnhub data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-orange-500" size={48} />
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Portfolio Value</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            ${holdings.reduce((acc, h) => acc + (h.currentPrice * h.shares), 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total P/L</p>
          <h2 className={`text-2xl font-bold flex items-center gap-2 ${holdings.reduce((acc, h) => acc + h.pl, 0) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            ${holdings.reduce((acc, h) => acc + h.pl, 0).toFixed(2)} <ArrowUpRight size={20} />
          </h2>
        </div>
      </div>

      {/* 2. Chart Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-75">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Portfolio Growth (AAPL Trend)</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `$${val / 1000}k`} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
            <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Holdings Table */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800 dark:text-white">Your Holdings</h3>
          <button onClick={() => setIsTradeModalOpen(true)} className="text-orange-600 font-medium flex items-center gap-1">
            <PlusCircle size={16} /> Place Trade
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-sm border-b border-slate-100">
              <th className="pb-3">Ticker</th>
              <th className="pb-3">Shares</th>
              <th className="pb-3">Current Price</th>
              <th className="pb-3">P/L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {holdings.map(h => (
              <tr key={h.symbol}>
                <td className="py-4 font-bold text-slate-800 dark:text-white">{h.symbol}</td>
                <td className="py-4 text-slate-600">{h.shares}</td>
                <td className="py-4 text-slate-600">${h.currentPrice.toFixed(2)}</td>
                <td className={`py-4 font-medium ${h.pl >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  ${h.pl.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Trade Modal */}
      {isTradeModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Place Trade</h2>
            <input type="text" placeholder="Ticker" className="w-full p-3 border rounded-lg mb-4" />
            <button onClick={() => setIsTradeModalOpen(false)} className="w-full py-3 bg-slate-900 text-white rounded-lg">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}