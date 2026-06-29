'use client';

import { openCookieSettings } from '@/lib/cookie-consent';

/** Re-opens the cookie settings panel (handled by the CookieConsent component in the layout). */
export function ManageCookiesButton() {
  return (
    <button type="button" onClick={openCookieSettings} className="btn-gradient h-11 rounded-2xl px-6 text-sm">
      Manage cookie settings
    </button>
  );
}
