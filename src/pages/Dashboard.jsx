import { useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowUpRight, FiSearch, FiTrendingUp, FiRefreshCw, FiStar, FiZap } from 'react-icons/fi';
import CurrencyCard from '../components/CurrencyCard.jsx';
import FavoriteCard from '../components/FavoriteCard.jsx';
import Loader from '../components/Loader.jsx';
import TrendChart from '../components/TrendChart.jsx';
import useCurrency from '../hooks/useCurrency.js';
import { getSevenDayHistory } from '../services/api.js';
import { formatCurrencyValue } from '../utils/formatNumber.js';

const popularPairs = [
  ['USD', 'INR'],
  ['USD', 'EUR'],
  ['USD', 'GBP'],
  ['USD', 'JPY'],
  ['USD', 'AUD'],
];

const cardColors = ['card-ocean', 'card-violet', 'card-coral', 'card-fern', 'card-gold'];

export default function Dashboard() {
  const { error, favorites, lastUpdated, loading, rates } = useCurrency();
  const [query, setQuery]   = useState('');
  const [trend, setTrend]   = useState([]);
  const [valueKey, setValueKey] = useState(0); // for re-trigger animate
  const usdInr = rates.INR ?? 85.63;
  const prevRef = useRef(usdInr);

  useEffect(() => {
    getSevenDayHistory('USD', 'INR').then(setTrend);
  }, []);

  // Trigger re-animation when rate changes
  useEffect(() => {
    if (prevRef.current !== usdInr) {
      setValueKey((k) => k + 1);
      prevRef.current = usdInr;
    }
  }, [usdInr]);

  const filteredPairs = useMemo(
    () => popularPairs.filter((pair) => pair.join(' ').toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <div className="space-y-6">
      {/* ── Hero section ── */}
      <section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Main hero card */}
        <div className="stat-card relative overflow-hidden">
          {/* decorative gradient circle */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-ocean/20 to-violet/20 blur-2xl" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight">Currency Dashboard</h1>
                <FiZap className="text-gold animate-bounce-subtle" />
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Live exchange rates, charts &amp; conversion tools.
              </p>
            </div>
            <label className="relative w-full sm:max-w-xs">
              <FiSearch className="pointer-events-none absolute left-3 top-3 text-slate-400" />
              <input
                className="input pl-9"
                placeholder="Search pair (e.g. USD EUR)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>

          {loading && <div className="mt-4"><Loader label="Fetching live rates..." /></div>}
          {error   && (
            <div className="mt-4 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">
              {error}
            </div>
          )}

          {/* Live rate hero */}
          <div className="relative mt-5 overflow-hidden rounded-xl bg-gradient-to-br from-ocean to-[#145f70] p-5 text-white shadow-glow">
            <div className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute right-12 -top-4 h-24 w-24 rounded-full bg-white/5" />
            <p className="text-sm font-medium opacity-80">USD → INR · Today's Rate</p>
            <p key={valueKey} className="mt-2 text-5xl font-black animate-value">
              {formatCurrencyValue(usdInr)}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="badge-live">● Live</span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-300">
                <FiArrowUpRight /> +0.12%
              </span>
              <span className="ml-auto text-xs opacity-60">
                {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Just now'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick convert card */}
        <div className="stat-card relative overflow-hidden">
          <div className="pointer-events-none absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-gradient-to-tr from-gold/20 to-coral/10 blur-2xl" />
          <div className="relative">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <FiZap className="text-gold" /> Quick Convert
            </h2>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">100 USD equals</p>
            <p key={`qc-${valueKey}`} className="mt-1 text-4xl font-black text-ocean dark:text-cyan-400 animate-value">
              {formatCurrencyValue(usdInr * 100)}
              <span className="ml-2 text-lg font-semibold text-slate-500">INR</span>
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {favorites.slice(0, 4).map((pair) => (
                <div
                  key={`${pair.from}-${pair.to}`}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-100/80 px-3 py-2 text-xs font-semibold dark:bg-slate-800/80"
                >
                  <FiStar className="text-gold shrink-0" fill="currentColor" size={10} />
                  {pair.from} → {pair.to}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular rates ── */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <FiTrendingUp className="text-ocean" /> Popular Rates
          </h2>
          <span className="text-xs text-slate-400">{filteredPairs.length} pairs</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {filteredPairs.map(([from, to], i) => (
            <CurrencyCard
              key={`${from}-${to}`}
              from={from}
              to={to}
              rate={from === 'USD' ? rates[to] : 0}
              accentClass={cardColors[i % cardColors.length]}
            />
          ))}
        </div>
      </section>

      {/* ── Chart + Favorites ── */}
      <section className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="panel">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <FiTrendingUp className="text-fern" /> 7-Day Trend · USD/INR
          </h2>
          <TrendChart data={trend} />
        </div>
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <FiStar className="text-gold" fill="currentColor" /> Favorites
          </h2>
          <div className="space-y-3">
            {favorites.length
              ? favorites.slice(0, 4).map((pair) => (
                  <FavoriteCard key={`${pair.from}-${pair.to}`} {...pair} />
                ))
              : (
                <div className="panel text-sm text-slate-500 dark:text-slate-400">
                  Star a currency pair to pin it here.
                </div>
              )
            }
          </div>
        </div>
      </section>
    </div>
  );
}
