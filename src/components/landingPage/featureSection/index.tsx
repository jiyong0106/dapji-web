'use client';
import classNames from 'classnames/bind';
import styles from './featureSection.module.scss';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const cn = classNames.bind(styles);

const features = [
  {
    icon: '/images/chill.png',
    title: '암장별 필터',
    desc: '암장, 문제별로 영상을 탐색할 수 있어요.',
    backImage: '/images/mocde.png',
  },
  {
    icon: '/images/chill.png',
    title: '클라이밍 기록',
    desc: '완등 기록을 정리하고 저장할 수 있어요.',
    backImage: '/images/mocca.png',
  },
  {
    icon: '/images/chill.png',
    title: '프로필 관리',
    desc: '클라이머들과 소통해요.',
    backImage: '/images/mocpro.png',
  },
  {
    icon: '/images/moccom.png',
    title: '커뮤니티',
    desc: '번호로 원하는 문제를 빠르게 찾아요.',
    backImage: '/images/moccomu.png',
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
      <div className={cn('contentWrapper')}>
        {/* 왼쪽 카드 캐러셀 */}
        <div className={cn('carousel')}>
          {features.map((item, index) => (
            <div
              key={index}
              className={cn('cardWrapper', {
                tall: index % 2 === 0,
                short: index % 2 !== 0,
              })}
            >
              <div className={cn('card')}>
                <div className={cn('cardFace', 'front')}>
                  <div className={cn('imageWrapper')}></div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className={cn('cardFace', 'back')}>
                  <Image
                    src={item.backImage}
                    alt={`${item.title} back`}
                    fill
                    className={cn('image')}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽 텍스트 영역 */}
        <div className={cn('textBlock')}>
          <h3>등반 기록, 공유, 탐색까지</h3>
          <p>
            클라이머를 위한 기능을 한눈에 확인하고, 내가 찾던 문제를 빠르게
            찾아보세요. 커뮤니티와 기록 기능도 함께 제공합니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
