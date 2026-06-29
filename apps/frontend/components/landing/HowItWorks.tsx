import { ChevronRight, PencilRuler, QrCode, Radio, type LucideIcon } from 'lucide-react';
import { Reveal, RevealItem } from './Reveal';

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    title: 'Create your event',
    description: 'Sign up and build polls, quizzes, and Q&A before you go live — in minutes.',
    icon: PencilRuler,
  },
  {
    title: 'Share the QR + code',
    description:
      'Project the QR code and 6-character code. The audience scans or types it — no login needed.',
    icon: QrCode,
  },
  {
    title: 'Engage live',
    description:
      'Launch each interaction from your remote control and watch results update in real time.',
    icon: Radio,
  },
];

/** Modern three-card "how it works" flow with gradient icon tiles and connector chevrons. */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-y border-border bg-background"
    >
      {/* Soft premium backdrop glow at the top of the section (gradient only — no costly blur). */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[64rem] max-w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] opacity-70"
        style={{ background: 'radial-gradient(closest-side, var(--primary-soft), transparent 78%)' }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wide text-text-secondary">
            How it works
          </span>
          <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
            From idea to live in three steps
          </h2>
          <p className="mt-4 text-text-secondary">
            No installs, no friction — go from a blank event to a room full of responses.
          </p>
        </Reveal>

        <Reveal group className="mt-16 grid gap-6 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <RevealItem key={step.title} className="relative h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--primary)_45%,transparent)] hover:shadow-[0_28px_70px_-28px_color-mix(in_srgb,var(--primary)_45%,transparent)]">
                  {/* Faded watermark step number. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-1 -top-3 select-none font-heading text-7xl font-extrabold leading-none text-primary-soft"
                  >
                    0{i + 1}
                  </span>

                  {/* Gradient icon tile. */}
                  <span
                    className="relative flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-[0_8px_20px_-6px_color-mix(in_srgb,var(--primary)_55%,transparent)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="relative mt-6 font-heading text-lg font-bold text-text">
                    {step.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>

                {/* Connector chevron pointing to the next card (desktop only). */}
                {i < steps.length - 1 && (
                  <ChevronRight
                    aria-hidden
                    className="absolute left-full top-1/2 hidden h-5 w-5 -translate-y-1/2 translate-x-0.5 text-text-secondary lg:block"
                  />
                )}
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
