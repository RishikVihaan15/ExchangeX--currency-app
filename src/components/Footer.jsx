export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-8 pt-4 text-center text-xs text-slate-400 sm:px-6 lg:px-8 dark:text-slate-600">
      Live rates via{' '}
      <a
        href="https://frankfurter.app"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-ocean hover:underline dark:text-cyan-500"
      >
        Frankfurter API
      </a>
      . Preferences &amp; history saved locally in your browser.
    </footer>
  );
}
