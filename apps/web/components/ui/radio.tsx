import * as React from 'react';

import { cn } from '@/lib/utils';

const Radio = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="radio"
    className={cn(
      'size-4 rounded-full border border-input accent-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
      className,
    )}
    {...props}
  />
));
Radio.displayName = 'Radio';

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('grid gap-2', className)} {...props} />
));
RadioGroup.displayName = 'RadioGroup';

export { Radio, RadioGroup };
