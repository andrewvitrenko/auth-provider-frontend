import type { AxiosResponse } from 'axios';

import { apiClient } from '@/shared/api/api-client';
import type { TTokens } from '@/shared/model/auth';

import type { TLoginPayload } from '../model/api';

export const login = async (payload: TLoginPayload): Promise<TTokens> => {
  const response = await apiClient.post<
    TTokens,
    AxiosResponse<TTokens>,
    TLoginPayload
  >('/auth/login', payload);

  return response.data;
};
