'use client';

import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import type { ComponentPropsWithRef, FC } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

export const AlertDialog: FC<AlertDialogPrimitive.Root.Props> = (props) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
};

export const AlertDialogTrigger: FC<AlertDialogPrimitive.Trigger.Props> = (
  props,
) => {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
};

export const AlertDialogPortal: FC<AlertDialogPrimitive.Portal.Props> = (
  props,
) => {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
};

export const AlertDialogOverlay: FC<AlertDialogPrimitive.Backdrop.Props> = ({
  className,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs',
        className,
      )}
      {...props}
    />
  );
};

type TAlertDialogContentProps = AlertDialogPrimitive.Popup.Props & {
  size?: 'default' | 'sm';
};

export const AlertDialogContent: FC<TAlertDialogContentProps> = ({
  className,
  size = 'default',
  ...props
}) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-background ring-foreground/10 group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl p-6 ring-1 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
};

export const AlertDialogHeader: FC<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        'grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]',
        className,
      )}
      {...props}
    />
  );
};

export const AlertDialogFooter: FC<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
};

export const AlertDialogMedia: FC<ComponentPropsWithRef<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "bg-muted mb-2 inline-flex size-16 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        className,
      )}
      {...props}
    />
  );
};

export const AlertDialogTitle: FC<
  ComponentPropsWithRef<typeof AlertDialogPrimitive.Title>
> = ({ className, ...props }) => {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        'text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
        className,
      )}
      {...props}
    />
  );
};

export const AlertDialogDescription: FC<
  ComponentPropsWithRef<typeof AlertDialogPrimitive.Description>
> = ({ className, ...props }) => {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        'text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3',
        className,
      )}
      {...props}
    />
  );
};

export const AlertDialogAction: FC<ComponentPropsWithRef<typeof Button>> = ({
  className,
  ...props
}) => {
  return (
    <Button
      data-slot="alert-dialog-action"
      className={cn(className)}
      {...props}
    />
  );
};

type TAlertDialogCancelProps = AlertDialogPrimitive.Close.Props &
  Pick<ComponentPropsWithRef<typeof Button>, 'variant' | 'size'>;

export const AlertDialogCancel: FC<TAlertDialogCancelProps> = ({
  className,
  variant = 'outline',
  size = 'default',
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  );
};
