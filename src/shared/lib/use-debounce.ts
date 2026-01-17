import { useEffect, useState } from 'react';

export const useDebounce = <T>(data: T, timeout = 300): T => {
  const [value, setValue] = useState<T>(data);

  useEffect(() => {
    const timeoutId = setTimeout(() => setValue(data), timeout);

    return (): void => clearTimeout(timeoutId);
  }, [data, timeout]);

  return value;
};
