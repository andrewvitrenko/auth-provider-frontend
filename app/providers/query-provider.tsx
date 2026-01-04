'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import type { FC, PropsWithChildren } from 'react';

import { queryCliend } from '@/shared/api/query-client';

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryCliend}>{children}</QueryClientProvider>
  );
};
