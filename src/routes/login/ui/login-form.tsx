'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import { useLogin } from '@/features/auth';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/field';
import { InputField } from '@/shared/ui/form/input-field';
import { PasswordField } from '@/shared/ui/form/password-field';
import { Spinner } from '@/shared/ui/spinner';

import { loginFormValidationSchema, type TLoginForm } from '../model/form';

export const LoginForm: FC = () => {
  const { isPending, mutate: login } = useLogin();

  const router = useRouter();

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: { email: '', password: '' },
  });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<TLoginForm> = (values): void => {
    login(values, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <InputField
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="m@example.com"
                  required
                  disabled={isPending}
                  autoComplete="email"
                />
                <PasswordField
                  name="password"
                  placeholder="Password"
                  autoComplete="password"
                  disabled={isPending}
                  label={
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">
                        Password <span className="text-destructive">*</span>
                      </FieldLabel>
                      <a
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  }
                  required
                />
                <Field>
                  <Button disabled={isPending} type="submit">
                    {isPending && <Spinner />}
                    {isPending ? 'Logging in...' : 'Login'}
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <a href="/sign-up">Sign up</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};
