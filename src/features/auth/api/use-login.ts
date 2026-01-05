import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import cookies from 'js-cookie';
import { toast } from 'sonner';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/config/auth';

import type { TLoginPayload } from '../model/api';
import type { TTokens } from '../model/types';
import { login } from './login';

type TUseLogin = UseMutationResult<TTokens, Error, TLoginPayload>;

export const useLogin = (): TUseLogin => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (payload) => login(payload),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: ({ access_token, refresh_token }) => {
      cookies.set(ACCESS_TOKEN_KEY, access_token, { secure: true });
      cookies.set(REFRESH_TOKEN_KEY, refresh_token, { secure: true });
    },
  });
};
