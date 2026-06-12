'use client';

import * as React from 'react';
import {
  Close as SheetClose,
  Content as RadixSheetContent,
  Description as RadixSheetDescription,
  Overlay as RadixSheetOverlay,
  Portal as SheetPortal,
  Root as Sheet,
  Title as RadixSheetTitle,
  Trigger as SheetTrigger,
} from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof RadixSheetOverlay>,
  React.ComponentPropsWithoutRef<typeof RadixSheetOverlay>
>(({ className, ...props }, ref) => (
  <RadixSheetOverlay
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = RadixSheetOverlay.displayName;

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b',
        bottom: 'inset-x-0 bottom-0 border-t',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof RadixSheetContent
> &
  VariantProps<typeof sheetVariants>;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof RadixSheetContent>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <RadixSheetContent
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </SheetClose>
    </RadixSheetContent>
  </SheetPortal>
));
SheetContent.displayName = RadixSheetContent.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
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
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof RadixSheetTitle>,
  React.ComponentPropsWithoutRef<typeof RadixSheetTitle>
>(({ className, ...props }, ref) => (
  <RadixSheetTitle
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = RadixSheetTitle.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof RadixSheetDescription>,
  React.ComponentPropsWithoutRef<typeof RadixSheetDescription>
>(({ className, ...props }, ref) => (
  <RadixSheetDescription
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = RadixSheetDescription.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
