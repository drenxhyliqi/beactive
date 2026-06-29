/**
 * Cookie-consent storage + shared config. The user's choice is persisted in a first-party cookie
 * (so it's remembered across visits and readable server-side later if needed). No third-party
 * scripts are loaded here — categories are gated by reading these prefs when analytics/ads are wired.
 */

export const CONSENT_COOKIE = 'beactive_cookie_consent';

/** Fired on `window` to (re)open the settings panel from anywhere — e.g. footer or /cookies. */
export const COOKIE_SETTINGS_EVENT = 'beactive:open-cookie-settings';

export interface CookiePrefs {
  /** Always true — the site can't function without these. */
  essential: boolean;
  analytics: boolean;
  ads: boolean;
}

export interface CookieCategory {
  key: keyof CookiePrefs;
  title: string;
  description: string;
  /** Locked on (essential) — shown with a disabled toggle. */
  locked?: boolean;
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    key: 'essential',
    title: 'Essential cookies',
    description:
      'Required for beactive to work — security, your session, and remembering your cookie choices. These can’t be turned off.',
    locked: true,
  },
  {
    key: 'analytics',
    title: 'Analytical cookies',
    description:
      'Help us understand how the site is used (anonymous, aggregated) so we can keep improving it.',
  },
  {
    key: 'ads',
    title: 'Advertising cookies',
    description: 'Let us show more relevant ads and measure how well they perform.',
  },
];

export function readConsent(): CookiePrefs | null {
  if (typeof document === 'undefined') return null;
  const entry = document.cookie.split('; ').find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!entry) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(entry.slice(CONSENT_COOKIE.length + 1)));
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      ads: Boolean(parsed.ads),
    };
  } catch {
    return null;
  }
}

export function writeConsent(prefs: CookiePrefs): void {
  if (typeof document === 'undefined') return;
  const value = encodeURIComponent(JSON.stringify({ ...prefs, essential: true }));
  const maxAge = 60 * 60 * 24 * 365; // remember for a year
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${maxAge}; samesite=lax${secure}`;
}

/** Re-open the cookie settings panel from anywhere (the CookieConsent component listens for this). */
export function openCookieSettings(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}
