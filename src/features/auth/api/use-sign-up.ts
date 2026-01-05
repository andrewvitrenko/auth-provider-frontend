import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import cookies from 'js-cookie';
import { toast } from 'sonner';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/config/auth';

import type { TSignUpPayload } from '../model/api';
import type { TTokens } from '../model/types';
import { signUp } from './sign-up';

type TUseSignUp = UseMutationResult<TTokens, Error, TSignUpPayload>;

export const useSignUp = (): TUseSignUp => {
  return useMutation({
    mutationKey: ['sign-up'],
    mutationFn: (payload) => signUp(payload),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: ({ access_token, refresh_token }) => {
      cookies.set(ACCESS_TOKEN_KEY, access_token, { secure: true });
      cookies.set(REFRESH_TOKEN_KEY, refresh_token, { secure: true });
    },
  });
};
