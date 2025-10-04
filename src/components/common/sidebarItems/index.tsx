'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './sidebarItems.module.scss';
import { useMenuToggleStore } from '@/src/utils/store/useMenuTogglelStore';
import SmartLink from '../smartLink';

const cn = classNames.bind(styles);

type SidebarItemsProps = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

const SidebarItem = ({ label, icon, path }: SidebarItemsProps) => {
  const pathname = usePathname();
  const isActive = pathname === path || pathname.startsWith(`${path}/`);
  const { toggle } = useMenuToggleStore();

  return (
    <SmartLink
      href={path}
      prefetch
      className={cn('item', {
        active: isActive,
        collapsed: toggle === true,
      })}
    >
      <div className={cn('icon')}>{icon}</div>
      <span className={cn('label', { togglelabel: toggle === true })}>
        {label}
      </span>
    </SmartLink>
  );
};

export default SidebarItem;
