import { Skeleton } from '@beactive/ui';

/** Skeleton shown while the dashboard segment loads — mirrors the event-list layout. */
export default function DashboardLoading() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-surface p-6">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-3 h-4 w-1/2" />
            <div className="mt-6 flex items-center gap-3">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
