import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getExchangeRates,
  convertCurrency,
  formatCurrencyAmount,
  SUPPORTED_CURRENCIES,
  CurrencyInfo,
  ExchangeRates,
} from '@ma3/shared';

interface CurrencyContextType {
  currency: string;
  currencyInfo: CurrencyInfo;
  currencies: CurrencyInfo[];
  rates: ExchangeRates | null;
  isLoading: boolean;
  setCurrency: (code: string) => Promise<void>;
  convert: (amount: number, fromCurrency?: string) => Promise<number>;
  format: (amount: number, currencyCode?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'ma3_currency';
const DEFAULT_CURRENCY = 'KES';

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<string>(DEFAULT_CURRENCY);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedCurrency();
    loadExchangeRates();
  }, []);

  const loadSavedCurrency = async () => {
    try {
      const saved = await AsyncStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && SUPPORTED_CURRENCIES.find(c => c.code === saved)) {
        setCurrencyState(saved);
      }
    } catch (error) {
      console.error('Failed to load currency:', error);
    }
  };

  const loadExchangeRates = async () => {
    try {
      setIsLoading(true);
      const exchangeRates = await getExchangeRates('KES');
      setRates(exchangeRates);
    } catch (error) {
      console.error('Failed to load exchange rates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setCurrency = async (code: string) => {
    try {
      await AsyncStorage.setItem(CURRENCY_STORAGE_KEY, code);
      setCurrencyState(code);
    } catch (error) {
      console.error('Failed to save currency:', error);
    }
  };

  const convert = async (amount: number, fromCurrency: string = 'KES'): Promise<number> => {
    if (fromCurrency === currency) return amount;
    try {
      return await convertCurrency(amount, fromCurrency, currency);
    } catch (error) {
      console.error('Conversion error:', error);
      return amount;
    }
  };

  const format = (amount: number, currencyCode?: string): string => {
    return formatCurrencyAmount(amount, currencyCode || currency);
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
