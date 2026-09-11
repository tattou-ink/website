import type { Currency } from '@/lib/currencyUtils';
import { getApiBaseUrl } from '@/lib/urlUtils';
import axios from 'axios';

const client = axios.create({ baseURL: getApiBaseUrl() });

export type SubscriptionPlan = {
  id: string;
  price: number;
  currency: Currency;
  period: 'month' | 'year';
};

export const listSubscriptionPlans = async (params: {
  currency?: Currency | null;
}): Promise<SubscriptionPlan[]> => {
  const response = await client.get('/api/v1/subscription/plan', { params });

  return response.data.items;
};
