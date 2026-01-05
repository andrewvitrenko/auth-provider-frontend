import type { AxiosResponse } from 'axios';

import { apiClient } from '@/shared/api/api-client';

import type { TLoginPayload } from '../model/api';
import type { TTokens } from '../model/types';

export const login = async (payload: TLoginPayload): Promise<TTokens> => {
  const response = await apiClient.post<
    TTokens,
    AxiosResponse<TTokens>,
    TLoginPayload
  >('/auth/login', payload);

  return response.data;
};
