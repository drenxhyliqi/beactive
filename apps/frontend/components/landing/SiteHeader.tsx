'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from './Logo';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
  { href: '/join', label: 'Join an event' },
];

/** Modern floating pill navigation that gains glass + shadow on scroll. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-300 ${
          scrolled
            ? 'glass border-transparent shadow-lg'
            : 'border-border/60 bg-surface/50 backdrop-blur-md'
        }`}
      >
        <Link href="/" aria-label="beactive home" className="flex items-center pl-2">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-soft hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-primary-soft sm:inline-flex"
          >
            Log in
          </Link>
          <Link href="/auth/register" className="btn-gradient h-9 px-5 text-sm">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
