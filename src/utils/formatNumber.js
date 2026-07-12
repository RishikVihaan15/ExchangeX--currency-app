export function formatNumber(value, maximumFractionDigits = 2) {
  if (!Number.isFinite(Number(value))) return '0';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
  }).format(Number(value));
}

export function formatCurrencyValue(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return '0';
  return formatNumber(numeric, numeric >= 100 ? 2 : 4);
}
