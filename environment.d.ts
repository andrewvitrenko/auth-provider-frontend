declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
    }
  }
}

// eslint-disable-next-line unicorn/require-module-specifiers
export {};
