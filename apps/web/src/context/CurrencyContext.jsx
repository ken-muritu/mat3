import { createContext, useContext, useState, useEffect } from 'react';

const FRANKFURTER_BASE_URL = 'https://api.frankfurter.app';

const SUPPORTED_CURRENCIES = [
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh' },
];

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState('KES');
  const [rates, setRates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('ma3_currency');
    if (saved && SUPPORTED_CURRENCIES.find(c => c.code === saved)) {
      setCurrencyState(saved);
    }
    loadExchangeRates();
  }, []);

  const loadExchangeRates = async () => {
    try {
      setIsLoading(true);
      const targetCurrencies = SUPPORTED_CURRENCIES
        .filter(c => c.code !== 'KES')
        .map(c => c.code)
        .join(',');

      const response = await fetch(
        `${FRANKFURTER_BASE_URL}/latest?from=KES&to=${targetCurrencies}`
      );

      if (response.ok) {
        const data = await response.json();
        setRates({
          base: 'KES',
          date: data.date,
          rates: { KES: 1, ...data.rates },
        });
      }
    } catch (error) {
      console.error('Failed to load exchange rates:', error);
      // Fallback rates
      setRates({
        base: 'KES',
        date: new Date().toISOString().split('T')[0],
        rates: { KES: 1, USD: 0.0078, EUR: 0.0072, GBP: 0.0062, TZS: 19.5, UGX: 28.9 },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setCurrency = (code) => {
    localStorage.setItem('ma3_currency', code);
    setCurrencyState(code);
  };

  const convert = (amount, fromCurrency = 'KES') => {
    if (fromCurrency === currency || !rates) return amount;
    const fromRate = rates.rates[fromCurrency] || 1;
    const toRate = rates.rates[currency] || 1;
    return Math.round((amount / fromRate) * toRate * 100) / 100;
  };

  const format = (amount, currencyCode = null) => {
    const code = currencyCode || currency;
    const currencyInfo = SUPPORTED_CURRENCIES.find(c => c.code === code);
    const symbol = currencyInfo?.symbol || code;

    if (['KES', 'TZS', 'UGX'].includes(code)) {
      return `${symbol} ${Math.round(amount).toLocaleString()}`;
    }
    return `${symbol}${amount.toFixed(2)}`;
  };

  const currencyInfo = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencyInfo,
        currencies: SUPPORTED_CURRENCIES,
        rates,
        isLoading,
        setCurrency,
        convert,
        format,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
