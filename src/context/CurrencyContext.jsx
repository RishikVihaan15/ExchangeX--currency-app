import { createContext, useEffect, useMemo, useState } from 'react';
import { getLatestRates } from '../services/api.js';
import { readStorage, writeStorage } from '../utils/localStorage.js';

export const CurrencyContext = createContext(null);

const initialFavorites = [
  { from: 'USD', to: 'INR' },
  { from: 'EUR', to: 'INR' },
  { from: 'GBP', to: 'INR' },
];

export function CurrencyProvider({ children }) {
  const [base, setBase] = useState('USD');
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [favorites, setFavorites] = useState(() => readStorage('currency:favorites', initialFavorites));
  const [history, setHistory] = useState(() => readStorage('currency:history', []));
  const [darkMode, setDarkMode] = useState(() => readStorage('currency:darkMode', false));

  async function fetchRates(nextBase = base) {
    setLoading(true);
    setError('');
    const latest = await getLatestRates(nextBase);
    setBase(latest.base);
    setRates(latest.rates);
    setLastUpdated(new Date());
    setLoading(false);
    setError(latest.isFallback ? 'Live rates are unavailable. Showing sample market data.' : '');
  }

  useEffect(() => {
    fetchRates('USD');
  }, []);

  useEffect(() => {
    const id = setInterval(() => fetchRates(base), 60000);
    return () => clearInterval(id);
  }, [base]);

  useEffect(() => {
    writeStorage('currency:favorites', favorites);
  }, [favorites]);

  useEffect(() => {
    writeStorage('currency:history', history);
  }, [history]);

  useEffect(() => {
    writeStorage('currency:darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  function toggleFavorite(pair) {
    setFavorites((current) => {
      const exists = current.some((item) => item.from === pair.from && item.to === pair.to);
      return exists
        ? current.filter((item) => item.from !== pair.from || item.to !== pair.to)
        : [...current, pair];
    });
  }

  function addHistory(entry) {
    setHistory((current) => [{ ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...current].slice(0, 25));
  }

  const value = useMemo(
    () => ({
      addHistory,
      base,
      darkMode,
      error,
      favorites,
      fetchRates,
      history,
      lastUpdated,
      loading,
      rates,
      setBase,
      setDarkMode,
      toggleFavorite,
    }),
    [base, darkMode, error, favorites, history, lastUpdated, loading, rates],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}
