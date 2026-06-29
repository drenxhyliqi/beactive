'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { fadeUp, stagger } from './motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** When true, stagger direct children (each should be a <Reveal.Item> / motion child). */
  group?: boolean;
  as?: 'div' | 'section' | 'ul' | 'ol' | 'li';
}

/**
 * Scroll-reveal wrapper. Animates in once when it enters the viewport. With `group`, it
 * orchestrates staggered children; otherwise it reveals its content as a single block.
 */
export function Reveal({ children, className, group = false, as = 'div' }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={group ? stagger : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  );
}

/** A single staggered item; use as a direct child of <Reveal group>. */
export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li';
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
