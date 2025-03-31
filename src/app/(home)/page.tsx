'use client';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import HeroSection from '@/src/components/landingPage/heroSection';
import MainSection from '@/src/components/landingPage/mainSection';
import HowWorkSection from '@/src/components/landingPage/howWorkSection';
import { useEffect, useState } from 'react';
import LandingHeader from '@/src/components/landingPage/landingHeader';
import FeatureSection from '@/src/components/landingPage/featureSection';

const cn = classNames.bind(styles);

const HomePage = () => {
  //스크롤에 따른 페이지 진행률 구현
  //1. 윈도우 높이,
  //

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    //document.body.scrollHeight 페이지의 전체 높이.
    //window.innerHeight 지금 화면에 보이는 높이.
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      //document.body.scrollHeight : 전체 페이지 높이에서, 지금 보이는 화면 높이를 뺌뺌 → 스크롤할 수 있는 전체 거리
      //window.innerHeight : 현재 브라우저 창의 높이
      //totalHeight 전체에서 현재 화면을 뺀 스크롤 가능한 나머지 거리

      const currentScroll = (window.scrollY / totalHeight) * 100;
      //window.scrollY 내가 얼마나 스크롤 했는지, 0,100,150 이렇게 나옴옴
      //지금 스크롤한 거리 / 전체 스크롤 가능한 거리 × 100
      //%로 계산

      setScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn('container')}>
      <LandingHeader />
      <div className={cn('progress')} style={{ width: `${scroll}%` }} />
      <HeroSection />
      <MainSection />
      <FeatureSection />
      <HowWorkSection />
    </div>
  );
};

export default HomePage;

//처음엔 화면에 나타나고
//그뒤에는 밑에서 올라오는 느낌낌
// 1. 브랜드 철학 (지금 있는 구간)
// ↓
// 2. 어떤 기능이 있는지 소개 (아이콘 + 텍스트) 캐러셀
// ↓
// 3. 영상 미리보기 or 인기 콘텐츠
// ↓
// 4. 사용 방법 (Step1~3) 여기 카드형식
// ↓
// 5. CTA (앱 다운로드, 회원가입 등)
