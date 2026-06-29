import type { Metadata } from 'next';
import { Placeholder } from '@/components/Placeholder';

export const metadata: Metadata = { title: 'Join' };

export default function JoinPage() {
  return (
    <Placeholder
      title="Join an Event"
      description="Enter your 6-character code to join — built in Step 6."
    />
  );
}
