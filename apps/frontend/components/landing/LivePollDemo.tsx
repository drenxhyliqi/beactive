'use client';

import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion';
import { ChevronUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge, type BadgeVariant } from '@beactive/ui';

type BarOption = { label: string; pct: number; votes: number; correct?: boolean };
type QaItem = { text: string; up: number };

type Scene =
  | { kind: 'Poll'; badge: BadgeVariant; question: string; options: BarOption[] }
  | { kind: 'Quiz'; badge: BadgeVariant; question: string; options: BarOption[] }
  | { kind: 'Q&A'; badge: BadgeVariant; question: string; items: QaItem[] };

const scenes: Scene[] = [
  {
    kind: 'Poll',
    badge: 'default',
    question: 'Which feature should we build next?',
    options: [
      { label: 'Mobile app', pct: 62, votes: 186 },
      { label: 'Integrations', pct: 24, votes: 72 },
      { label: 'Dark mode', pct: 14, votes: 42 },
    ],
  },
  {
    kind: 'Quiz',
    badge: 'default',
    question: 'What year did we launch?',
    options: [
      { label: '2019', pct: 18, votes: 54 },
      { label: '2021', pct: 67, votes: 201, correct: true },
      { label: '2023', pct: 15, votes: 45 },
    ],
  },
  {
    kind: 'Q&A',
    badge: 'default',
    question: 'Top questions from the room',
    items: [
      { text: 'Will the slides be shared afterwards?', up: 38 },
      { text: 'How do I join from my phone?', up: 21 },
      { text: 'Is there a recording?', up: 12 },
    ],
  },
];

/** Counts an integer up to `to` whenever it (re)mounts. */
function CountUp({ to }: { to: number }) {
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const controls = animate(mv, to, {
      duration: 1.1,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [to, mv]);
  return <>{val.toLocaleString()}</>;
}

function Bar({ option, delay }: { option: BarOption; delay: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className={option.correct ? 'font-semibold text-highlight' : 'text-text'}>
          {option.label}
        </span>
        <span className="tabular-nums text-text-secondary">
          <CountUp to={option.votes} />
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-primary-soft">
        <motion.div
          className={`h-full rounded-full ${option.correct ? 'bg-highlight' : 'bg-primary'}`}
          initial={{ width: 0 }}
          animate={{ width: `${option.pct}%` }}
          transition={{ duration: 1.1, ease: 'easeOut', delay }}
        />
      </div>
    </div>
  );
}

/**
 * Animated hero centerpiece: a glass "event" card that loops through interaction types, with
 * bars filling and votes counting up. Fully mocked client state — no API calls.
 */
export function LivePollDemo() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % scenes.length), 4200);
    return () => clearInterval(id);
  }, []);

  const scene = scenes[index]!;

  return (
    <div className="glass flex h-[400px] w-full max-w-md flex-col rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <Badge variant={scene.badge}>{scene.kind}</Badge>
        <span className="flex items-center gap-2 text-xs font-medium text-text-secondary">
          <span className="relative flex h-2 w-2">
            {/* <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" /> */}
            {/* <span className="relative inline-flex h-2 w-2 rounded-full bg-success" /> */}
          </span>
          <Users className="h-3.5 w-3.5" />
          247 joined
        </span>
      </div>

      <div className="relative mt-4 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <h3 className="font-heading text-lg font-bold text-text">{scene.question}</h3>

          {scene.kind === 'Q&A' ? (
            <ul className="mt-4 space-y-2.5">
              {scene.items.map((q) => (
                <li
                  key={q.text}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface/60 px-3 py-2.5"
                >
                  <span className="text-sm text-text">{q.text}</span>
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">
                    <ChevronUp className="h-3.5 w-3.5" />
                    <CountUp to={q.up} />
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 space-y-3.5">
              {scene.options.map((opt, i) => (
                <Bar key={opt.label} option={opt} delay={i * 0.08} />
              ))}
            </div>
          )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-1.5">
        {scenes.map((s, i) => (
          <span
            key={s.kind}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-5 bg-primary' : 'w-1.5 bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
