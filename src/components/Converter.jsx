import { useMemo, useState, useRef } from 'react';
import { FiRepeat, FiArrowRight } from 'react-icons/fi';
import { convertCurrency, currencies } from '../services/api.js';
import { formatCurrencyValue, formatNumber } from '../utils/formatNumber.js';
import useCurrency from '../hooks/useCurrency.js';

export default function Converter() {
  const { addHistory, rates } = useCurrency();
  const [amount, setAmount]   = useState(100);
  const [from, setFrom]       = useState('USD');
  const [to, setTo]           = useState('INR');
  const [result, setResult]   = useState(8563);
  const [rate, setRate]       = useState(85.63);
  const [working, setWorking] = useState(false);
  const [resultKey, setResultKey] = useState(0);
  const [swapAnim, setSwapAnim]   = useState(false);

  const available = useMemo(
    () => Array.from(new Set([...currencies, ...Object.keys(rates)])).sort(),
    [rates],
  );

  async function handleConvert(event) {
    event?.preventDefault();
    setWorking(true);
    const converted = await convertCurrency(amount, from, to);
    setResult(converted.amount);
    setRate(converted.rate);
    setResultKey((k) => k + 1);
    addHistory({ amount: Number(amount), from, to, result: converted.amount, rate: converted.rate });
    setWorking(false);
  }

  function swapCurrencies() {
    setSwapAnim(true);
    setTimeout(() => setSwapAnim(false), 400);
    setFrom(to);
    setTo(from);
  }

  return (
    <form className="panel space-y-5" onSubmit={handleConvert}>
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <label className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Amount</span>
          <input
            className="input text-lg font-bold"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <CurrencySelect label="From" value={from} onChange={setFrom} options={available} />
        <CurrencySelect label="To"   value={to}   onChange={setTo}   options={available} />
        <button
          className="ghost-button h-10 w-10 px-0 md:mb-0 swap-spin"
          type="button"
          onClick={swapCurrencies}
          title="Swap currencies"
          style={{ transform: swapAnim ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
        >
          <FiRepeat size={16} />
        </button>
      </div>

      <button className="button w-full sm:w-auto" disabled={working} type="submit">
        {working ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Converting...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Convert <FiArrowRight />
          </span>
        )}
      </button>

      {/* Result panel */}
      <div key={resultKey} className="relative overflow-hidden rounded-xl bg-gradient-to-br from-ocean/10 to-violet/10 p-5 border border-ocean/20 animate-value dark:from-ocean/20 dark:to-violet/20">
        <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-ocean/10 blur-xl" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {formatNumber(amount)} <span className="font-bold text-ocean">{from}</span>
        </p>
        <div className="mt-2 flex flex-wrap items-end gap-3">
          <p className="text-4xl font-black tabular-nums">
            {formatCurrencyValue(result)}
          </p>
          <span className="mb-1 text-xl font-bold text-ocean dark:text-cyan-400">{to}</span>
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
          1 {from} = <span className="text-ocean dark:text-cyan-400">{formatCurrencyValue(rate)}</span> {to}
        </p>
      </div>
    </form>
  );
}

function CurrencySelect({ label, value, onChange, options }) {
  return (
    <label className="space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span>
      <select className="input font-semibold" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </label>
  );
}
