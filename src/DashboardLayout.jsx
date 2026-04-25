import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Search, Bell } from 'lucide-react';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-6">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden"><Menu size={24} /></button>
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-md w-64 focus:ring-2 focus:ring-orange-500 outline-none" />
          </div>
          <Bell size={20} className="text-slate-500" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}