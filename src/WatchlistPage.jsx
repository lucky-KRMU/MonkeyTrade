import React, { useState } from 'react';
import { Trash2, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const initialWatchlist = [
  { symbol: 'AAPL', price: 175.24, change: 0.72 },
  { symbol: 'TSLA', price: 238.45, change: -0.96 },
  { symbol: 'NVDA', price: 485.30, change: 1.07 },
  { symbol: 'AMD', price: 165.20, change: 1.45 },
  { symbol: 'MSFT', price: 402.10, change: 0.25 },
];

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [newTicker, setNewTicker] = useState('');

  const removeStock = (symbol) => {
    setWatchlist(watchlist.filter((stock) => stock.symbol !== symbol));
  };

  const addStock = (e) => {
    e.preventDefault();
    if (newTicker && !watchlist.find(s => s.symbol === newTicker.toUpperCase())) {
      setWatchlist([...watchlist, { symbol: newTicker.toUpperCase(), price: 0.00, change: 0 }]);
      setNewTicker('');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Watchlist</h2>
          <p className="text-slate-500 dark:text-slate-400">Monitor your favorite assets in real-time</p>
        </div>
        
        {/* Add Stock Form */}
        <form onSubmit={addStock} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Add ticker..."
            value={newTicker}
            onChange={(e) => setNewTicker(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none w-40"
          />
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
            <Plus size={20} />
          </button>
        </form>
      </div>

      {/* Watchlist Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
            <tr className="text-slate-400 text-sm">
              <th className="px-6 py-4">Ticker</th>
              <th className="px-6 py-4">Last Price</th>
              <th className="px-6 py-4">24h Change</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {watchlist.map((stock) => (
              <tr key={stock.symbol} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{stock.symbol}</td>
                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">${stock.price.toFixed(2)}</td>
                <td className={`px-6 py-4 font-medium flex items-center gap-1 ${stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  {stock.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {Math.abs(stock.change)}%
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => removeStock(stock.symbol)}
                    className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}