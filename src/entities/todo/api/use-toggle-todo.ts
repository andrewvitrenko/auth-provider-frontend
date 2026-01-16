import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import type { TToggleTodoPayload } from '../model/api';
import type { TTodo, TTodoId } from '../model/types';
import { todoQueries } from './todo.queries';
import { toggleTodo } from './toggle-todo';

type TUseToggleTodo = UseMutationResult<TTodo, Error, TToggleTodoPayload>;

export const useToggleTodo = (id: TTodoId): TUseToggleTodo => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['todos', 'toggle', id],
    mutationFn: (payload) => toggleTodo(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueries.all() });
    },
  });
};
