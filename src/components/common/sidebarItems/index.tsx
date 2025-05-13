// components/common/sidebarItems.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './sidebarItems.module.scss';

const cn = classNames.bind(styles);

type SidebarItemsProps = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

const SidebarItem = ({ label, icon, path }: SidebarItemsProps) => {
  const pathname = usePathname();
  const isActive = pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Link href={path} className={cn('item', { active: isActive })}>
      <div className={cn('icon')}>{icon}</div>
      <span className={cn('label')}>{label}</span>
    </Link>
  );
};

export default SidebarItem;
