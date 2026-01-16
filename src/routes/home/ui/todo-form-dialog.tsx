import { type FC } from 'react';

import { Dialog, DialogContent } from '@/shared/ui/dialog';

import type { TTodoFormValues } from '../model/todo-form';
import { TodoForm } from './todo-form';

type TTodoFormDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TTodoFormValues) => Promise<void>;
  defaultValues?: Partial<TTodoFormValues>;
};

export const TodoFormDialog: FC<TTodoFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <TodoForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
