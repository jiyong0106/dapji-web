'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './sidebarItems.module.scss';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';

const cn = classNames.bind(styles);

type SidebarItemsProps = {
  label: string;
  icon: React.ReactNode;
  path: string | ((id: number) => string);
};

const SidebarItem = ({ label, icon, path }: SidebarItemsProps) => {
  const { myId } = useMyInfoStore();
  const pathname = usePathname();
  const resolvedPath = typeof path === 'function' ? path(myId) : path;
  const isActive =
    pathname === resolvedPath || pathname.startsWith(`${resolvedPath}/`);

  return (
    <Link href={resolvedPath} className={cn('item', { active: isActive })}>
      <div className={cn('icon')}>{icon}</div>
      <span className={cn('label')}>{label}</span>
    </Link>
  );
};

export default SidebarItem;
