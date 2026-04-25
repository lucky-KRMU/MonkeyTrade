import React, { useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { useGlobalContext } from './ThemeContext';

export default function MarketsPage() {
  const { marketMovers, fetchMarketData } = useGlobalContext();

  useEffect(() => {
    fetchMarketData();
    document.title = "MonkeyTrade - Markets"
  }, []);

  if (marketMovers.loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Markets</h2>
        <p className="text-slate-500 dark:text-slate-400">Global market overview and top movers</p>
      </div>

      {/* 2. Top Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gainers Table */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
            <TrendingUp size={20} /> Top Gainers
          </h3>
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {marketMovers.gainers.map((s) => (
                <tr key={s.symbol}>
                  <td className="py-3 font-bold text-slate-900 dark:text-white">{s.symbol}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">${s.price.toFixed(2)}</td>
                  <td className="py-3 text-right text-green-600 dark:text-green-400 font-bold">+{s.change.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Losers Table */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-red-500 dark:text-red-400 mb-4 flex items-center gap-2">
            <TrendingDown size={20} /> Top Losers
          </h3>
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {marketMovers.losers.map((s) => (
                <tr key={s.symbol}>
                  <td className="py-3 font-bold text-slate-900 dark:text-white">{s.symbol}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">${s.price.toFixed(2)}</td>
                  <td className="py-3 text-right text-red-500 dark:text-red-400 font-bold">{s.change.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}