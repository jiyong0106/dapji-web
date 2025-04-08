'use client';
import classNames from 'classnames/bind';
import styles from './featureSection.module.scss';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { landingFeaturesOptions } from '@/src/utils/options/landingOptions';

const cn = classNames.bind(styles);

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
    <section id="features" ref={ref} className={cn('container')}>
      <div className={cn('contentWrapper', { animate: isVisible })}>
        <h3 className={cn('title')}>클라이머를 위한 필수 기능 모음</h3>
        <p className={cn('subtitle')}>
          다른 클라이머의 루트를 확인하고, 빠르게 감 잡아보세요. 기록과 공유까지
          한 번에!
        </p>

        <div className={cn('cardGrid', { animate: isVisible })}>
          {landingFeaturesOptions.map((item, index) => (
            <div key={index} className={cn('cardWrapper', `item${index + 1}`)}>
              <div className={cn('card')}>
                <Image
                  src={process.env.NEXT_PUBLIC_URL + item.cardImage}
                  alt={`${item.title} illustration`}
                  width={80}
                  height={80}
                  className={cn('cardImage')}
                />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
