import { ErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

// This is your clean, functional fallback UI
export default function ErrorFallback({ error, resetErrorBoundary }) {
  useEffect(()=>{
    document.title = "MonkeyTrade - Error"
  }, [])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-800 shadow-sm max-w-md w-full">
        <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
           {error}
        </p>
        <button
          onClick={()=> window.location.reload()}
          className="flex items-center justify-center gap-2 mx-auto bg-slate-900 dark:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
}