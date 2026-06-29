import type { ReactNode } from 'react';

interface PlaceholderProps {
  /** Route or page name shown prominently, e.g. "Landing". */
  title: string;
  /** Optional short note about what will live here. */
  description?: ReactNode;
}

/**
 * Temporary route placeholder used during incremental build-out. Each page renders
 * this until its dedicated build step arrives. No real data or API calls.
 */
export function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <span className="mb-3 inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
        coming soon
      </span>
      <h1 className="font-heading text-3xl font-bold text-text sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-md text-sm text-text-secondary">
        {description ?? 'This page will be built in an upcoming step.'}
      </p>
    </div>
  );
}
