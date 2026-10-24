/**
 * Currency Service using Frankfurter API (100% free, no API key required)
 * https://www.frankfurter.app/
 */

export interface ExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
}

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh' },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw' },
];

const FRANKFURTER_BASE_URL = 'https://api.frankfurter.app';

let cachedRates: ExchangeRates | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

/**
 * Fetch latest exchange rates from Frankfurter API
 */
export async function getExchangeRates(baseCurrency: string = 'KES'): Promise<ExchangeRates> {
  const now = Date.now();
  
  // Return cached rates if still valid
  if (cachedRates && cachedRates.base === baseCurrency && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    const targetCurrencies = SUPPORTED_CURRENCIES
      .filter(c => c.code !== baseCurrency)
      .map(c => c.code)
      .join(',');

    const response = await fetch(
      `${FRANKFURTER_BASE_URL}/latest?from=${baseCurrency}&to=${targetCurrencies}`
    );

    if (!response.ok) {
      throw new Error(`Currency API error: ${response.status}`);
    }

    const data = await response.json();
    cachedRates = {
      base: baseCurrency,
      date: data.date,
      rates: { [baseCurrency]: 1, ...data.rates },
    };
    cacheTimestamp = now;

    return cachedRates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    // Return fallback rates (approximate values)
    return {
      base: 'KES',
      date: new Date().toISOString().split('T')[0],
      rates: {
        KES: 1,
        USD: 0.0078,
        EUR: 0.0072,
        GBP: 0.0062,
        TZS: 19.5,
        UGX: 28.9,
        RWF: 10.2,
      },
    };
  }
}

/**
 * Convert amount from one currency to another
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) return amount;

  const rates = await getExchangeRates(fromCurrency);
  const rate = rates.rates[toCurrency];

  if (!rate) {
    throw new Error(`Unsupported currency: ${toCurrency}`);
  }

  return Math.round(amount * rate * 100) / 100;
}

/**
 * Format amount with currency symbol
 */
export function formatCurrencyAmount(amount: number, currencyCode: string): string {
  const currency = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode);
  const symbol = currency?.symbol || currencyCode;

  // Format with appropriate decimal places
  if (['KES', 'TZS', 'UGX', 'RWF'].includes(currencyCode)) {
    return `${symbol} ${Math.round(amount).toLocaleString()}`;
  }

  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Get currency info by code
 */
export function getCurrencyInfo(code: string): CurrencyInfo | undefined {
  return SUPPORTED_CURRENCIES.find(c => c.code === code);
}
