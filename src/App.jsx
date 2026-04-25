import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import DashboardPage from './DashboardPage'; // Your existing component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* This renders inside the <Outlet /> in DashboardLayout */}
          <Route index element={<DashboardPage />} />
          <Route path="portfolio" element={<div>Portfolio Page Coming Soon</div>} />
          <Route path="markets" element={<div>Markets Page Coming Soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;