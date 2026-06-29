'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Decorative desktop-only quote cards. Loaded client-side after first paint, and never fetched
// at all on mobile — keeping their JS (and the framer-motion they pull in) off the critical path.
const FloatingQuotes = dynamic(() => import('./FloatingQuotes').then((m) => m.FloatingQuotes), {
  ssr: false,
});

export function FloatingQuotesLazy() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setShow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return show ? <FloatingQuotes /> : null;
}
