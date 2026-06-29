'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Reveal } from './Reveal';

const faqs = [
  {
    q: 'Do attendees need an account?',
    a: 'No. Your audience joins anonymously by scanning a QR code or typing the 6-character event code — no sign-up, no app download.',
  },
  {
    q: 'How do people join an event?',
    a: 'Project the QR code and code from your presenter screen. Attendees scan it or enter the code at beactive.co/join and they are in instantly.',
  },
  {
    q: 'What can I run during an event?',
    a: 'Polls, anonymous Q&A with upvotes, Kahoot-style quizzes with a live leaderboard, idea walls, and multiple-choice questions — mixed in any order.',
  },
  {
    q: 'Can I control everything live?',
    a: 'Yes. A presenter remote lets you launch and end each interaction on cue, and results update on the big screen in real time.',
  },
  {
    q: 'Is it free to start?',
    a: 'Creating an account and building your first event is free. You only need a login as a host — your audience never does.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <Reveal className="mb-10 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Questions, answered
        </h2>
      </Reveal>

      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-primary-soft/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              >
                <span className="font-medium text-text">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-primary"
                  aria-hidden
                >
                  <Plus className="h-5 w-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-text-secondary">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
