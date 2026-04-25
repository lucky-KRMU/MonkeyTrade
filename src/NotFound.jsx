import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
    useEffect(()=>{
        document.title = "MonkeyTrade - Not Found"
    },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in zoom-in duration-500">
      <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-full mb-6">
        <AlertTriangle size={48} className="text-orange-500" />
      </div>
      
      <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-2">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Page not found</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
        Oops! The page you are looking for might have been moved, deleted, or you might have mistyped the address.
      </p>
      
      <Link 
        to="/" 
        className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/20"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}