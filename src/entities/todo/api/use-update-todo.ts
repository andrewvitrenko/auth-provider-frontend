import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import type { TUpdateTodoPayload } from '../model/api';
import type { TTodo, TTodoId } from '../model/types';
import { todoQueries } from './todo.queries';
import { updateTodo } from './update-todo';

type TUseUpdateTodo = UseMutationResult<TTodo, Error, TUpdateTodoPayload>;

export const useUpdateTodo = (id: TTodoId): TUseUpdateTodo => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['todos', 'update', id],
    mutationFn: (payload) => updateTodo(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueries.all() });
    },
  });
};
