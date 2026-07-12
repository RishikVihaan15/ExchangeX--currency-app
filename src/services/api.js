import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.frankfurter.app',
  timeout: 10000,
});

const fallbackRates = {
  USD: 1,
  INR: 85.63,
  EUR: 0.856,
  GBP: 0.731,
  JPY: 145.83,
  AUD: 1.534,
  CAD: 1.362,
  AED: 3.6725,
};

export const currencies = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'AED'];

export async function getLatestRates(base = 'USD') {
  try {
    const { data } = await api.get('/latest', { params: { from: base } });
    return {
      base: data.base,
      date: data.date,
      rates: { [data.base]: 1, ...data.rates },
      isFallback: false,
    };
  } catch {
    return buildFallback(base);
  }
}

export async function convertCurrency(amount, from, to) {
  const latest = await getLatestRates(from);
  const rate = latest.rates[to] ?? 0;
  return {
    amount: Number(amount) * rate,
    rate,
    date: latest.date,
    isFallback: latest.isFallback,
  };
}

export async function getSevenDayHistory(from = 'USD', to = 'INR') {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 7);

  try {
    const { data } = await api.get(`/${formatDate(start)}..${formatDate(end)}`, {
      params: { from, to },
    });

    return Object.entries(data.rates).map(([date, value]) => ({
      date,
      rate: Number(value[to]),
    }));
  } catch {
    return [86.1, 85.9, 85.8, 85.7, 85.6, 85.7, 85.63].map((rate, index) => ({
      date: formatDate(new Date(Date.now() - (6 - index) * 86400000)),
      rate,
    }));
  }
}

function buildFallback(base) {
  const baseRate = fallbackRates[base] ?? 1;
  const rates = Object.fromEntries(
    Object.entries(fallbackRates).map(([currency, rate]) => [currency, rate / baseRate]),
  );

  return {
    base,
    date: formatDate(new Date()),
    rates,
    isFallback: true,
  };
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}
