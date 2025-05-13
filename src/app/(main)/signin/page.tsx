'use client';
import classNames from 'classnames/bind';
import styles from './signInPage.module.scss';
import OauthBtnForm from '@/src/components/loginPage/oauthBtnForm';
import Image from 'next/image';
import LoginForm from '@/src/components/loginPage/loginForm';

const cn = classNames.bind(styles);

const SignInPage = () => {
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

export default SignInPage;
