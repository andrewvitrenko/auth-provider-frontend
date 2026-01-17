'use client';

import { Eye, EyeOff } from 'lucide-react';
import {
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
  useState,
} from 'react';
import { useController } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';

import { Button } from '../button';
import { Field, FieldError, FieldLabel } from '../field';
import { Input } from '../input';

type TPasswordFieldProps = Omit<
  ComponentPropsWithoutRef<typeof Input>,
  'type'
> & {
  name: string;
  label?: string | ReactNode;
  containerClassName?: string;
  shouldUnregister?: boolean;
};

export const PasswordField: FC<TPasswordFieldProps> = ({
  name,
  containerClassName,
  label,
  shouldUnregister,
  required,
  className,
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, shouldUnregister });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field className={containerClassName} data-disabled={props.disabled}>
      {label && typeof label === 'string' ? (
        <FieldLabel htmlFor={name}>
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      ) : (
        label
      )}
      <div className="relative">
        <Input
          {...props}
          {...field}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          id={name}
          type={showPassword ? 'text' : 'password'}
          aria-errormessage={error ? `${name}-error` : undefined}
          className={cn('pr-10', className)}
        />
        <Button
          type="button"
          className="absolute top-1/2 right-2 -translate-y-1/2"
          variant="ghost"
          size="icon"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword(!showPassword)}
        >
          <span className="sr-only">{showPassword ? 'Hide' : 'Show'}</span>
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </Button>
      </div>
      {error && <FieldError id={`${name}-error`}>{error.message}</FieldError>}
    </Field>
  );
};
