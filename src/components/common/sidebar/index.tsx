'use client';
import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import SidebarItems from '../sidebarItems';
import { pageMenuItems } from '@/src/utils/options/sidebarOptions';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { usePathname } from 'next/navigation';
import { useMenuToggleStore } from '@/src/utils/store/useMenuTogglelStore';

const cn = classNames.bind(styles);

const SideBar = () => {
  const path = usePathname();
  const { myId } = useMyInfoStore();
  const { toggle } = useMenuToggleStore();

  if (path === '/signin') {
    return null;
  }

  return (
    <div className={cn('container', { hideSidebar: toggle === true })}>
      <nav>
        {pageMenuItems(myId).map((item) => (
          <SidebarItems key={item.label} {...item} />
        ))}
      </nav>
      <div className={cn('divider')} />
    </div>
  );
};

export default SideBar;
