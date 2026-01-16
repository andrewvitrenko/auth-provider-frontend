import type { AxiosResponse } from 'axios';

import { apiClient } from '@/shared/api/api-client';
import type { TTokens } from '@/shared/model/auth';

import type { TSignUpPayload } from '../model/api';

export const signUp = async (payload: TSignUpPayload): Promise<TTokens> => {
  const response = await apiClient.post<
    TTokens,
    AxiosResponse<TTokens>,
    TSignUpPayload
  >('/auth/sign-up', payload);

  return response.data;
};
