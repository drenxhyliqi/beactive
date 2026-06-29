import { LoadingDots } from '@/components/LoadingDots';

/** Default route-navigation fallback: centered bouncing dots. */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <LoadingDots />
    </div>
  );
}
