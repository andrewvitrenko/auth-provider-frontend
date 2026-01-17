import type { AxiosResponse } from 'axios';

import { apiClient } from '@/shared/api/api-client';

import type { TUpdateTodoPayload } from '../model/api';
import type { TTodo, TTodoId } from '../model/types';

export const updateTodo = async (
  id: TTodoId,
  payload: TUpdateTodoPayload,
): Promise<TTodo> => {
  const response = await apiClient.patch<
    TTodo,
    AxiosResponse<TTodo>,
    TUpdateTodoPayload
  >(`/todos/${id}`, payload);

  return response.data;
};
