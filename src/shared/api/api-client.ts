import axios, { AxiosError } from 'axios';
import cookie from 'js-cookie';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../config/auth';
import type { TError } from '../model/api';
import type { TTokens } from '../model/auth';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};

    const accessToken = cookie.get(ACCESS_TOKEN_KEY);

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
        const refreshToken = cookie.get(REFRESH_TOKEN_KEY); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const response = await axios.post<TTokens>(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          undefined,
          { headers: { Authorization: `Bearer ${refreshToken}` } },
        );
        const { access_token, refresh_token: newRefreshToken } = response.data;
        // Store the new access and refresh tokens.
        cookie.set(ACCESS_TOKEN_KEY, access_token, {
          secure: true,
          sameSite: 'strict',
        });
        cookie.set(REFRESH_TOKEN_KEY, newRefreshToken, {
          secure: true,
          sameSite: 'strict',
        });
        // Update the authorization header with the new access token.
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError);
        cookie.remove(ACCESS_TOKEN_KEY);
        cookie.remove(REFRESH_TOKEN_KEY);
        window.location.href = '/login';
        throw refreshError;
      }
    }

    const message = error.response?.data.message || error.message;
    throw new Error(message);
  },
);
