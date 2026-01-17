import type { ComponentPropsWithoutRef, FC } from 'react';

import { cn } from '@/shared/lib/utils';

export const Skeleton: FC<ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  );
};
