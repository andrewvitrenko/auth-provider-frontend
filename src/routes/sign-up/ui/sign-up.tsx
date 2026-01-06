import type { FC } from 'react';

import { SignupForm } from './sign-up-form';

export const SignUpPage: FC = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
};
