import { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext.jsx';

export default function useCurrency() {
  const value = useContext(CurrencyContext);
  if (!value) {
    throw new Error('useCurrency must be used inside CurrencyProvider');
  }
  return value;
}
