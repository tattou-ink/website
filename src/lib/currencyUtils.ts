export type Currency =
  | 'EUR'
  | 'USD'
  | 'CAD'
  | 'AUD'
  | 'NZD'
  | 'GBP'
  | 'NOK'
  | 'SEK'
  | 'DKK'
  | 'CHF';

export const AVAILABLE_CURRENCIES: {
  label: string;
  value: Currency;
  symbol: string;
  shortSymbol: string;
}[] = [
  { label: 'USD', value: 'USD', symbol: 'US$', shortSymbol: '$' },
  { label: 'EUR', value: 'EUR', symbol: '€', shortSymbol: '€' },
  { label: 'CAD', value: 'CAD', symbol: 'C$', shortSymbol: '$' },
  { label: 'AUD', value: 'AUD', symbol: 'A$', shortSymbol: '$' },
  { label: 'NZD', value: 'NZD', symbol: '$NZ', shortSymbol: '$' },
  { label: 'GBP', value: 'GBP', symbol: '£', shortSymbol: '£' },
  { label: 'NOK', value: 'NOK', symbol: 'kr', shortSymbol: 'kr' },
  { label: 'DKK', value: 'DKK', symbol: 'kr', shortSymbol: 'kr' },
  { label: 'SEK', value: 'SEK', symbol: 'kr', shortSymbol: 'kr' },
  { label: 'CHF', value: 'CHF', symbol: 'CHF', shortSymbol: 'fr' },
];

