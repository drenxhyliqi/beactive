import type { Metadata } from 'next';
import { Placeholder } from '@/components/Placeholder';

export const metadata: Metadata = { title: 'Register' };

export default function RegisterPage() {
  return (
    <Placeholder
      title="Host Registration"
      description="Create a host account — built in Step 2."
    />
  );
}
