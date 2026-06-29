import type { Metadata } from 'next';
import { Placeholder } from '@/components/Placeholder';

export const metadata: Metadata = { title: 'Present' };

export default function PresentPage() {
  return (
    <Placeholder
      title="Live Presenter Panel"
      description="The host remote control with prominent QR + join code — built in Step 5."
    />
  );
}
