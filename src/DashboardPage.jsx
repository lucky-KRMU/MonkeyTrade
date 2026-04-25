import React, { useEffect, useState } from 'react';
import { ArrowUpRight, PlusCircle, Loader2 } from 'lucide-react';
import { useGlobalContext } from './ThemeContext'; // Adjust path if needed

export default function DashboardPage() {
  // Pulling state and functions from the Global Context
  const { holdings, loading, fetchHoldings } = useGlobalContext();
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  // Trigger the fetch only on mount.
  // The context handles the "5-minute cache" logic internally.
  useEffect(() => {
    fetchHoldings();
  }, []);

  // Show global loading state
  if (loading && holdings.length === 0) return (
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

      {/* 2. Holdings Table */}
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
      
      {/* 3. Trade Modal */}
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