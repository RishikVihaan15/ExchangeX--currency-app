import { FiStar, FiInfo } from 'react-icons/fi';
import FavoriteCard from '../components/FavoriteCard.jsx';
import useCurrency from '../hooks/useCurrency.js';

export default function FavoritesPage() {
  const { favorites } = useCurrency();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-coral text-white shadow-[0_0_30px_rgba(246,183,60,0.3)]">
          <FiStar size={18} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">Favorites</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Star any currency pair to pin it here.
          </p>
        </div>
      </div>

      {favorites.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {favorites.map((pair) => (
            <FavoriteCard key={`${pair.from}-${pair.to}`} {...pair} />
          ))}
        </div>
      ) : (
        <div className="panel flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <FiInfo className="text-ocean shrink-0" size={18} />
          No favorite pairs yet. Click the ★ on any currency card to add one.
        </div>
      )}
    </div>
  );
}
