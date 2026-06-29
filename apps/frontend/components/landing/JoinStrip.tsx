'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';
import { QrCode } from 'lucide-react';

// Camera scanner is loaded only when the user taps "Scan" — keeps it off the initial bundle.
const QrScannerModal = dynamic(
  () => import('./QrScannerModal').then((m) => m.QrScannerModal),
  { ssr: false }
);

/**
 * Audience entry band. A teaser for the real /join flow (built in Step 6): it formats the
 * 6-character code as the user types and routes to /join/{code}. No backend calls.
 */
export function JoinStrip() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [focused, setFocused] = useState(false);
  const [scanning, setScanning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

          <form onSubmit={handleSubmit} className="w-full">
            {/* Segmented 6-character code: one hidden field drives six animated cells. */}
            <div className="relative" onClick={() => inputRef.current?.focus()}>
              <div className="grid grid-cols-6 gap-2 sm:gap-3" aria-hidden>
                {Array.from({ length: 6 }).map((_, i) => {
                  const char = code[i] ?? '';
                  const isFilled = i < code.length;
                  const isActive =
                    focused && (i === code.length || (code.length === 6 && i === 5));
                  return (
                    <div
                      key={i}
                      className={`flex aspect-square items-center justify-center rounded-2xl border bg-surface text-xl font-bold uppercase text-text transition-all duration-200 sm:text-2xl ${
                        isActive
                          ? 'border-primary-light shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary-light)_25%,transparent)]'
                          : isFilled
                            ? 'border-primary-light'
                            : 'border-border'
                      }`}
                    >
                      {char ? (
                        <span>{char}</span>
                      ) : isActive ? (
                        <span className="h-7 w-0.5 animate-pulse rounded-full bg-primary-light" />
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <input
                ref={inputRef}
                id="join-code"
                aria-label="Event code"
                inputMode="text"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>

            <button
              type="submit"
              disabled={code.length < 6}
              className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-2xl px-6 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:brightness-100"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, var(--primary), var(--accent) 70%, var(--primary-light))',
                boxShadow: '0 12px 30px -8px color-mix(in srgb, var(--primary) 65%, transparent)',
              }}
            >
              Join
            </button>

            {/* Divider */}
            <div className="my-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                or
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            {/* Scan a QR code instead — opens the camera. */}
            <button
              type="button"
              onClick={() => setScanning(true)}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface text-base font-semibold text-text transition-colors hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <QrCode className="h-5 w-5" />
              Scan the QR code
            </button>
          </form>
        </div>
      </div>

      {scanning && (
        <QrScannerModal
          onDetect={(scanned) => {
            setScanning(false);
            router.push(`/join/${scanned}`);
          }}
          onClose={() => setScanning(false)}
        />
      )}
    </section>
  );
}
