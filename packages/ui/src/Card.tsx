import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from './cn';

export type CardProps = HTMLAttributes<HTMLDivElement>;

/** Surface container with palette-derived border, radius, and soft shadow. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-border bg-surface p-6 shadow-sm',
        className
      )}
      {...props}
    />
  );
});
