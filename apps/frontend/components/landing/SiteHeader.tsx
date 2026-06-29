'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from './Logo';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
  { href: '/join', label: 'Join an event' },
];

/** Modern floating pill navigation that gains glass + shadow on scroll, with a mobile menu. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
      <div className="mx-auto max-w-6xl">
        <div
          className={`flex items-center justify-between gap-4 rounded-full border bg-surface px-3 py-2 transition-all duration-300 sm:backdrop-blur-md ${
            scrolled
              ? 'border-transparent shadow-lg sm:bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]'
              : 'border-border/60 sm:bg-[color-mix(in_srgb,var(--surface)_50%,transparent)]'
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

            {/* Desktop auth actions */}
            <Link
              href="/auth/login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-primary-soft md:inline-flex"
            >
              Log in
            </Link>
            <Link href="/auth/register" className="btn-gradient hidden h-9 px-5 text-sm md:inline-flex">
              Sign up
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text transition-colors hover:bg-primary-soft md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {open && (
          <div
            id="mobile-menu"
            className="mt-2 rounded-2xl border border-border bg-surface p-3 shadow-lg md:hidden"
          >
            <nav className="flex flex-col">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-soft hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-full items-center justify-center rounded-full border border-border text-sm font-medium text-text transition-colors hover:bg-primary-soft"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setOpen(false)}
                className="btn-gradient h-10 w-full text-sm"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
