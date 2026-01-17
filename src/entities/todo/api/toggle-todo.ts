import type { AxiosResponse } from 'axios';

import { apiClient } from '@/shared/api/api-client';

import type { TToggleTodoPayload } from '../model/api';
import type { TTodo, TTodoId } from '../model/types';

export const toggleTodo = async (
  id: TTodoId,
  payload: TToggleTodoPayload,
): Promise<TTodo> => {
  const response = await apiClient.patch<
    TTodo,
    AxiosResponse<TTodo>,
    TToggleTodoPayload
  >(`/todos/${id}/complete`, payload);

  return response.data;
};
