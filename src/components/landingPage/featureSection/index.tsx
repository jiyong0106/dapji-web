'use client';
import classNames from 'classnames/bind';
import styles from './featureSection.module.scss';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const cn = classNames.bind(styles);

const features = [
  {
    icon: '/images/chill.png',
    title: '영상 업로드',
    desc: '등반 영상을 쉽게 업로드할 수 있어요.',
  },
  {
    icon: '/images/chill.png',
    title: '암장별 필터',
    desc: '암장, 문제별로 영상을 탐색할 수 있어요.',
  },
  {
    icon: '/images/chill.png',
    title: '기록 저장',
    desc: '완등 기록을 정리하고 저장할 수 있어요.',
  },
  {
    icon: '/images/chill.png',
    title: '좋아요 & 댓글',
    desc: '클라이머들과 소통해요.',
  },
  {
    icon: '/images/chill.png',
    title: '문제 검색',
    desc: '번호로 원하는 문제를 빠르게 찾아요.',
  },
];

const FeatureSection = () => {
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
      <h2 className={cn('title')}>답지, 이런 기능이 있어요</h2>
      <div className={cn('carousel')}>
        {features.map((item, index) => (
          <div key={index} className={cn('card')}>
            <div className={cn('imageWrapper')}>
              <Image
                src={item.icon}
                alt={item.title}
                fill
                className={cn('image')}
                priority
              />
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
