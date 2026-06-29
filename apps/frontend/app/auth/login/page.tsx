import type { Metadata } from 'next';
import { Placeholder } from '@/components/Placeholder';

export const metadata: Metadata = { title: 'Login' };

export default function LoginPage() {
  return (
    <Placeholder
      title="Host Login"
      description="Sign in to your host account — built in Step 2."
    />
  );
}
