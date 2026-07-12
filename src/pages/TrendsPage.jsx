import { useEffect, useState } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import TrendChart from '../components/TrendChart.jsx';
import { currencies, getSevenDayHistory } from '../services/api.js';

export default function TrendsPage() {
  const [from, setFrom]       = useState('USD');
  const [to, setTo]           = useState('INR');
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSevenDayHistory(from, to).then((history) => {
      setData(history);
      setLoading(false);
    });
  }, [from, to]);

  const min = data.length ? Math.min(...data.map((d) => d.rate)).toFixed(4) : '—';
  const max = data.length ? Math.max(...data.map((d) => d.rate)).toFixed(4) : '—';
  const avg = data.length ? (data.reduce((s, d) => s + d.rate, 0) / data.length).toFixed(4) : '—';

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fern to-ocean text-white shadow-glow">
          <FiTrendingUp size={18} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">Trends</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">7-day exchange rate movement.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="panel">
        <div className="grid gap-4 sm:grid-cols-2 lg:max-w-sm">
          <CurrencySelect label="From" value={from} onChange={setFrom} />
          <CurrencySelect label="To"   value={to}   onChange={setTo} />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Low',  value: min, color: 'text-coral' },
          { label: 'Avg',  value: avg, color: 'text-gold' },
          { label: 'High', value: max, color: 'text-fern' },
        ].map((s) => (
          <div key={s.label} className="panel text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{s.label}</p>
            <p className={`mt-1 text-2xl font-extrabold tabular-nums ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="panel">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">
            {from} <span className="text-slate-400">→</span> {to}
          </h2>
          <span className="text-sm text-slate-400">
            {loading ? <span className="animate-pulse">Loading...</span> : 'Last 7 Days'}
          </span>
        </div>
        <TrendChart data={data} />
      </div>

      {/* Daily cards */}
      <div className="grid gap-3 grid-cols-4 sm:grid-cols-7">
        {data.map((item, i) => (
          <div
            key={item.date}
            className="panel-static rounded-xl bg-white/70 p-3 text-center backdrop-blur-sm dark:bg-slate-900/70"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <p className="text-xs font-semibold text-slate-400">{item.date.slice(5)}</p>
            <p className="mt-1 text-sm font-extrabold tabular-nums">{item.rate.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CurrencySelect({ label, value, onChange }) {
  return (
    <label className="space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span>
      <select className="input font-semibold" value={value} onChange={(e) => onChange(e.target.value)}>
        {currencies.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </label>
  );
}
