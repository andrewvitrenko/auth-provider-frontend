import { apiClient } from '@/shared/api/api-client';
import type { TPaginatedResponse } from '@/shared/model/api';

import type { TTodo } from '../model/types';

export const getTodos = async (
  search: string,
  page: number = 1,
  limit: number = 10,
  signal?: AbortSignal,
): Promise<TPaginatedResponse<TTodo>> => {
  const response = await apiClient.get<TPaginatedResponse<TTodo>>('/todos', {
    params: { search, page, limit },
    signal,
  });

  return response.data;
};
