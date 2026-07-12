import { FiStar } from 'react-icons/fi';
import { formatCurrencyValue } from '../utils/formatNumber.js';
import useCurrency from '../hooks/useCurrency.js';

export default function CurrencyCard({ from, to, rate, showFavorite = true, accentClass = '' }) {
  const { favorites, toggleFavorite } = useCurrency();
  const starred = favorites.some((item) => item.from === from && item.to === to);

  return (
    <div className={`panel cursor-default group ${accentClass}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 group-hover:text-ocean dark:group-hover:text-cyan-400 transition-colors">
            {from}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-500 dark:text-slate-400">
            → {to}
          </p>
          <p className="mt-2 text-2xl font-extrabold tabular-nums tracking-tight group-hover:text-ocean dark:group-hover:text-cyan-300 transition-colors">
            {rate ? formatCurrencyValue(rate) : '—'}
          </p>
        </div>
        {showFavorite && (
          <button
            className={`mt-0.5 h-8 w-8 shrink-0 rounded-lg border text-base transition-all duration-200 hover:scale-110 active:scale-95 ${
              starred
                ? 'border-gold bg-gold/15 text-gold shadow-sm'
                : 'border-slate-200 text-slate-400 hover:border-gold hover:text-gold dark:border-slate-700'
            }`}
            onClick={() => toggleFavorite({ from, to })}
            title={starred ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiStar className="mx-auto" fill={starred ? 'currentColor' : 'none'} size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
