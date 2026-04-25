import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import DashboardPage from './DashboardPage'; // Your existing component
import PortfolioPage from './PortfolioPage';
import WatchlistPage from './WatchlistPage';
import OrdersPage from './OrdersPage';
import MarketsPage from './MarketsPage';
import SettingsPage from './SettingsPage';
import { ThemeProvider } from './ThemeContext';

// function App() {
//   return (
//     <ThemeProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<DashboardLayout />}>
//             {/* This renders inside the <Outlet /> in DashboardLayout */}
//             <Route index element={<DashboardPage />} />
//             <Route path="portfolio" element={<PortfolioPage />} />
//             <Route path="watchlist" element={<WatchlistPage />} />
//             <Route path="markets" element={<MarketsPage />} />
//             <Route path="orders" element={<OrdersPage />} />
//             <Route path='settings' element={<SettingsPage />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </ThemeProvider>
//   );
// }

function App() {
  return (
    <ThemeProvider>
      {/* This wrapper is the secret sauce: 
        1. bg-white: Default background
        2. dark:bg-slate-950: Background when 'dark' class exists on <html>
        3. text-slate-900 / dark:text-slate-100: Standardized text color
        4. transition-colors: Makes the toggle feel smooth
      */}
      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-[Inter]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="watchlist" element={<WatchlistPage />} />
              <Route path="markets" element={<MarketsPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path='settings' element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;