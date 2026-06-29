import type { HTMLAttributes } from 'react';
import { cn } from './cn';

/**
 * Low-cost loading placeholder: a muted, gently pulsing block. Compose several to mock the
 * shape of the content that's loading. `animate-pulse` is a compositor-friendly opacity
 * animation, so it stays cheap even when many are on screen.
 */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden className={cn('animate-pulse rounded-md bg-border', className)} {...props} />;
}
