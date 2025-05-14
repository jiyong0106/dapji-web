'use client';
import MainNav from '@/src/components/common/mainNav';
import Toast from '@/src/components/common/toast';
import QueryProvider from '@/src/utils/QueryProvider';
import styles from './mainLayout.module.scss';
import classNames from 'classnames/bind';
import ModalChoice from '@/src/components/common/moadlChoice';
import SideBar from '@/src/components/common/sidebar';
import { usePathname } from 'next/navigation';
import { useMenuToggleStore } from '@/src/utils/store/useMenuTogglelStore';

const cn = classNames.bind(styles);

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const { toggle, toggleMenu } = useMenuToggleStore();

  return (
    <QueryProvider>
      <div className={cn('container')}>
        <div className={cn('header-container')}>
          <MainNav />
        </div>
        <div className={cn('secContainer')}>
          <SideBar />
          <div
            className={cn('content', {
              noSideBarContent: path === '/signin',
              hideSidebar: toggle === true,
            })}
          >
            {children}
          </div>
        </div>
        <Toast />
        <ModalChoice />
      </div>
    </QueryProvider>
  );
};

export default MainLayout;
