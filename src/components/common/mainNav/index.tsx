'use client';
import classNames from 'classnames/bind';
import styles from './mainNav.module.scss';
import Image from 'next/image';
import { mainHeaderOptions } from '@/src/utils/options/landingOptions';
import { useRouter } from 'next/navigation';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { fetchUserLogout } from '@/src/app/(main)/profile/api';
import { useModal } from '@/src/hooks/useModal';
import { useEffect } from 'react';
import { fetchMyInfo } from '@/src/app/(main)/auth/api';

const cn = classNames.bind(styles);

const MainNav = () => {
  const { myId, setmyId } = useMyInfoStore();
  const { showModalHandler } = useModal();
  const router = useRouter();

  const handleLogoutClick = () => {
    const confirmAction = async () => {
      try {
        await fetchUserLogout();
        setmyId(null);
        router.replace('/signin');
      } catch (error) {
        console.error('로그아웃 실패', error);
      }
    };

    showModalHandler('choice', '로그아웃 하시겠어요?', confirmAction);
  };

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const data = await fetchMyInfo();
        if (data) {
          setmyId(data);
        }
      } catch (error) {
        console.error('my info error');
      }
    };

    getMyInfo();
  }, [setmyId]);

  return (
    <nav className={cn('container')}>
      <a
        className={cn('left')}
        href={process.env.NEXT_PUBLIC_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={process.env.NEXT_PUBLIC_URL + '/icon/btransparent.png'}
          alt="로고이미지"
          width={60}
          height={60}
          className={cn('logo')}
          priority
        />
        <p className={cn('leftText')}>DAPJI</p>
      </a>

      <div className={cn('right')}>
        <p
          className={cn('downloadBtn')}
          onClick={() => {
            myId ? handleLogoutClick() : router.push('/signin');
          }}
        >
          {myId === null ? '로그인' : '로그아웃'}
        </p>
      </div>
    </nav>
  );
};

export default MainNav;
