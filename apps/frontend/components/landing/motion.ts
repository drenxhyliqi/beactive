'use client';

import { type Variants } from 'framer-motion';

/** Fade + rise, used for section content reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

/** Parent that staggers its children's reveals. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

/** Shared spring used for hover-lift interactions. */
export const hoverLift = {
  whileHover: { y: -4 },
  transition: { type: 'spring' as const, stiffness: 300, damping: 22 },
};
