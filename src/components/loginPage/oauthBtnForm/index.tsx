'use client';

import classNames from 'classnames/bind';
import styles from './oauthBtnForm.module.scss';
import { KakaoIcon } from '@/public/icon';
import OauthPopup from '@/src/components/loginPage/oauthPopup';
import OauthBtnStyle from '@/src/components/loginPage/oauthBtnStyle';
import Image from 'next/image';

const cn = classNames.bind(styles);

const OauthBtnForm = () => {
  const kakaoLogin = () => {
    OauthPopup('kakao');
  };

  const AppleLogin = () => {
    OauthPopup('apple');
  };

  return (
    <div className={cn('container')}>
      <OauthBtnStyle
        icon={<KakaoIcon width="27" height="27" />}
        text="Kakao 아이디 로그인"
        backColor="#F7E600"
        textColor="black"
        onClick={kakaoLogin}
      />
      <OauthBtnStyle
        icon={
          <Image
            src={process.env.NEXT_PUBLIC_URL + `/icon/applewhitepng.png`}
            width="24"
            height="27"
            alt="애플 로고"
          />
        }
        text="Apple 아이디 로그인"
        backColor="black"
        textColor="white"
        onClick={AppleLogin}
      />
    </div>
  );
};

export default OauthBtnForm;
