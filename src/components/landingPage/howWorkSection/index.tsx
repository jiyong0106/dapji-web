'use client';
import React from 'react';
import styles from './howWorkSection.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const cn = classNames.bind(styles);

const steps = [
  {
    icon: '/icon/chill.png',
    title: '영상 업로드',
    desc: '등반 영상을 쉽게 업로드할 수 있어요. 나만의 클라이밍 기록을 남기거나 다른 사람들과 함께 공유하며 소통해보세요.',
  },
  {
    icon: '/icon/chill.png',
    title: '암장별 필터',
    desc: '원하는 암장을 선택하면 그 암장에서 올라온 모든 문제 영상을 한눈에 볼 수 있어요. 익숙한 암장에서 다양한 문제를 탐색해보세요.',
  },
  {
    icon: '/icon/chill.png',
    title: '기록 저장',
    desc: '완등한 문제, 실패한 문제, 다시 도전하고 싶은 문제까지 모두 정리하고 저장할 수 있어요. 나의 성장 과정을 한 눈에 확인해보세요.',
  },
  {
    icon: '/icon/chill.png',
    title: '기록 저장',
    desc: '완등한 문제, 실패한 문제, 다시 도전하고 싶은 문제까지 모두 정리하고 저장할 수 있어요. 나의 성장 과정을 한 눈에 확인해보세요.',
  },
  {
    icon: '/icon/chill.png',
    title: '기록 저장',
    desc: '완등한 문제, 실패한 문제, 다시 도전하고 싶은 문제까지 모두 정리하고 저장할 수 있어요. 나의 성장 과정을 한 눈에 확인해보세요.',
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
          <div className={cn('imageWrapper')}>
            <Image
              src={step.icon}
              alt={step.title}
              fill
              // width={800}
              // height={450}
              className={cn('image')}
              priority
            />
          </div>
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
