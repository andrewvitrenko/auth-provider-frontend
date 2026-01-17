'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type FC, useMemo } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { InputField } from '@/shared/ui/form/input-field';
import { TextareaField } from '@/shared/ui/form/textarea-field';
import { Spinner } from '@/shared/ui/spinner';

import { todoFormSchema, type TTodoFormValues } from '../model/todo-form';

type TTodoFormProps = {
  defaultValues?: Partial<TTodoFormValues>;
  onCancel?: () => void;
  onSubmit: SubmitHandler<TTodoFormValues>;
};

export const TodoForm: FC<TTodoFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<TTodoFormValues>({
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
    },
    resolver: zodResolver(todoFormSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const buttonLabel = useMemo(() => {
    if (defaultValues) {
      return isSubmitting ? 'Updating' : 'Update';
    }

    return isSubmitting ? 'Creating' : 'Create';
  }, [defaultValues, isSubmitting]);

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? 'Edit Todo' : 'Create New Todo'}
          </DialogTitle>
          <DialogDescription>
            {defaultValues
              ? 'Update the details of your todo.'
              : 'Add a new todo to your list.'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <InputField
            name="title"
            label="Title"
            placeholder="Enter todo title"
            required
            autoFocus
          />

          <TextareaField
            name="description"
            label="Description"
            placeholder="Enter todo description (optional)"
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner />}
            {buttonLabel}
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};
