'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRoleStore } from '@/src/utils/store/useRoleStore';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { role } = useRoleStore();

  useEffect(() => {
    if (role !== 'admin') {
      router.replace('/gym');
    }
  }, [role, router]);

  return <>{children}</>;
}
