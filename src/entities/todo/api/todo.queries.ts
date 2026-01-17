import {
  infiniteQueryOptions,
  type UndefinedInitialDataInfiniteOptions,
} from '@tanstack/react-query';

import type { TPaginatedResponse } from '@/shared/model/api';

import type { TTodo } from '../model/types';
import { getTodos } from './get-todos';

export const todoQueries = {
  all: () => ['todos'] as const,
  getList: (
    search: string = '',
    limit: number = 10,
  ): UndefinedInitialDataInfiniteOptions<
    TPaginatedResponse<TTodo>,
    Error,
    TTodo[],
    readonly ['todos', 'list', string],
    number
  > => {
    return infiniteQueryOptions({
      queryKey: [...todoQueries.all(), 'list', search] as const,
      queryFn: ({ signal, pageParam }) =>
        getTodos(search, pageParam, limit, signal),
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.reduce(
          (acc, { data }) => acc + data.length,
          0,
        );

        return totalFetched < lastPage.total ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
      select: ({ pages }) => pages.flatMap((page) => page.data),
    });
  },
};
