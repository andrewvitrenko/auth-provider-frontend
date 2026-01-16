import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, FC } from 'react';

import { cn } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';

export const ItemGroup: FC<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        'group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2',
        className,
      )}
      {...props}
    />
  );
};

export const ItemSeparator: FC<ComponentPropsWithRef<typeof Separator>> = ({
  className,
  ...props
}) => {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn('my-2', className)}
      {...props}
    />
  );
};

const itemVariants = cva(
  '[a]:hover:bg-muted rounded-md border text-sm w-full group/item focus-visible:border-ring focus-visible:ring-ring/50 flex items-center flex-wrap outline-none transition-colors duration-100 focus-visible:ring-[3px] [a]:transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent',
        outline: 'border-border',
        muted: 'bg-muted/50 border-transparent',
      },
      size: {
        default: 'gap-3.5 px-4 py-3.5',
        sm: 'gap-2.5 px-3 py-2.5',
        xs: 'gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type TItemProps = useRender.ComponentProps<'div'> &
  VariantProps<typeof itemVariants>;

export const Item: FC<TItemProps> = ({
  className,
  variant = 'default',
  size = 'default',
  render,
  ...props
}) => {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(itemVariants({ variant, size, className })),
      },
      props,
    ),
    render,
    state: {
      slot: 'item',
      variant,
      size,
    },
  });
};

const itemMediaVariants = cva(
  'gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start flex shrink-0 items-center justify-center [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "[&_svg:not([class*='size-'])]:size-4",
        image:
          'size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type TItemMediaProps = ComponentPropsWithRef<'div'> &
  VariantProps<typeof itemMediaVariants>;

export const ItemMedia: FC<TItemMediaProps> = ({
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
};

export const ItemContent: FC<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="item-content"
      className={cn(
        'flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none',
        className,
      )}
      {...props}
    />
  );
};

export const ItemTitle: FC<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="item-title"
      className={cn(
        'line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium underline-offset-4',
        className,
      )}
      {...props}
    />
  );
};

export const ItemDescription: FC<ComponentPropsWithRef<'p'>> = ({
  className,
  ...props
}) => {
  return (
    <p
      data-slot="item-description"
      className={cn(
        'text-muted-foreground [&>a:hover]:text-primary line-clamp-2 text-left text-sm leading-normal font-normal group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  );
};

export const ItemActions: FC<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="item-actions"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
};

export const ItemHeader: FC<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="item-header"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      {...props}
    />
  );
};

export const ItemFooter: FC<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className,
      )}
      {...props}
    />
  );
};
