import React from 'react';
import { PieChart, Briefcase, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const portfolioData = {
  totalEquity: 124500.20,
  dayGain: 1240.50,
  dayGainPercent: 1.01,
  totalReturn: 14500.00,
  allocation: [
    { sector: 'Technology', percentage: 65, color: 'bg-orange-500' },
    { sector: 'Energy', percentage: 20, color: 'bg-green-500' },
    { sector: 'Finance', percentage: 15, color: 'bg-slate-600' },
  ]
};

const holdings = [
  { symbol: 'AAPL', shares: 50, marketValue: 8762.00, gain: 1262.00 },
  { symbol: 'TSLA', shares: 20, marketValue: 4769.00, gain: -231.00 },
  { symbol: 'NVDA', shares: 10, marketValue: 4853.00, gain: 853.00 },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Portfolio Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio Overview</h2>
          <p className="text-slate-500 dark:text-slate-400">Track your assets and performance</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400 dark:text-slate-500">Total Equity</p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">${portfolioData.totalEquity.toLocaleString()}</h1>
        </div>
      </div>

      {/* 2. Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Day's Gain" value={`+$${portfolioData.dayGain}`} trend="+1.01%" positive />
        <MetricCard title="Total Return" value={`+$${portfolioData.totalReturn}`} trend="+12.2%" positive />
        <MetricCard title="Buying Power" value="$24,500" />
        <MetricCard title="Dividend Yield" value="2.4%" />
      </div>

      {/* 3. Allocation & Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sector Allocation */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <PieChart size={18} className="text-orange-500" /> Asset Allocation
          </h3>
          <div className="space-y-4">
            {portfolioData.allocation.map((item) => (
              <div key={item.sector}>
                <div className="flex justify-between text-sm mb-1 text-slate-700 dark:text-slate-300">
                  <span>{item.sector}</span>
                  <span className="font-medium">{item.percentage}%</span>
                </div>
                {/* Progress Bar Background */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Holdings Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Briefcase size={18} className="text-orange-500" /> Current Holdings
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-3">Symbol</th>
                  <th className="pb-3 text-right">Shares</th>
                  <th className="pb-3 text-right">Market Value</th>
                  <th className="pb-3 text-right">Total P/L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {holdings.map((h) => (
                  <tr key={h.symbol} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <td className="py-4 font-bold text-slate-900 dark:text-white">{h.symbol}</td>
                    <td className="py-4 text-right text-slate-600 dark:text-slate-300">{h.shares}</td>
                    <td className="py-4 text-right font-medium text-slate-900 dark:text-white">${h.marketValue.toLocaleString()}</td>
                    <td className={`py-4 text-right font-bold ${h.gain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {h.gain >= 0 ? '+' : ''}{h.gain.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Optimized Sub-component
function MetricCard({ title, value, trend, positive }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{title}</p>
      <div className="flex items-end justify-between mt-1">
        <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
        {trend && (
          <span className={`text-xs flex items-center font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>
            {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {trend}
          </span>
        )}
      </div>
    </div>
  );
}