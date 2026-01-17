'use client';

import {
  CheckCircle2Icon,
  CheckIcon,
  CircleIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useToggleTodo } from '@/entities/todo';
import { useDeleteTodo } from '@/entities/todo/api/use-delete-todo';
import { useUpdateTodo } from '@/entities/todo/api/use-update-todo';
import type { TTodo } from '@/entities/todo/model/types';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  type TItemProps,
} from '@/shared/ui/item';

import type { TTodoFormValues } from '../model/todo-form';
import { DeleteDialog } from './delete-dialog';
import { TodoFormDialog } from './todo-form-dialog';

type TTodoItemProps = TItemProps & {
  todo: TTodo;
};

export const TodoItem: FC<TTodoItemProps> = ({ todo, ...props }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutateAsync: updateTodo } = useUpdateTodo(todo.id);
  const { mutateAsync: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const { mutateAsync: toggleTodo } = useToggleTodo(todo.id);

  const handleEdit = async (data: TTodoFormValues) => {
    try {
      await updateTodo(data);
      setIsEditDialogOpen(false);
      toast.success('Todo updated successfully');
    } catch (error) {
      console.error('Failed to update todo:', error);
      toast.error('Failed to update todo');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      toast.success('Todo deleted successfully');
    } catch (error) {
      console.error('Failed to delete todo:', error);
      toast.error('Failed to delete todo');
    }
  };

  const handleToggle = async () => {
    try {
      await toggleTodo({ completed: !todo.completed });
      toast.success(
        todo.completed ? 'Todo marked as incomplete' : 'Todo completed',
      );
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      toast.error('Failed to toggle todo');
    }
  };

  return (
    <>
      <Item variant="outline" {...props}>
        <ItemMedia variant="icon">
          {todo.completed && (
            <div className="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full">
              <CheckIcon className="size-3" />
            </div>
          )}
        </ItemMedia>
        <ItemContent>
          <ItemTitle
            className={
              todo.completed ? 'text-muted-foreground line-through' : ''
            }
          >
            {todo.title}
          </ItemTitle>
          {todo.description && (
            <ItemDescription
              className={
                todo.completed ? 'text-muted-foreground/60 line-through' : ''
              }
            >
              {todo.description}
            </ItemDescription>
          )}
        </ItemContent>
        <ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon-sm" />}
            >
              <MoreVerticalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleToggle}>
                {todo.completed ? <CircleIcon /> : <CheckCircle2Icon />}
                {todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <PencilIcon />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                disabled={isDeleting}
              >
                <TrashIcon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>

      <TodoFormDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEdit}
        defaultValues={{
          title: todo.title,
          description: todo.description ?? '',
        }}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onCancel={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        todoTitle={todo.title}
      />
    </>
  );
};
