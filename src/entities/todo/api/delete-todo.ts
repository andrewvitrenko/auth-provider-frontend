import { apiClient } from '@/shared/api/api-client';

import type { TTodo, TTodoId } from '../model/types';

export const deleteTodo = async (id: TTodoId): Promise<TTodo> => {
  const response = await apiClient.delete<TTodo>(`/todos/${id}`);

  return response.data;
};
