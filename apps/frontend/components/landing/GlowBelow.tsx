/**
 * Static (non-animated) purple light that appears to shine up from below — a pair of soft,
 * heavily blurred radial glows anchored to the bottom edge of this wrapper. Decorative; pairs
 * with the page grain. Set the wrapper's vertical extent via `className`
 * (e.g. "top-0 bottom-1/4") to place the light beneath a block of content.
 */
export function GlowBelow({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 z-0 ${className ?? ''}`}>
      {/* wide, faded halo */}
      <div
        className="absolute bottom-[-5rem] left-1/2 h-[42rem] w-[82rem] max-w-[180%] -translate-x-1/2 translate-y-1/3 rounded-[50%] opacity-30 blur-[300px]"
        style={{ background: 'radial-gradient(closest-side, var(--primary-light), transparent 92%)' }}
      />
      {/* slightly tighter, warmer core */}
      <div
        className="absolute bottom-0 left-1/2 h-[28rem] w-[48rem] max-w-[150%] -translate-x-1/2 translate-y-1/4 rounded-[50%] opacity-40 blur-[180px]"
        style={{ background: 'radial-gradient(closest-side, var(--primary), transparent 70%)' }}
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
