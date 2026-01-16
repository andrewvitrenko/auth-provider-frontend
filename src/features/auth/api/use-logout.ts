import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/config/auth';

import { logout } from './logout';

type TUseLogout = UseMutationResult<void, Error, void>;

export const useLogout = (): TUseLogout => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logout(),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      cookies.remove(ACCESS_TOKEN_KEY);
      cookies.remove(REFRESH_TOKEN_KEY);
      queryClient.invalidateQueries();
      router.push('/login');
    },
  });
};
