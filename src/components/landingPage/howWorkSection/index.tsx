'use client';
import styles from './howWorkSection.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const cn = classNames.bind(styles);

const steps = [
  {
    icon: '/images/cardli5.jpg',
    title: '암장별 필터',
    desc: '원하는 암장을 선택하면 그 암장에서 올라온 모든 문제 영상을 한눈에 볼 수 있어요. 익숙한 암장에서 다양한 문제를 탐색해보세요.',
  },
  {
    icon: '/images/cardli9.png',
    title: '답지 업로드',
    desc: '등반 영상을 쉽게 업로드할 수 있어요. 나만의 클라이밍 기록을 남기거나 다른 사람들과 함께 공유하며 소통해보세요.',
  },
  {
    icon: '/images/cardli6.png',
    title: '클라이밍 기록',
    desc: '운동 기록을 정리하고, 앞으로의 일정을 계획해보세요.  내가 어디서, 얼마나 성장해왔는지 한눈에 확인할 수 있어요.',
  },
  {
    icon: '/images/cardli7.jpg',
    title: '프로필 꾸미기',
    desc: '내 키와 리치, 등반 스타일, 영상까지 한눈에!  클라이머로서의 나를 소개하고, 기록을 보여주세요.',
  },
  {
    icon: '/images/cardli8.jpg',
    title: '답지 커뮤니티',
    desc: '답지 커뮤니티는 클라이머들의 아지트예요.  운동 얘기도, 잡담도, 공감도 함께 나눌 수 있어요.',
  },
];

const HowWorkSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={ref} className={cn('container', { animate: isVisible })}>
      {steps.map((step, idx) => (
        <div key={idx} className={cn('row', { reverse: idx % 2 === 1 })}>
          <Image
            src={step.icon}
            alt={step.title}
            className={cn('image')}
            width={100}
            height={100}
            priority
          />
          <div className={cn('text')}>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HowWorkSection;
