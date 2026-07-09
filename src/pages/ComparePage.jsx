import { useMemo, useState } from 'react';
import { FiBarChart2 } from 'react-icons/fi';
import CompareCard from '../components/CompareCard.jsx';
import useCurrency from '../hooks/useCurrency.js';

const targets = ['INR', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

export default function ComparePage() {
  const { rates } = useCurrency();
  const [amount, setAmount] = useState(100);

  const values = useMemo(
    () => targets.map((currency) => ({ currency, value: Number(amount) * (rates[currency] ?? 0) })),
    [amount, rates],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-coral text-white shadow-glow-violet">
            <FiBarChart2 size={18} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">Compare</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              See how one USD amount spans multiple currencies.
            </p>
          </div>
        </div>
        <label className="w-full max-w-xs space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">USD Amount</span>
          <input
            className="input text-lg font-bold"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((item, i) => (
          <CompareCard key={item.currency} amount={amount} index={i} {...item} />
        ))}
      </div>
    </div>
  );
}
