'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function RootPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // Redirect based on auth status
    if (user) {
      router.push('/projects');
    } else {
      router.push('/login');
    }
  }, [user, router]);

  // Show nothing while redirecting
  return null;
}
