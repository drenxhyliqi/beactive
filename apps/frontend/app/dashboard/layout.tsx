import type { ReactNode } from 'react';

/**
 * Dashboard shell (host-authenticated area). Navigation and host chrome will be
 * fleshed out in Step 3; for now it provides the structural wrapper only.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-6">
          <span className="font-heading text-lg font-bold text-primary">beactive</span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
