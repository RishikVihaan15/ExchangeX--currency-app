import { FiStar, FiTrash2, FiArrowRight } from 'react-icons/fi';
import useCurrency from '../hooks/useCurrency.js';
import { formatCurrencyValue } from '../utils/formatNumber.js';

export default function FavoriteCard({ from, to }) {
  const { rates, toggleFavorite } = useCurrency();
  const rate = rates[to] ?? 0;

  return (
    <div className="panel flex items-center justify-between gap-4 group hover:border-gold/40 hover:shadow-[0_4px_20px_rgba(246,183,60,0.15)] transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold group-hover:scale-110 transition-transform">
          <FiStar fill="currentColor" size={15} />
        </div>
        <div>
          <p className="flex items-center gap-1 font-bold text-sm">
            {from}
            <FiArrowRight size={12} className="text-slate-400" />
            {to}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            1 {from} = <span className="font-semibold text-ocean dark:text-cyan-400">{formatCurrencyValue(rate)}</span> {to}
          </p>
        </div>
      </div>
      <button
        className="ghost-button h-8 w-8 shrink-0 px-0 hover:border-coral/60 hover:text-coral dark:hover:border-coral/60 dark:hover:text-coral"
        onClick={() => toggleFavorite({ from, to })}
        title="Remove favorite"
      >
        <FiTrash2 size={14} />
      </button>
    </div>
  );
}
