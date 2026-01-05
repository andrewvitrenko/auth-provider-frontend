import type { AxiosResponse } from 'axios';

import { apiClient } from '@/shared/api/api-client';

import type { TSignUpPayload } from '../model/api';
import type { TTokens } from '../model/types';

export const signUp = async (payload: TSignUpPayload): Promise<TTokens> => {
  const response = await apiClient.post<
    TTokens,
    AxiosResponse<TTokens>,
    TSignUpPayload
  >('/auth/sign-up', payload);

  return response.data;
};
