'use client';
import MainNav from '@/src/components/common/mainNav';
import Toast from '@/src/components/common/toast';
import QueryProvider from '@/src/utils/QueryProvider';
import styles from './mainLayout.module.scss';
import classNames from 'classnames/bind';
import useScrollDirection from '@/src/hooks/useScrollDirection';
import ModalChoice from '@/src/components/common/moadlChoice';

const cn = classNames.bind(styles);

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [scrollDirection] = useScrollDirection('up');

  return (
    <QueryProvider>
      <div className={cn('container')}>
        <div
          className={cn('header-container', {
            up: scrollDirection === 'up',
            down: scrollDirection === 'down',
          })}
        >
          <MainNav />
        </div>
        <Toast />
        <div className={cn('secContainer')}>{children}</div>
        <ModalChoice />
        <div className={cn('scrollWrapper')}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑
          </button>
          <button
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
              })
            }
          >
            ↓
          </button>
        </div>
      </div>
    </QueryProvider>
  );
};

export default MainLayout;
