import type { Metadata } from 'next';
import { RegisterView } from '@/components/auth/RegisterView';

export const metadata: Metadata = { title: 'Sign up' };

export default function RegisterPage() {
  return <RegisterView />;
}
