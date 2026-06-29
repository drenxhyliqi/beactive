import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/landing/Logo';
import { ManageCookiesButton } from '@/components/cookies/ManageCookiesButton';
import { COOKIE_CATEGORIES } from '@/lib/cookie-consent';

export const metadata: Metadata = { title: 'Cookie Policy' };

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="beactive home" className="inline-flex">
          <Logo />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <h1 className="mt-10 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
        Cookie Policy
      </h1>
      <p className="mt-4 text-text-secondary">
        beactive uses cookies to improve your experience, analyze traffic, and serve personalized
        ads. Here&apos;s what each category does — you can change your choices any time.
      </p>

      <div className="mt-8 space-y-4">
        {COOKIE_CATEGORIES.map((c) => (
          <section key={c.key} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <h2 className="font-heading text-lg font-bold text-text">{c.title}</h2>
              {c.locked && (
                <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary">
                  Always on
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm text-text-secondary">{c.description}</p>
          </section>
        ))}
      </div>

      <div className="mt-8">
        <ManageCookiesButton />
      </div>
    </main>
  );
}
