import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import DashboardPage from './DashboardPage'; // Your existing component
import PortfolioPage from './PortfolioPage';
import WatchlistPage from './WatchlistPage';
import OrdersPage from './OrdersPage';
import MarketsPage from './MarketsPage';
import SettingsPage from './SettingsPage';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            {/* This renders inside the <Outlet /> in DashboardLayout */}
            <Route index element={<DashboardPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="markets" element={<MarketsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path='settings' element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;