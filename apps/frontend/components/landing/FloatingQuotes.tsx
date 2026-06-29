'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Audience/host pain-points beactive solves — the "silence" before the conversation. */
const quotes = [
  {
    text: 'Only three hands go up when I ask for questions.',
    pos: 'left-[1%] top-[14%]',
    rotate: -5,
    delay: 0,
  },
  {
    text: 'We get one survey response for every fifty attendees.',
    pos: 'right-[2%] top-[10%]',
    rotate: 4,
    delay: 0.35,
  },
  {
    text: 'The best idea in the room never reaches the mic.',
    pos: 'bottom-[12%] left-[4%]',
    rotate: -3,
    delay: 0.7,
  },
];

/**
 * Decorative quote cards that float around the hero headline and "pop" (scale up + straighten)
 * on hover — echoing the reference design. Desktop only; idle float respects reduced-motion.
 */
export function FloatingQuotes() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      {quotes.map((q) => (
        <motion.div
          key={q.text}
          className={`absolute ${q.pos} w-56`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: reduce ? 0 : [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: q.delay },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: q.delay },
          }}
        >
          <motion.div
            style={{ rotate: q.rotate }}
            whileHover={{ scale: 1.06, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24, mass: 0.6 }}
            className="pointer-events-auto transform-gpu cursor-default rounded-2xl border border-primary bg-surface/90 px-4 py-3 text-sm leading-snug text-text shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_45%,transparent)] will-change-transform"
          >
            {q.text}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
