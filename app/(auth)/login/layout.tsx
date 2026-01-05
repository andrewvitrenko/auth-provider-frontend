import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Login - Auth Provider',
  description: 'Login to your Auth Provider account',
};

const LoginLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default LoginLayout;
