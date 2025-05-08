'use client';
import MainNav from '@/src/components/common/mainNav';
import Toast from '@/src/components/common/toast';
import QueryProvider from '@/src/utils/QueryProvider';
import styles from './mainLayout.module.scss';
import classNames from 'classnames/bind';
import ModalChoice from '@/src/components/common/moadlChoice';
import SideBar from '@/src/components/common/sidebar';

const cn = classNames.bind(styles);

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <div className={cn('container')}>
        <div className={cn('header-container')}>
          <MainNav />
        </div>
        <div className={cn('secContainer')}>
          <SideBar />
          <div className={cn('content')}>{children}</div>
        </div>
        <Toast />
        <ModalChoice />
      </div>
    </QueryProvider>
  );
};

export default MainLayout;
