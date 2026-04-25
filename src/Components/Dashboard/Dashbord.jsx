import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, ArrowDownRight, RefreshCw, PlusCircle } from 'lucide-react';

const holdingsData = [
  { symbol: 'AAPL', shares: 50, avgCost: 150.00, currentPrice: 175.24, pl: 1262.00 },
  { symbol: 'TSLA', shares: 20, avgCost: 250.00, currentPrice: 238.45, pl: -231.00 },
  { symbol: 'NVDA', shares: 10, avgCost: 400.00, currentPrice: 485.30, pl: 853.00 },
];

export default function DashboardPage() {
  const [autoRebalance, setAutoRebalance] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      {/* 1. Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Total Portfolio</p>
          <h2 className="text-2xl font-bold text-slate-900">$124,500.20</h2>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Daily P/L</p>
          <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            +$1,240.50 <ArrowUpRight size={20} />
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800">Auto Rebalance</p>
            <p className="text-xs text-slate-400">Manage assets automatically</p>
          </div>
          <button 
            onClick={() => setAutoRebalance(!autoRebalance)}
            className={`w-12 h-6 rounded-full transition-colors ${autoRebalance ? 'bg-orange-500' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform m-1 ${autoRebalance ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* 2. Holdings Table & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Your Holdings</h3>
            <button 
              onClick={() => setIsTradeModalOpen(true)}
              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              <PlusCircle size={16} /> Place Trade
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm">
                <th className="pb-3">Ticker</th>
                <th className="pb-3">Shares</th>
                <th className="pb-3">Value</th>
                <th className="pb-3">P/L</th>
              </tr>
            </thead>
            <tbody>
              {holdingsData.map(h => (
                <tr key={h.symbol} className="border-t border-slate-100">
                  <td className="py-4 font-bold text-slate-800">{h.symbol}</td>
                  <td className="py-4 text-slate-600">{h.shares}</td>
                  <td className="py-4 text-slate-600">${(h.currentPrice * h.shares).toLocaleString()}</td>
                  <td className={`py-4 font-medium ${h.pl >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {h.pl >= 0 ? '+' : ''}${h.pl.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Insights Widget */}
        <div className="bg-slate-900 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center gap-2 text-orange-400 mb-4">
            <Sparkles size={20} />
            <h3 className="font-bold">AI Market Insights</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Our model detected high volatility in the Tech sector. We suggest rebalancing your AAPL and NVDA positions to lock in gains.
          </p>
          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm font-medium transition">
            Apply Rebalance Strategy
          </button>
        </div>
      </div>

      {/* 3. Simple Trade Modal */}
      {isTradeModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl w-full max-w-sm shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Place Trade</h2>
            <input type="text" placeholder="Ticker (e.g. AAPL)" className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-orange-500 outline-none" />
            <div className="flex gap-4">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition">BUY</button>
              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition">SELL</button>
            </div>
            <button onClick={() => setIsTradeModalOpen(false)} className="mt-4 w-full text-slate-400 text-sm hover:text-slate-600">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}