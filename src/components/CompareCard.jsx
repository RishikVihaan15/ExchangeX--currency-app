import { formatCurrencyValue } from '../utils/formatNumber.js';

const gradients = [
  'from-ocean/10 to-[#2a9db5]/10 border-ocean/30',
  'from-violet/10 to-purple-400/10 border-violet/30',
  'from-coral/10 to-rose-400/10 border-coral/30',
  'from-fern/10 to-emerald-400/10 border-fern/30',
  'from-gold/10 to-amber-300/10 border-gold/30',
  'from-cyan-500/10 to-sky-400/10 border-cyan-400/30',
];

const textColors = [
  'text-ocean dark:text-cyan-400',
  'text-violet dark:text-purple-400',
  'text-coral dark:text-rose-400',
  'text-fern dark:text-emerald-400',
  'text-gold dark:text-amber-400',
  'text-cyan-600 dark:text-cyan-400',
];

export default function CompareCard({ amount, currency, value, index = 0 }) {
  const grad = gradients[index % gradients.length];
  const text = textColors[index % textColors.length];

  return (
    <div className={`panel relative overflow-hidden bg-gradient-to-br ${grad} border`}>
      <div className="pointer-events-none absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-white/20 blur-xl" />
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{currency}</p>
      <p className={`mt-2 text-3xl font-black tabular-nums ${text}`}>{formatCurrencyValue(value)}</p>
      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">From {amount} USD</p>
    </div>
  );
}
