import type { Metadata } from 'next';
import { Placeholder } from '@/components/Placeholder';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <Placeholder
      title="Dashboard"
      description="Your event list — built in Step 3."
    />
  );
}
