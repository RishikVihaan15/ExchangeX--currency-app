import { FiRepeat } from 'react-icons/fi';
import Converter from '../components/Converter.jsx';

export default function ConverterPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-ocean to-violet text-white shadow-glow">
          <FiRepeat size={18} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">Converter</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Convert any amount — results are saved to your history.
          </p>
        </div>
      </div>
      <Converter />
    </div>
  );
}
