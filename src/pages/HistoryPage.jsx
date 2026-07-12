import { FiClock, FiTrash2 } from 'react-icons/fi';
import HistoryTable from '../components/HistoryTable.jsx';
import useCurrency from '../hooks/useCurrency.js';

export default function HistoryPage() {
  const { history } = useCurrency();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 text-white shadow-soft dark:from-slate-700 dark:to-slate-900">
            <FiClock size={18} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">History</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Every conversion is saved locally — up to 25 entries.
            </p>
          </div>
        </div>
        {history.length > 0 && (
          <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {history.length} / 25
          </span>
        )}
      </div>
      <HistoryTable rows={history} />
    </div>
  );
}
