import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Sign up - Auth Provider',
  description: 'Sign up to your Auth Provider account',
};

const SignupLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default SignupLayout;
