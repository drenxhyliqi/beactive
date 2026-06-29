'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@beactive/ui';
import { Logo } from '@/components/landing/Logo';
import { GoogleIcon } from '@/components/GoogleIcon';

/** Format a raw code into spaced pairs for display: "X4K9P2" → "X4 K9 P2". */
function formatCode(raw: string): string {
  return raw.replace(/(.{2})/g, '$1 ').trim();
}

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Host signup page (mock-first): a participant code panel on the left and the host sign-up form
 * on the right with a "Sign up with Google" option. No real network calls yet — the Google and
 * submit handlers are ready stubs to be wired to the backend in a later step.
 */
export function RegisterView() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [form, setForm] = useState<SignupForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  function update<K extends keyof SignupForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleJoin(e: FormEvent) {
    e.preventDefault();
    if (code.length === 6) router.push(`/join/${code}`);
  }

  function handleGoogle() {
    // TODO: redirect to the backend Google OAuth flow once auth is wired
    // (e.g. window.location.href = `${API_BASE_URL}/auth/google`). Stub for now.
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: create the host account via lib/api.ts once the backend is wired. Stub for now.
  }

  const inputClass =
    'h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-text transition-colors placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_35%,transparent)]';

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Left: participant join panel (brand gradient) — desktop only. */}
      <aside
        className="relative hidden flex-col justify-center overflow-hidden px-12 py-16 text-white lg:flex"
        style={{
          backgroundImage:
            'linear-gradient(150deg, var(--primary-hover) 0%, var(--primary) 55%, var(--accent) 100%)',
        }}
      >
        {/* soft light from below, matching the landing language */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-12rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, var(--primary-light), transparent 75%)' }}
        />

        <div className="relative max-w-sm">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Joining as a participant?
          </h2>
          <p className="mt-3 text-white/80">No account needed.</p>

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
              className="h-14 w-full rounded-full bg-white pl-6 pr-16 text-lg font-semibold uppercase tracking-[0.2em] text-primary placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-[color-mix(in_srgb,var(--primary)_45%,transparent)] focus:outline-none"
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

      {/* Right: host signup form. */}
      <section className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <Logo className="h-8 w-auto" />

          <h1 className="mt-8 font-heading text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Sign up as a host
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-primary hover:text-primary-hover">
              Log in
            </Link>
          </p>

          {/* Google signup */}
          <button
            type="button"
            onClick={handleGoogle}
            className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-surface text-sm font-semibold text-text transition-colors hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <GoogleIcon />
            Sign up with Google
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First name
                </label>
                <input
                  id="firstName"
                  autoComplete="given-name"
                  required
                  placeholder="First name *"
                  value={form.firstName}
                  onChange={(e) => update('firstName', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last name
                </label>
                <input
                  id="lastName"
                  autoComplete="family-name"
                  required
                  placeholder="Last name *"
                  value={form.lastName}
                  onChange={(e) => update('lastName', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Work email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Your work email *"
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
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="Password *"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                className={inputClass}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Create account
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-text-secondary">
            By creating an account, you agree to our{' '}
            <Link href="#" className="text-primary hover:text-primary-hover">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
