import { Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import ComparePage from './pages/ComparePage.jsx';
import ConverterPage from './pages/ConverterPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import TrendsPage from './pages/TrendsPage.jsx';

export default function App() {
  return (
    <div className="relative min-h-screen bg-animated text-ink transition-colors dark:text-slate-100">
      {/* Floating background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Content layer */}
      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/"          element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="/converter" element={<PageWrapper><ConverterPage /></PageWrapper>} />
            <Route path="/compare"   element={<PageWrapper><ComparePage /></PageWrapper>} />
            <Route path="/trends"    element={<PageWrapper><TrendsPage /></PageWrapper>} />
            <Route path="/favorites" element={<PageWrapper><FavoritesPage /></PageWrapper>} />
            <Route path="/history"   element={<PageWrapper><HistoryPage /></PageWrapper>} />
            <Route path="*"          element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function PageWrapper({ children }) {
  return <div className="page-enter">{children}</div>;
}
