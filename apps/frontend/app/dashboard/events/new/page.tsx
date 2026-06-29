import type { Metadata } from 'next';
import { Placeholder } from '@/components/Placeholder';

export const metadata: Metadata = { title: 'New Event' };

export default function NewEventPage() {
  return (
    <Placeholder
      title="Create Event"
      description="Create a new event — built in Step 4."
    />
  );
}
