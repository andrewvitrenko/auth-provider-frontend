import type { FC } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import { Spinner } from '@/shared/ui/spinner';

type TDeleteDialogProps = {
  todoTitle: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
};

export const DeleteDialog: FC<TDeleteDialogProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  todoTitle,
  isDeleting,
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &quot;{todoTitle}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this todo? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            variant="destructive"
            disabled={isDeleting}
          >
            {isDeleting && <Spinner />}
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
