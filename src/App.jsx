import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import DashboardPage from './DashboardPage';
import PortfolioPage from './PortfolioPage';
import WatchlistPage from './WatchlistPage';
import OrdersPage from './OrdersPage';
import MarketsPage from './MarketsPage';
import SettingsPage from './SettingsPage';
// Update this import to reflect your file name
import { GlobalProvider } from './ThemeContext'; 
import ErrorFallback from './ErrorBoundry';
import { ErrorBoundary } from 'react-error-boundary';
import NotFoundPage from './NotFound';

function App() {
  return (
    // Change <useGlobalContext> to <GlobalProvider>
    <GlobalProvider>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-[Inter]">
        <ErrorBoundary fallback={<ErrorFallback/>}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} errorElement={<ErrorFallback />} />
                <Route path="portfolio" element={<PortfolioPage />} errorElement={<ErrorFallback />} />
                <Route path="watchlist" element={<WatchlistPage />} errorElement={<ErrorFallback />} />
                <Route path="markets" element={<MarketsPage />} errorElement={<ErrorFallback />} />
                <Route path="orders" element={<OrdersPage />} errorElement={<ErrorFallback />} />
                <Route path='settings' element={<SettingsPage />} errorElement={<ErrorFallback />} />
                <Route path='*' element={<NotFoundPage/>} errorElement={<ErrorFallback/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </div>
    </GlobalProvider>
  );
}

export default App;