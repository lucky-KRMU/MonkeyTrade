import React, { useState } from 'react';
import { User, Shield, Bell, Moon, Save } from 'lucide-react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl font-[Inter]">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500">Manage your account preferences and security.</p>
      </div>

      {/* Profile Section */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <User size={18} className="text-orange-500" /> Profile Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input type="text" className="w-full p-2 border border-slate-300 rounded-lg" defaultValue="Lucky Pawar" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input type="email" className="w-full p-2 border border-slate-300 rounded-lg" defaultValue="lucky@example.com" />
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Moon size={18} className="text-orange-500" /> Display & Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800">Dark Mode</p>
              <p className="text-sm text-slate-500">Enable dark theme for the interface</p>
            </div>
            <ToggleSwitch enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800">Email Alerts</p>
              <p className="text-sm text-slate-500">Receive price alerts and trade updates</p>
            </div>
            <ToggleSwitch enabled={emailAlerts} onToggle={() => setEmailAlerts(!emailAlerts)} />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Shield size={18} className="text-orange-500" /> Security
        </h3>
        <button className="text-orange-600 font-medium hover:underline text-sm">Change Password</button>
      </section>

      <div className="flex justify-end">
        <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition flex items-center gap-2">
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
}

// Simple Toggle Component
function ToggleSwitch({ enabled, onToggle }) {
  return (
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-orange-500' : 'bg-slate-300'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform m-1 ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
}