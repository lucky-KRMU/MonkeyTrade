import React from 'react';
import { TrendingUp, TrendingDown, Activity, Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const gainers = [
  { symbol: 'NVDA', price: 485.30, change: 5.2 },
  { symbol: 'AMD', price: 165.20, change: 4.8 },
  { symbol: 'PLTR', price: 22.45, change: 3.9 },
];

const losers = [
  { symbol: 'TSLA', price: 238.45, change: -2.1 },
  { symbol: 'META', price: 395.10, change: -1.8 },
  { symbol: 'NFLX', price: 540.20, change: -1.5 },
];

export default function MarketsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-[Inter]">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Markets</h2>
        <p className="text-slate-500">Global market overview and top movers</p>
      </div>

      {/* 1. Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <IndexCard name="S&P 500" value="5,120.40" change="+0.45%" positive />
        <IndexCard name="Nasdaq" value="16,050.20" change="+0.82%" positive />
        <IndexCard name="Dow Jones" value="38,900.50" change="-0.12%" negative />
      </div>

      {/* 2. Top Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-green-600 mb-4 flex items-center gap-2">
            <TrendingUp size={20} /> Top Gainers
          </h3>
          <table className="w-full text-left text-sm">
            <tbody>
              {gainers.map((s) => (
                <tr key={s.symbol} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 font-bold">{s.symbol}</td>
                  <td className="py-3 text-slate-600">${s.price.toFixed(2)}</td>
                  <td className="py-3 text-right text-green-600 font-bold">+{s.change}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-red-500 mb-4 flex items-center gap-2">
            <TrendingDown size={20} /> Top Losers
          </h3>
          <table className="w-full text-left text-sm">
            <tbody>
              {losers.map((s) => (
                <tr key={s.symbol} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 font-bold">{s.symbol}</td>
                  <td className="py-3 text-slate-600">${s.price.toFixed(2)}</td>
                  <td className="py-3 text-right text-red-500 font-bold">{s.change}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function IndexCard({ name, value, change, positive }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start">
        <span className="text-sm text-slate-500 font-medium">{name}</span>
        <Activity size={16} className="text-slate-300" />
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <span className={`text-sm font-medium flex items-center gap-1 ${positive ? 'text-green-600' : 'text-red-500'}`}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {change}
        </span>
      </div>
    </div>
  );
}