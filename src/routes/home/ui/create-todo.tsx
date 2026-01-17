'use client';

import { PlusIcon } from 'lucide-react';
import { type FC, useState } from 'react';
import { toast } from 'sonner';

import { useCreateTodo } from '@/entities/todo';
import { Button } from '@/shared/ui/button';

import type { TTodoFormValues } from '../model/todo-form';
import { TodoFormDialog } from './todo-form-dialog';

export const CreateTodo: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutateAsync: createTodo } = useCreateTodo();

  const handleCreateTodo = async (data: TTodoFormValues) => {
    try {
      await createTodo({
        title: data.title,
        description: data.description || undefined,
      });
      setIsDialogOpen(false);
      toast.success('Todo created successfully');
    } catch (error) {
      console.error('Failed to create todo:', error);
      toast.error('Failed to create todo');
    }
  };

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <PlusIcon />
        New Todo
      </Button>

      <TodoFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreateTodo}
      />
    </>
  );
};
