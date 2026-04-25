import React, { useEffect, useState } from 'react';
import { User, Shield, Bell, Moon, Save, Mail, Lock } from 'lucide-react';
import { useGlobalContext } from './ThemeContext'; // Ensure this matches your file path

export default function SettingsPage() {
  useEffect(()=>{
    document.title = "MonkeyTrade - Settings"
  }, [])
  const { theme, toggleTheme } = useGlobalContext();
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="max-w-4xl animate-in fade-in duration-500 space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400">Manage your account preferences and security.</p>
      </div>

      {/* 1. Profile Section */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <User size={18} className="text-orange-500" /> Profile Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input type="text" className="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500" defaultValue="Rajesh Mehta" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input type="email" className="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500" defaultValue="rajeshmehta@gmail.com" />
          </div>
        </div>
      </section>

      {/* 2. Preferences Section */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Moon size={18} className="text-orange-500" /> Display & Notifications
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">Dark Mode</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Enable dark theme for the interface</p>
            </div>
            <ToggleSwitch enabled={theme === 'dark'} onToggle={toggleTheme} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">Email Alerts</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Receive price alerts and trade updates</p>
            </div>
            <ToggleSwitch enabled={emailAlerts} onToggle={() => setEmailAlerts(!emailAlerts)} />
          </div>
        </div>
      </section>

      {/* 3. Security Section */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Shield size={18} className="text-orange-500" /> Security
        </h3>
        <button className="flex items-center gap-2 text-orange-600 hover:text-orange-500 font-medium transition text-sm">
          <Lock size={16} /> Change Password
        </button>
      </section>

      {/* Action Button */}
      <div className="flex justify-end">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2">
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
}

// Reusable Toggle Component
function ToggleSwitch({ enabled, onToggle }) {
  return (
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-600'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${enabled ? 'left-7' : 'left-1'}`} />
    </button>
  );
}