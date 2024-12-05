'use client';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import OauthBtnForm from '@/src/components/loginPage/oauthBtnForm';
import Image from 'next/image';
import { useEffect } from 'react';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { useRouter } from 'next/navigation';
import { fetchMyInfo } from '../auth/api';
import LoginForm from '@/src/components/loginPage/loginForm';

const cn = classNames.bind(styles);

const Home = () => {
  const { myId, setmyId } = useMyInfoStore();
  const router = useRouter();

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const data = await fetchMyInfo();
        if (data) {
          setmyId(data);
          router.push('/gym'); // 성공적으로 데이터를 가져오면 이동
        }
      } catch (error) {
        console.error('my info error', error);
      }
    };

    getMyInfo();
  }, []);

  return (
    <div className={cn('container')}>
      <div className={cn('loginContaienr')}>
        <div className={cn('loginheader')}>
          <p className={cn('headerText')}>힘이들 땐, 답지를 봐!</p>
          <Image
            src={process.env.NEXT_PUBLIC_URL + `/icon/dapjilogo.svg`}
            width={300}
            height={60}
            alt="답지 메인 로고"
            priority
          />
        </div>
        <LoginForm />
      </div>
      <div className={cn('oauthContaienr')}>
        <p className={cn('oauth')}>소셜 계정으로 간편 로그인</p>
        <OauthBtnForm />
      </div>
    </div>
  );
};

export default Home;
