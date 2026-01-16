import type { AxiosResponse } from 'axios';

import { apiClient } from '@/shared/api/api-client';

import type { TCreateTodoPayload } from '../model/api';
import type { TTodo } from '../model/types';

export const createTodo = async (
  payload: TCreateTodoPayload,
): Promise<TTodo> => {
  const response = await apiClient.post<
    TTodo,
    AxiosResponse<TTodo>,
    TCreateTodoPayload
  >('/todos/create', payload);

  return response.data;
};
