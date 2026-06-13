import * as React from 'react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={cn(
      'size-4 rounded border border-input accent-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
      className,
    )}
    {...props}
  />
));
Checkbox.displayName = 'Checkbox';

export { Checkbox };
