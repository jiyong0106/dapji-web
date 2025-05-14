'use client';
import MainNav from '@/src/components/common/mainNav';
import Toast from '@/src/components/common/toast';
import QueryProvider from '@/src/utils/QueryProvider';
import styles from './mainLayout.module.scss';
import classNames from 'classnames/bind';
import SideBar from '@/src/components/common/sidebar';
import { usePathname } from 'next/navigation';
import { useMenuToggleStore } from '@/src/utils/store/useMenuTogglelStore';
import ModalChoice from '@/src/components/common/moadlChoice';

const cn = classNames.bind(styles);

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const { toggle, toggleMenu } = useMenuToggleStore();
  console.log(toggle);
  return (
    <QueryProvider>
      <div className={cn('container')}>
        <div className={cn('header-container')}>
          <MainNav />
        </div>
        <div className={cn('secContainer')}>
          <SideBar />

          {/* 오버레이 */}
          <div
            className={cn('backdrop', { active: !toggle })}
            onClick={toggleMenu}
          />

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
