'use client';

import { useEffect, useState } from 'react';
import { LoadingDots } from './LoadingDots';

/**
 * Full-screen splash shown when the site is first opened (or hard-refreshed). It's server-
 * rendered, so the dots animate via CSS immediately — even before the JS hydrates — then it
 * fades out once the app becomes interactive. Client-side navigations are covered separately by
 * the route `loading.tsx` fallbacks.
 */
export function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // By the time this effect runs the app is hydrated/interactive; fade out, then unmount.
    const fade = setTimeout(() => setHidden(true), 300);
    const remove = setTimeout(() => setRemoved(true), 650);
    return () => {
      clearTimeout(fade);
      clearTimeout(remove);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-300 ${
        hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <LoadingDots />
    </div>
  );
}
