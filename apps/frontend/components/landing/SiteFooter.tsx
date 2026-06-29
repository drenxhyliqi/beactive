import Link from 'next/link';
import { Logo } from './Logo';

/** Landing-page footer. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo className="h-7 w-auto" />
          <p className="text-sm text-text-secondary">Live audience interaction, made simple.</p>
        </div>

        <nav className="flex items-center gap-6 text-sm text-text-secondary">
          <Link href="/auth/login" className="transition-colors hover:text-text">
            Log in
          </Link>
          <Link href="/auth/register" className="transition-colors hover:text-text">
            Sign up
          </Link>
          <Link href="/join" className="transition-colors hover:text-text">
            Join an event
          </Link>
        </nav>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-4 text-center text-xs text-text-secondary sm:text-left">
          © {new Date().getFullYear()} beactive. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
