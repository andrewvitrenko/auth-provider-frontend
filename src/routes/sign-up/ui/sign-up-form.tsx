'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import { useSignUp } from '@/features/auth/api/use-sign-up';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { FieldDescription, FieldGroup } from '@/shared/ui/field';
import { InputField } from '@/shared/ui/form/input-field';
import { PasswordField } from '@/shared/ui/form/password-field';
import { Spinner } from '@/shared/ui/spinner';

import { signupValidationSchema, type TSignUpForm } from '../model/form';

export const SignupForm: FC = () => {
  const { mutate: signUp, isPending } = useSignUp();

  const router = useRouter();

  const form = useForm<TSignUpForm>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<TSignUpForm> = ({
    email,
    password,
    firstName,
    lastName,
  }) => {
    signUp(
      { email, password, firstName, lastName },
      {
        onSuccess: () => {
          router.push('/');
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <InputField
                name="firstName"
                label="First Name"
                type="text"
                placeholder="John"
                required
                disabled={isPending}
              />
              <InputField
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="Doe"
                required
                disabled={isPending}
              />
              <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="m@example.com"
                required
                disabled={isPending}
              />
              <PasswordField
                name="password"
                label="Password"
                placeholder="Type your password"
                required
                disabled={isPending}
              />
              <PasswordField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-type your password"
                required
                disabled={isPending}
              />
              <FieldGroup>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Spinner className="mr-2" />}
                  Create Account
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Log in</a>
                </FieldDescription>
              </FieldGroup>
            </FieldGroup>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
