'use client';

import * as React from 'react';
import {
  Content as RadixTooltipContent,
  Portal as RadixTooltipPortal,
  Provider as TooltipProvider,
  Root as Tooltip,
  Trigger as TooltipTrigger,
} from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltipContent>,
  React.ComponentPropsWithoutRef<typeof RadixTooltipContent>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <RadixTooltipPortal>
    <RadixTooltipContent
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md',
        className,
      )}
      {...props}
    />
  </RadixTooltipPortal>
));
TooltipContent.displayName = RadixTooltipContent.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
