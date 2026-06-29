'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/** Format a raw code into spaced pairs for display: "X4K9P2" → "X4 K9 P2". */
function formatCode(raw: string): string {
  return raw.replace(/(.{2})/g, '$1 ').trim();
}

/**
 * Shared left side of the auth pages: a top-left back button and the "Joining as a participant?"
 * code panel. The panel is a vertical gradient that fades purple (bottom) up into a light base —
 * warm white in light mode (var(--background)) and near-black in dark mode (var(--ink)). Text and
 * icons use `text-text` so they stay readable on either.
 */
export function AuthAside() {
  const router = useRouter();
  const [code, setCode] = useState('');

  function handleJoin(e: FormEvent) {
    e.preventDefault();
    if (code.length === 6) router.push(`/join/${code}`);
  }

  return (
    <>
      {/* Back button — text-text adapts to whatever is behind it (panel on desktop, form on mobile). */}
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="absolute left-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-white/10 lg:left-6 lg:top-6"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <aside className="relative hidden flex-col justify-center overflow-hidden bg-[linear-gradient(to_top,var(--primary)_0%,var(--background)_82%)] px-12 py-16 dark:bg-[linear-gradient(to_top,var(--primary-dark)_0%,var(--ink)_85%)] lg:flex">
        {/* soft purple light rising from below, matching the landing language */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-12rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, var(--primary-light), transparent 75%)' }}
        />

        <div className="relative max-w-sm">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Joining as a participant?
          </h2>
          <p className="mt-3 text-text-secondary">No account needed.</p>

          <form onSubmit={handleJoin} className="relative mt-8">
            <label htmlFor="participant-code" className="sr-only">
              Event code
            </label>
            <input
              id="participant-code"
              inputMode="text"
              autoComplete="off"
              placeholder="Enter code"
              value={formatCode(code)}
              onChange={(e) =>
                setCode(
                  e.target.value
                    .replace(/[^a-z0-9]/gi, '')
                    .toUpperCase()
                    .slice(0, 6)
                )
              }
              className="h-14 w-full rounded-full bg-white pl-6 pr-16 text-lg font-semibold uppercase tracking-[0.2em] text-primary shadow-md placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-[color-mix(in_srgb,var(--primary)_45%,transparent)] focus:outline-none"
            />
            <button
              type="submit"
              disabled={code.length < 6}
              aria-label="Join event"
              className="absolute right-1.5 top-1.5 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
