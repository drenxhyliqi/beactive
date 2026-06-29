import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { CookieConsent } from '@/components/cookies/CookieConsent';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

// Absolute base for Open Graph / canonical URLs. Uses an explicit site URL when set,
// otherwise the Vercel-provided deployment URL, falling back to localhost in dev.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'beactive — Live audience interaction',
    template: '%s · beactive',
  },
  description:
    'Turn any audience into a conversation. Run polls, Q&A, quizzes, and idea walls that people join by scanning a QR code — no logins, no downloads.',
  keywords: [
    'live polling',
    'audience interaction',
    'Q&A',
    'live quiz',
    'event engagement',
    'Slido alternative',
  ],
  openGraph: {
    title: 'beactive — Live audience interaction',
    description:
      'Polls, Q&A, quizzes, and idea walls your audience joins by scanning a QR code. No logins, no downloads.',
    siteName: 'beactive',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
