'use client';

import * as React from 'react';
import {
  Close as DialogClose,
  Content as RadixDialogContent,
  Description as RadixDialogDescription,
  Overlay as RadixDialogOverlay,
  Portal as DialogPortal,
  Root as Dialog,
  Title as RadixDialogTitle,
  Trigger as DialogTrigger,
} from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof RadixDialogOverlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialogOverlay>
>(({ className, ...props }, ref) => (
  <RadixDialogOverlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = RadixDialogOverlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialogContent>,
  React.ComponentPropsWithoutRef<typeof RadixDialogContent>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <RadixDialogContent
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg',
        className,
      )}
      {...props}
    >
      {children}
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </RadixDialogContent>
  </DialogPortal>
));
DialogContent.displayName = RadixDialogContent.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialogTitle>,
  React.ComponentPropsWithoutRef<typeof RadixDialogTitle>
>(({ className, ...props }, ref) => (
  <RadixDialogTitle
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-normal',
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = RadixDialogTitle.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialogDescription>,
  React.ComponentPropsWithoutRef<typeof RadixDialogDescription>
>(({ className, ...props }, ref) => (
  <RadixDialogDescription
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = RadixDialogDescription.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
