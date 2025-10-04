// src/components/common/TopProgressBar.tsx
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouteProgress } from '@/src/utils/store/useRouteProgress';

export default function TopProgressBar() {
  const pathname = usePathname();
  const { active, progress, tick, reset, done } = useRouteProgress();

  // 진행 중일 때 살살 증가(가짜 진행)
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => tick(3), 200); // 0.2초마다 +3
    return () => clearInterval(id);
  }, [active, tick]);

  // 경로가 바뀌면 완료 처리 후 잠깐 보여주고 숨김
  useEffect(() => {
    if (!active) return;
    done();
    const id = setTimeout(() => reset(), 300); // 0.3초 후 리셋
    return () => clearTimeout(id);
  }, [pathname]); // 경로 커밋 시점

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: active ? `${progress}%` : 0,
        transition: 'width 150ms ease',
        background:
          'linear-gradient(90deg, #38B6FF 0%, #6EE7F9 50%, #38B6FF 100%)',
        zIndex: 9999,
      }}
    />
  );
}
