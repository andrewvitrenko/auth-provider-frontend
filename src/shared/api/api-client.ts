import axios, { AxiosError } from 'axios';
import cookie from 'js-cookie';

import type { TError } from '../model/api';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};

    const accessToken = cookie.get('accessToken');

    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<TError>) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      // @ts-expect-error custom property
      !originalRequest?._retry
    ) {
      // @ts-expect-error custom property
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = cookie.get('refreshToken'); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          undefined,
          { headers: { Authorization: `Bearer ${refreshToken}` } },
        );
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        // Store the new access and refresh tokens.
        cookie.set('accessToken', accessToken);
        cookie.set('refreshToken', newRefreshToken);
        // Update the authorization header with the new access token.
        apiClient.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
        return apiClient(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError);
        cookie.remove('accessToken');
        cookie.remove('refreshToken');
        window.location.href = '/login';
        throw refreshError;
      }
    }

    const message = error.response?.data.message || error.message;
    throw new Error(message);
  },
);
