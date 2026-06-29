import { LivePollDemo } from './LivePollDemo';
import { Reveal } from './Reveal';

/**
 * Product preview: the animated live demo paired with the brand mantra, in a two-column layout
 * so neither side feels empty.
 */
export function LivePreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: copy + mantra */}
        <Reveal className="text-center lg:text-left">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            See it live
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Your audience, responding in real time
          </h2>
          <p className="mt-5 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-gradient">Ask.</span>{' '}
            <span className="text-gradient">Engage.</span>{' '}
            <span className="text-gradient">Decide.</span>
          </p>
          <p className="mx-auto mt-5 max-w-md text-text-secondary lg:mx-0">
            Every voice in the room, captured in the moment — and turned into something you can act
            on. Launch polls, quizzes, and Q&amp;A and watch the results land instantly.
          </p>
        </Reveal>

        {/* Right: animated demo */}
        <Reveal className="flex justify-center lg:justify-end">
          <LivePollDemo />
        </Reveal>
      </div>
    </section>
  );
}
