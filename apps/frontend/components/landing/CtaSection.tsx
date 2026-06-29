import Link from 'next/link';
import { ArrowRight, QrCode } from 'lucide-react';
import { GlowBelow, GlowTint } from './GlowBelow';
import { Reveal } from './Reveal';

/** Closing call-to-action band, lit by a static purple glow shining up from below. */
export function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <GlowBelow className="inset-0" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-text sm:text-5xl">
            Ready to hear from the whole room?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-text-secondary">
            Spin up your first event in minutes. Your audience just scans and joins — no accounts,
            no downloads.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/register" className="btn-gradient group h-12 text-base">
              Create your first event
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/join" className="btn-glass h-12 text-base">
              <QrCode className="h-4 w-4" />
              Join with a code
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
