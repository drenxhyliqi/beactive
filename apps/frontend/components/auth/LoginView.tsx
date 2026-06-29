'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Button } from '@beactive/ui';
import { Logo } from '@/components/landing/Logo';
import { GoogleIcon } from '@/components/GoogleIcon';
import { AuthAside } from '@/components/auth/AuthAside';

/**
 * Host login page (mock-first): the shared participant code panel on the left and the host log-in
 * form on the right with a "Log in with Google" option. No real network calls yet — the Google and
 * submit handlers are ready stubs to be wired to the backend in a later step.
 */
export function LoginView() {
  const [form, setForm] = useState({ email: '', password: '' });

  function update(key: 'email' | 'password', value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleGoogle() {
    // TODO: redirect to the backend Google OAuth flow once auth is wired
    // (e.g. window.location.href = `${API_BASE_URL}/auth/google`). Stub for now.
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: authenticate via lib/api.ts once the backend is wired. Stub for now.
  }

  const inputClass =
    'h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-text transition-colors placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_35%,transparent)]';

  return (
    <main className="relative grid min-h-screen lg:grid-cols-2">
      <AuthAside />

      {/* Right: host login form. */}
      <section className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <Logo className="h-8 w-auto" />

          <h1 className="mt-8 font-heading text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/register"
              className="font-medium text-primary hover:text-primary-hover"
            >
              Sign up
            </Link>
          </p>

          {/* Google login */}
          <button
            type="button"
            onClick={handleGoogle}
            className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-surface text-sm font-semibold text-text transition-colors hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <GoogleIcon />
            Log in with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">
              or
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email *"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password *"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                className={inputClass}
              />
              <div className="mt-1.5 text-right">
                <Link
                  href="#"
                  className="text-xs font-medium text-primary hover:text-primary-hover"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Log in
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
