import { getApiBaseUrl } from '@/lib/urlUtils';
import axios from 'axios';

const client = axios.create({ baseURL: getApiBaseUrl() });

export const listProSlugsForSitemap = async (): Promise<string[]> => {
  const response = await client.get('/api/v1/pro-profile/slug', {
    params: { intent: 'sitemap' },
  });

  return response.data.items;
};
