import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import type { TCreateTodoPayload } from '../model/api';
import type { TTodo } from '../model/types';
import { createTodo } from './create-todo';
import { todoQueries } from './todo.queries';

type TUseCreateTodo = UseMutationResult<TTodo, Error, TCreateTodoPayload>;

export const useCreateTodo = (): TUseCreateTodo => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['todos', 'create'],
    mutationFn: (payload) => createTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueries.all() });
    },
  });
};
