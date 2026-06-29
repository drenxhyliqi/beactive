'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface BlobProps {
  x: MotionValue<number> | number;
  y: MotionValue<number> | number;
  drift: string;
  color: string;
  className: string;
  opacity?: number;
}

/** A single parallax blob: outer element handles cursor parallax (transform via x/y),
 *  inner element handles the ambient CSS drift (its own transform) — they compose. */
function Blob({ x, y, drift, color, className, opacity = 0.55 }: BlobProps) {
  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <div
        className={`h-full w-full rounded-full ${drift}`}
        style={{
          background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
          filter: 'blur(64px)',
          opacity,
        }}
      />
    </motion.div>
  );
}

/**
 * Cursor-reactive aurora layer. Blurred palette blobs drift ambiently (CSS) and parallax
 * toward the pointer, and a soft spotlight follows the cursor. Decorative and
 * non-interactive; all motion stops under prefers-reduced-motion.
 */
export function AuroraBackground({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Cursor spotlight + parallax tracking only on devices with a fine pointer (desktop).
  const [interactive, setInteractive] = useState(false);

  // Normalised pointer position within this element (0..1) for parallax, and raw px for spotlight.
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const px = useMotionValue(-1000);
  const py = useMotionValue(-1000);

  const snx = useSpring(nx, { stiffness: 50, damping: 20 });
  const sny = useSpring(ny, { stiffness: 50, damping: 20 });
  const spx = useSpring(px, { stiffness: 120, damping: 22 });
  const spy = useSpring(py, { stiffness: 120, damping: 22 });

  useEffect(() => {
    if (reduce) return;
    // Skip pointer tracking on touch devices — no hover spotlight on mobile.
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;
    setInteractive(true);

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      px.set(x);
      py.set(y);
      nx.set(r.width ? x / r.width : 0.5);
      ny.set(r.height ? y / r.height : 0.5);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, nx, ny, px, py]);

  // Parallax offsets (px) — different depth/direction per blob.
  const ax = useTransform(snx, (v) => (v - 0.5) * -55);
  const ay = useTransform(sny, (v) => (v - 0.5) * -55);
  const bx = useTransform(snx, (v) => (v - 0.5) * 75);
  const by = useTransform(sny, (v) => (v - 0.5) * 75);
  const cx = useTransform(snx, (v) => (v - 0.5) * 45);
  const cy = useTransform(sny, (v) => (v - 0.5) * -45);

  const spotlight = useMotionTemplate`radial-gradient(450px circle at ${spx}px ${spy}px, color-mix(in srgb, var(--primary) 22%, transparent), transparent 65%)`;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className ?? ''}`}
    >
      <Blob
        x={reduce ? 0 : ax}
        y={reduce ? 0 : ay}
        drift="aurora-drift-a"
        color="var(--primary-light)"
        className="-left-[30%] -top-[8%] h-[24rem] w-[24rem] sm:left-[2%] sm:top-[6%]"
        opacity={0.38}
      />
      <Blob
        x={reduce ? 0 : bx}
        y={reduce ? 0 : by}
        drift="aurora-drift-b"
        color="var(--accent)"
        className="-right-[30%] -top-[8%] h-[22rem] w-[22rem] sm:right-[4%] sm:top-[2%]"
        opacity={0.34}
      />
      <Blob
        x={reduce ? 0 : cx}
        y={reduce ? 0 : cy}
        drift="aurora-drift-c"
        color="var(--highlight)"
        className="-bottom-[12%] left-[50%] h-[20rem] w-[20rem] sm:bottom-[2%] sm:left-[34%]"
        opacity={0.28}
      />

      {/* Cursor-following spotlight (desktop only). */}
      {interactive && <motion.div className="absolute inset-0" style={{ background: spotlight }} />}

      {/* Soften the band into the page background at the bottom. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, transparent 90%, var(--background) 100%)',
        }}
      />
    </div>
  );
}
