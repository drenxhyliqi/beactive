'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  COOKIE_CATEGORIES,
  COOKIE_SETTINGS_EVENT,
  readConsent,
  writeConsent,
  type CookiePrefs,
} from '@/lib/cookie-consent';

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        checked ? 'bg-primary' : 'bg-border'
      } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-[1.375rem]' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

/**
 * Cookie consent: a banner for first-time visitors and a granular settings panel. The choice is
 * stored in a cookie, so returning visitors aren't asked again. The panel can be re-opened from
 * anywhere via the COOKIE_SETTINGS_EVENT (see openCookieSettings()).
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false); // first-visit banner
  const [open, setOpen] = useState(false); // settings panel
  const [prefs, setPrefs] = useState<CookiePrefs>({
    essential: true,
    analytics: false,
    ads: false,
  });

  useEffect(() => {
    const existing = readConsent();
    if (existing) setPrefs(existing);
    else setVisible(true);

    const openPanel = () => {
      const current = readConsent();
      if (current) setPrefs(current);
      setOpen(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, openPanel);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openPanel);
  }, []);

  function persist(next: CookiePrefs) {
    writeConsent(next);
    setPrefs(next);
    setOpen(false);
    setVisible(false);
  }

  const acceptAll = () => persist({ essential: true, analytics: true, ads: true });
  const rejectAll = () => persist({ essential: true, analytics: false, ads: false });
  const savePrefs = () => persist({ ...prefs, essential: true });

  if (!visible && !open) return null;

  return (
    <>
      {/* First-visit banner */}
      {visible && !open && (
        <div className="fixed inset-x-0 bottom-0 z-[90] p-4">
          <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-xl sm:flex-row sm:items-center sm:gap-4">
            <p className="text-sm text-text-secondary">
              We use{' '}
              <Link href="/cookies" className="font-medium text-primary hover:text-primary-hover">
                cookies
              </Link>{' '}
              to improve your experience, analyze traffic, and serve personalized ads.{' '}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Cookie settings
              </button>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={rejectAll}
                className="inline-flex h-10 items-center justify-center rounded-2xl border border-border px-4 text-sm font-medium text-text transition-colors hover:bg-primary-soft"
              >
                Reject
              </button>
              <button type="button" onClick={acceptAll} className="btn-gradient h-10 rounded-2xl px-5 text-sm">
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie settings"
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
            <h2 className="font-heading text-lg font-bold text-text">
              Please choose the cookies beactive can use
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Read more in our{' '}
              <Link href="/cookies" className="text-primary hover:text-primary-hover">
                cookie policy
              </Link>
              .
            </p>

            <div className="mt-5 space-y-4">
              {COOKIE_CATEGORIES.map((c) => (
                <div key={c.key} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-text">{c.title}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{c.description}</p>
                  </div>
                  <Toggle
                    label={c.title}
                    checked={c.locked ? true : prefs[c.key]}
                    disabled={c.locked}
                    onChange={(v) => setPrefs((p) => ({ ...p, [c.key]: v }))}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex h-10 items-center justify-center rounded-2xl border border-border px-4 text-sm font-medium text-text transition-colors hover:bg-primary-soft"
              >
                Accept all
              </button>
              <button type="button" onClick={savePrefs} className="btn-gradient h-10 rounded-2xl px-5 text-sm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
