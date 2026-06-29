'use client';

import dynamic from 'next/dynamic';
import { LoadingDots } from '@/components/LoadingDots';

// The animated demo is purely decorative (no SEO content) and the heaviest client piece on the
// page, so we skip SSR and load its JS after first paint, showing a same-size placeholder to
// avoid layout shift.
const LivePollDemo = dynamic(() => import('./LivePollDemo').then((m) => m.LivePollDemo), {
  ssr: false,
  loading: () => (
    <div className="glass flex h-[400px] w-full max-w-md items-center justify-center rounded-2xl">
      <LoadingDots />
    </div>
  ),
});

export function LivePollDemoLazy() {
  return <LivePollDemo />;
}
