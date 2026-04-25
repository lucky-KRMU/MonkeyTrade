import React, { useState } from 'react';
import { 
  LayoutDashboard, PieChart, Eye, TrendingUp, History, 
  Settings, X, Menu, Search, Bell 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Portfolio', icon: PieChart },
  { name: 'Watchlist', icon: Eye },
  { name: 'Markets', icon: TrendingUp },
  { name: 'Orders', icon: History },
];

export default function Dashboard({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className={`bg-slate-900 text-white w-64 shrink-0 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0 fixed md:static h-full z-20`}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wider text-orange-500 cursor-pointer">MONKEYTRADE</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden"><X size={20} /></button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <a key={item.name} href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition">
              <item.icon size={20} />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden"><Menu size={24} /></button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search tickers (e.g. AAPL)..." 
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-medium text-slate-600">Market Open</span>
            </div>
            
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-400">Buying Power</p>
              <p className="font-bold text-slate-800">$24,500.00</p>
            </div>
            
            <button className="text-slate-500 hover:text-slate-800"><Bell size={20} /></button>
          </div>
        </header>
      </div>
    </div>
  );
}