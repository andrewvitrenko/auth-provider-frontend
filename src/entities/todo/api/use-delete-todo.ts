import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import type { TTodo, TTodoId } from '../model/types';
import { deleteTodo } from './delete-todo';
import { todoQueries } from './todo.queries';

type TUseDeleteTodo = UseMutationResult<TTodo, Error, TTodoId>;

export const useDeleteTodo = (): TUseDeleteTodo => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['todos', 'delete'],
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueries.all() });
    },
  });
};
