'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

/** Format a raw code into spaced pairs for display: "X4K9P2" → "X4 K9 P2". */
function formatCode(raw: string): string {
  return raw.replace(/(.{2})/g, '$1 ').trim();
}

/**
 * Audience entry band. A teaser for the real /join flow (built in Step 6): it formats the
 * 6-character code as the user types and routes to /join/{code}. No backend calls.
 */
export function JoinStrip() {
  const router = useRouter();
  const [code, setCode] = useState('');

  function handleChange(value: string) {
    setCode(value.replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 6));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (code.length === 6) router.push(`/join/${code}`);
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-14 text-center shadow-[0_30px_80px_-30px_color-mix(in_srgb,var(--primary)_65%,transparent)] ring-1 ring-inset ring-white/10"
      >
        {/* concentrated core of the glow, just below the card edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-14 left-1/2 h-72 w-[34rem] -translate-x-1/2 rounded-full opacity-70 blur-6xl"
          // style={{ background: 'radial-gradient(circle, var(--primary-light), transparent 70%)' }}
        />

        {/* fine grain to break up the flat fill */}
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light"
        />

        <div className="relative mx-auto flex max-w-md flex-col items-center gap-6">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
            In the audience?
          </h2>
          <p className="text-text-secondary">
            Enter the 6-character code from the screen — no account needed.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
          >
            <label htmlFor="join-code" className="sr-only">
              Event code
            </label>
            <input
              id="join-code"
              inputMode="text"
              autoComplete="off"
              placeholder="xx xx xx"
              value={formatCode(code)}
              onChange={(e) => handleChange(e.target.value)}
              className="h-[4.5rem] flex-1 rounded-2xl border border-border bg-surface px-5 text-center font-mono text-xl font-bold uppercase tracking-[0.35em] text-text backdrop-blur transition-all duration-300 placeholder:font-mono placeholder:text-text-secondary focus-visible:border-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-0 focus-visible:shadow-[0_0_36px_-6px_color-mix(in_srgb,var(--primary-light)_70%,transparent)]"
            />
            <button
              type="submit"
              disabled={code.length < 6}
              className="inline-flex h-12 items-center justify-center rounded-2xl px-6 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:brightness-100"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, var(--primary), var(--accent) 70%, var(--primary-light))',
                boxShadow: '0 12px 30px -8px color-mix(in srgb, var(--primary) 65%, transparent)',
              }}
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
