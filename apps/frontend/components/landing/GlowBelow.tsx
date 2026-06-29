/**
 * Static (non-animated) purple light that appears to shine up from below — a pair of soft
 * radial glows anchored to the bottom edge of this wrapper. Uses pure radial gradients (NO CSS
 * `filter: blur`, which is ruinously expensive on mobile) — the transparent falloff already
 * makes them soft. Set the wrapper's vertical extent via `className` (e.g. "top-0 bottom-1/4").
 */
export function GlowBelow({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 z-0 ${className ?? ''}`}>
      {/* wide, faded halo — centred below the section edge so only its top bleeds up. A modest
          blur (mobile-safe, unlike the 150-300px blurs that froze the page) dissolves the edge. */}
      <div
        className="absolute bottom-[-24rem] left-1/2 h-[40rem] w-[80rem] max-w-[180%] -translate-x-1/2 rounded-[50%] opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, var(--primary-light), transparent 78%)' }}
      />
      {/* slightly tighter, warmer core, also pushed below the edge */}
      <div
        className="absolute bottom-[-15rem] left-1/2 h-[24rem] w-[44rem] max-w-[150%] -translate-x-1/2 rounded-[50%] opacity-45 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, var(--primary), transparent 72%)' }}
      />
    </div>
  );
}

/**
 * Soft additive sheen meant to sit ABOVE text (give it a higher z) so the light appears to
 * graze it — `mix-blend-screen` lifts dark text toward the light's hue without touching the
 * surrounding surface. Pass position / size / opacity via `className`.
 */
export function GlowTint({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[50%] mix-blend-screen ${className ?? ''}`}
      style={{ background: 'radial-gradient(closest-side, var(--primary-light), transparent 70%)' }}
    />
  );
}
