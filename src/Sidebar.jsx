import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, Eye, TrendingUp, History, Settings, X } from 'lucide-react';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Portfolio', path: '/portfolio', icon: PieChart },
    { name: 'Watchlist', path: '/watchlist', icon: Eye },
    { name: 'Markets', path: '/markets', icon: TrendingUp },
    { name: 'Orders', path: '/orders', icon: History },
  ];

  return (
    <aside className={`bg-slate-900 text-white w-64 h-screen fixed md:static z-20 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0`}>
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wider text-orange-500 font-rubik">MONKEYTRADE</h1>
        <button onClick={toggleSidebar} className="md:hidden"><X size={20} /></button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink key={item.name} to={item.path} className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? 'bg-slate-800 border-l-4 border-orange-500' : 'hover:bg-slate-800'}`}>
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <NavLink to="/settings" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg"><Settings size={20} /><span>Settings</span></NavLink>
      </div>
    </aside>
  );
}