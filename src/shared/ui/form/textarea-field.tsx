'use client';

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import { useController } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';

import { Field, FieldError, FieldLabel } from '../field';
import { Textarea } from '../textarea';

type TTextareaFieldProps = Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'children'
> & {
  containerClassName?: string;
  label?: string | ReactNode;
  name: string;
  shouldUnregister?: boolean;
};

export const TextareaField: FC<TTextareaFieldProps> = ({
  label,
  containerClassName,
  name,
  required,
  shouldUnregister,
  className,
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, shouldUnregister });

  return (
    <Field className={containerClassName} data-disabled={props.disabled}>
      <Textarea
        id={name}
        className={cn('order-2', className)}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-errormessage={error ? `${name}-error` : undefined}
        {...props}
        {...field}
      />
      {label && typeof label === 'string' ? (
        <FieldLabel htmlFor={name}>
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      ) : (
        label
      )}
      {error && (
        <FieldError id={`${name}-error`} className="order-3">
          {error.message}
        </FieldError>
      )}
    </Field>
  );
};
