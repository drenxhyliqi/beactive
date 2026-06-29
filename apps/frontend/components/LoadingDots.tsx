/**
 * The app's universal loading indicator: three dots bouncing up and down. Pure CSS (the
 * `loading-dot` utility + `loading-bounce` keyframes in globals.css), so it animates even
 * before React hydration and costs nothing on the main thread.
 */
export function LoadingDots({ className }: { className?: string }) {
  return (
    <span role="status" aria-label="Loading" className={`inline-flex items-end gap-2 ${className ?? ''}`}>
      <span className="loading-dot h-2.5 w-2.5 rounded-full bg-primary" />
      <span className="loading-dot h-2.5 w-2.5 rounded-full bg-primary [animation-delay:0.15s]" />
      <span className="loading-dot h-2.5 w-2.5 rounded-full bg-primary [animation-delay:0.3s]" />
    </span>
  );
}
