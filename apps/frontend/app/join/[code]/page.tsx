import type { Metadata } from 'next';
import { Placeholder } from '@/components/Placeholder';

export const metadata: Metadata = { title: 'Live' };

export default function JoinCodePage() {
  return (
    <Placeholder
      title="Live Interaction"
      description="The audience live experience — built in Step 6."
    />
  );
}
