import React, { useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { useGlobalContext } from './ThemeContext';

export default function WatchlistPage() {
  const { visibleWatchlist, loadMore, hasMore } = useGlobalContext();

  useEffect(() => {
    if (visibleWatchlist.length === 0) {
      loadMore();
    }
    document.title = "MonkeyTrade - Watchlist"
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Watchlist</h2>
        <p className="text-slate-500 dark:text-slate-400">Monitor your favorite assets</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
            <tr className="text-slate-400 text-sm">
              <th className="px-6 py-4">Ticker</th>
              <th className="px-6 py-4">Last Price</th>
              <th className="px-6 py-4">24h Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {visibleWatchlist.map((stock, index) => (
              <tr key={`${stock.symbol}-${index}`} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{stock.symbol}</td>
                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">${stock.price.toFixed(2)}</td>
                <td className={`px-6 py-4 font-medium flex items-center gap-1 ${stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  {stock.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {Math.abs(stock.change).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {hasMore && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-center">
            <button 
              onClick={loadMore}
              className="flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600 transition"
            >
              <Plus size={16} /> Load More Stocks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}