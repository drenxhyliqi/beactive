import { LoadingDots } from '@/components/LoadingDots';

/** Shown while the dashboard segment loads — centered in the content area below the chrome. */
export default function DashboardLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingDots />
    </div>
  );
}
