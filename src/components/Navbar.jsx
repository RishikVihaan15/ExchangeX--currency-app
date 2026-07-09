import { NavLink } from 'react-router-dom';
import { FiRefreshCw, FiSun, FiMoon, FiDollarSign } from 'react-icons/fi';
import useCurrency from '../hooks/useCurrency.js';

const navItems = [
  { label: 'Dashboard',  to: '/' },
  { label: 'Converter',  to: '/converter' },
  { label: 'Compare',    to: '/compare' },
  { label: 'Trends',     to: '/trends' },
  { label: 'Favorites',  to: '/favorites' },
  { label: 'History',    to: '/history' },
];

export default function Navbar() {
  const { darkMode, fetchRates, lastUpdated, loading, setDarkMode } = useCurrency();

  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 shadow-soft">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-ocean to-violet text-white shadow-glow transition-transform group-hover:scale-110">
              <FiDollarSign size={16} />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-ocean to-violet bg-clip-text text-transparent">
              CurrencyX
            </span>
          </NavLink>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:inline">
              {loading
                ? <span className="animate-pulse">Fetching rates...</span>
                : lastUpdated
                  ? <span>Updated <span className="font-semibold text-ocean dark:text-cyan-400">{lastUpdated.toLocaleTimeString()}</span></span>
                  : '--'
              }
            </span>
            <button
              className="ghost-button h-9 w-9 px-0"
              onClick={() => fetchRates()}
              title="Refresh rates"
            >
              <FiRefreshCw size={15} className={loading ? 'animate-spin text-ocean' : ''} />
            </button>
            <button
              className="ghost-button h-9 w-9 px-0"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle dark mode"
            >
              {darkMode
                ? <FiSun size={15} className="text-gold" />
                : <FiMoon size={15} />
              }
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex gap-1 overflow-x-auto pb-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-xl px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-ocean to-[#2a9db5] text-white shadow-glow scale-105'
                    : 'text-slate-600 hover:bg-white/60 hover:text-ocean dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-cyan-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
