export default function Loader({ label = 'Loading rates...' }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ocean/20 bg-gradient-to-r from-ocean/10 to-violet/10 px-4 py-3 text-sm font-semibold text-ocean backdrop-blur-sm dark:text-cyan-300">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ocean border-t-transparent dark:border-cyan-400 dark:border-t-transparent" />
      <span className="animate-pulse">{label}</span>
    </div>
  );
}
