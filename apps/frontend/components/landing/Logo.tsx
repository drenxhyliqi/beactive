'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@beactive/ui';

/**
 * Brand logo. Renders `/logo.png` (drop your PNG at apps/frontend/public/logo.png).
 * If the image is missing it falls back to a styled "beactive" wordmark, so the UI never breaks.
 */
export function Logo({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={cn(
          'font-heading text-xl font-extrabold tracking-tight text-primary',
          className
        )}
      >
        beactive
      </span>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="beactive"
      width={140}
      height={36}
      priority
      onError={() => setFailed(true)}
      className={cn('h-8 w-auto object-contain', className)}
    />
  );
}
