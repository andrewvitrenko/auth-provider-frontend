import { Loader2Icon } from 'lucide-react';
import type { ComponentPropsWithoutRef, FC } from 'react';

import { cn } from '@/shared/lib/utils';

export const Spinner: FC<ComponentPropsWithoutRef<'svg'>> = ({
  className,
  ...props
}) => {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
};
