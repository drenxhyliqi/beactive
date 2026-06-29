'use client';

import {
  BarChart3,
  Check,
  ChevronUp,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import { type MouseEvent, type ReactNode } from 'react';
import { Badge, type BadgeVariant } from '@beactive/ui';
import { Reveal, RevealItem } from './Reveal';

interface InteractionItem {
  name: string;
  icon: LucideIcon;
  label: string;
  labelVariant: BadgeVariant;
  description: string;
  preview: ReactNode;
  /** Tailwind grid span classes for the bento layout. */
  span?: string;
}

/* -------------------------------------------------------------------------- */
/*  Per-interaction mini previews — small, palette-only illustrations that     */
/*  give each card its own identity and come alive on hover.                   */
/* -------------------------------------------------------------------------- */

function PollPreview() {
  const rows = [
    { label: 'In person', w: 'w-[84%]', pct: 84, strong: true },
    { label: 'Remote', w: 'w-[48%]', pct: 48 },
    { label: 'Hybrid', w: 'w-[27%]', pct: 27 },
  ];
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="mb-1 flex items-center justify-between text-xs text-text-secondary">
            <span>{r.label}</span>
            <span className="tabular-nums">{r.pct}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-primary-soft">
            <div
              className={`h-full origin-left scale-x-[0.92] rounded-full ${r.w} ${
                r.strong ? 'bg-gradient-to-r from-primary to-accent' : 'bg-primary-light'
              } transition-transform duration-700 ease-out group-hover:scale-x-100`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function QaPreview() {
  const items = [
    { q: 'How will this scale to 5k people?', v: 24 },
    { q: 'Is there an API for results?', v: 12 },
  ];
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div
          key={it.q}
          className={`flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2 ${
            i === 0 ? 'transition-transform duration-300 group-hover:-translate-y-0.5' : ''
          }`}
        >
          <span className="flex flex-col items-center rounded-md bg-primary-soft px-1.5 py-0.5 font-bold leading-none text-primary">
            <ChevronUp className="h-3 w-3" />
            <span className="text-[10px] tabular-nums">{it.v}</span>
          </span>
          <span className="truncate text-xs text-text-secondary">{it.q}</span>
        </div>
      ))}
    </div>
  );
}

function QuizPreview() {
  const opts = [
    { t: 'Paris', ok: true },
    { t: 'Rome', ok: false },
    { t: 'Berlin', ok: false },
    { t: 'Madrid', ok: false },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {opts.map((o) => (
        <div
          key={o.t}
          className={`flex items-center justify-between rounded-lg border px-2.5 py-2 text-xs transition-colors ${
            o.ok
              ? 'border-[color-mix(in_srgb,var(--primary)_40%,transparent)] bg-primary-soft text-primary'
              : 'border-border bg-background text-text-secondary'
          }`}
        >
          <span className="truncate">{o.t}</span>
          {o.ok && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
        </div>
      ))}
    </div>
  );
}

function IdeaPreview() {
  const notes = [
    { t: 'Faster onboarding', r: '-rotate-2' },
    { t: 'Dark mode', r: 'rotate-1' },
    { t: 'Offline mode', r: '-rotate-1' },
  ];
  return (
    <div className="flex gap-2">
      {notes.map((n) => (
        <div
          key={n.t}
          className={`flex-1 rounded-lg border border-border bg-background p-2 text-[11px] leading-tight text-text-secondary transition-transform duration-300 group-hover:rotate-0 ${n.r}`}
        >
          <Lightbulb className="mb-1 h-3 w-3 text-warning" />
          {n.t}
        </div>
      ))}
    </div>
  );
}

function ChoicePreview() {
  const opts = [
    { k: 'A', t: 'True', ok: true },
    { k: 'B', t: 'False', ok: false },
  ];
  return (
    <div className="space-y-2">
      {opts.map((o) => (
        <div
          key={o.k}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
            o.ok
              ? 'border-[color-mix(in_srgb,var(--primary)_40%,transparent)] bg-primary-soft text-primary'
              : 'border-border bg-background text-text-secondary'
          }`}
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold ${
              o.ok ? 'bg-primary text-white' : 'border border-border bg-surface text-text-secondary'
            }`}
          >
            {o.k}
          </span>
          <span>{o.t}</span>
          {o.ok && <Check className="ml-auto h-3.5 w-3.5" />}
        </div>
      ))}
    </div>
  );
}

const interactions: InteractionItem[] = [
  {
    name: 'Poll',
    icon: BarChart3,
    label: 'Live results',
    labelVariant: 'default',
    description: 'Ask a question and watch votes fill in as a live bar chart.',
    preview: <PollPreview />,
    span: 'sm:col-span-2 lg:col-span-2',
  },
  {
    name: 'Q&A',
    icon: MessagesSquare,
    label: 'Moderated',
    labelVariant: 'default',
    description: 'The audience submits questions anonymously and upvotes the best ones.',
    preview: <QaPreview />,
  },
  {
    name: 'Quiz',
    icon: Trophy,
    label: 'Timed',
    labelVariant: 'default',
    description: 'Kahoot-style rounds with timers, speed scoring, and a live leaderboard.',
    preview: <QuizPreview />,
  },
  {
    name: 'Idea Wall',
    icon: Lightbulb,
    label: 'Collaborative',
    labelVariant: 'default',
    description: 'Collect free-text ideas as cards the whole room can upvote.',
    preview: <IdeaPreview />,
  },
  {
    name: 'Multiple Choice',
    icon: ListChecks,
    label: 'Reveal',
    labelVariant: 'default',
    description: 'A single correct answer, revealed the moment voting closes.',
    preview: <ChoicePreview />,
  },
];

/** Tracks the cursor within a card so the spotlight glow can follow it. */
function handleSpotlight(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

function InteractionCard({ item }: { item: InteractionItem }) {
  const Icon = item.icon;
  return (
    <RevealItem className={`h-full ${item.span ?? ''}`}>
      <div
        onMouseMove={handleSpotlight}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--primary)_40%,transparent)] hover:shadow-[0_24px_60px_-24px_color-mix(in_srgb,var(--primary)_45%,transparent)]"
      >
        {/* Cursor-following spotlight + top hairline, both revealed on hover. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(240px circle at var(--mx, 50%) var(--my, 0px), color-mix(in srgb, var(--primary) 13%, transparent), transparent 60%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </span>
          <Badge variant={item.labelVariant}>{item.label}</Badge>
        </div>

        <h3 className="relative mt-4 font-heading text-lg font-bold text-text">{item.name}</h3>
        <p className="relative mt-2 text-sm text-text-secondary">{item.description}</p>

        <div className="relative mt-auto pt-6">{item.preview}</div>
      </div>
    </RevealItem>
  );
}

/** Bento grid introducing the five interaction types, each with a live mini preview. */
export function InteractionShowcase() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wide text-text-secondary">
          Interactions
        </span>
        <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Five ways to bring the room in
        </h2>
        <p className="mt-4 text-text-secondary">
          Mix and match interactions in a single event, and control each one live.
        </p>
      </Reveal>

      <Reveal group className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {interactions.map((item) => (
          <InteractionCard key={item.name} item={item} />
        ))}
      </Reveal>
    </section>
  );
}
