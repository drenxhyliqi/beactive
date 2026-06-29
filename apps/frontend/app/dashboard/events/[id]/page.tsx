import type { Metadata } from 'next';
import { Placeholder } from '@/components/Placeholder';

export const metadata: Metadata = { title: 'Event' };

export default function EventDetailPage() {
  return (
    <Placeholder
      title="Event Detail"
      description="Manage interactions and view the QR + join code — built in Step 4."
    />
  );
}
