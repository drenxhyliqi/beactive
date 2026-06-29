/**
 * Google "G" brand mark. The hex values here are Google's official logo colors (a third-party
 * brand asset) — not part of the beactive palette, so they're intentionally literal.
 */
export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.28 1.48-1.13 2.73-2.4 3.58v2.97h3.88c2.27-2.09 3.57-5.17 3.57-8.79z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-2.97c-1.08.72-2.46 1.16-4.05 1.16-3.12 0-5.76-2.11-6.71-4.94H1.29v3.09A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.34a7.2 7.2 0 0 1 0-4.62V6.63H1.29a12 12 0 0 0 0 10.78l4-3.07z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.63l4 3.09C6.24 6.88 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}
