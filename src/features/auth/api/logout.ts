import { apiClient } from '@/shared/api/api-client';

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};
