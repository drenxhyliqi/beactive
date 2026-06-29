import Link from 'next/link';
import { ArrowRight, QrCode } from 'lucide-react';
import { GlowBelow, GlowTint } from './GlowBelow';
import { FloatingQuotes } from './FloatingQuotes';
import { Reveal } from './Reveal';

/**
 * Centered hero: a static purple light shining up from below the headline (paired with the page
 * grain), floating pain-point quote cards that pop on hover, a split headline whose accent word
 * shifts color on hover, and two pill CTAs.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <GlowBelow className="inset-0" />
      <FloatingQuotes />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 text-center sm:py-36">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-text-secondary backdrop-blur">
            {/* <span className="h-2 w-2 rounded-full bg-success" /> */}
            Live audience interaction — no app required
          </span>

          <h1 className="mx-auto mt-8 max-w-6xl font-heading text-[clamp(3.5rem,9vw,7rem)] font-extrabold leading-[1] tracking-tight text-text sm:leading-[0.98]">
            Turn the{" "}
            <span className="text-gradient cursor-default">silence</span>
            <br className="hidden sm:block" /> into a{" "}
            <span className="text-gradient cursor-default">conversation.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-sm sm:text-base lg:text-lg text-text-secondary">
            From all-hands and classrooms to conferences and workshops, beactive turns
            passive audiences into live conversations — polls, Q&amp;A, quizzes, and
            idea walls people join by scanning a QR code.
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

      {/* Soft sheen above the text so the light from below appears to graze the headline. */}
      <GlowTint className="top-[90%] z-20 h-72 w-[44rem] max-w-[120%] -translate-y-1/2 opacity-5" />
    </section>
  );
}
