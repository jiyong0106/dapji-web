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

  const scrollClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 150; // 원하는 만큼 조정
      const top = section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };

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
      <h3 className={cn('title')}>클라이머에게 꼭 필요한 기능들만 모았어요</h3>

      <div className={cn('cardGrid', { animate: isVisible })}>
        {landingFeaturesOptions.map((item, index) => (
          <div
            key={index}
            className={cn('card')}
            onClick={() => scrollClick(item.sectionId)}
          >
            <div className={cn('cardText')}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            <Image
              src={process.env.NEXT_PUBLIC_URL + item.cardImage}
              alt={`${item.title} illustration`}
              width={80}
              height={80}
              className={cn('cardImage')}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
