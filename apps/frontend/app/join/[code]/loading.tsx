import { Skeleton } from '@beactive/ui';

/** Skeleton shown while the audience live screen connects — keeps the join feel instant. */
export default function JoinCodeLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-10">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="mt-3 h-4 w-1/2" />

        <div className="mt-8 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>

        <Skeleton className="mt-8 h-12 w-full rounded-xl" />
      </main>
    </div>
  );
}
