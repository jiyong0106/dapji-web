'use client';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './mainSection.module.scss';
import Image from 'next/image';

const cn = classNames.bind(styles);

const MainSection = () => {
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
    <section id="brand" ref={ref} className={cn('container')}>
      <div className={cn('wrapper', { animate: isVisible })}>
        <div className={cn('left')}>
          <h2 className={cn('slogan')}>클라이밍 루트, 너무 고민하지 마세요</h2>
          <p className={cn('desc')}>
            루트가 안 보일 때, 다른 클라이머의 완등 영상은 최고의 힌트!
            <br />
            답지는 그런 영상을 더 빠르게 찾을 수 있도록 만든 서비스예요.
          </p>
        </div>

        <Image
          src={process.env.NEXT_PUBLIC_URL + '/images/illustration5.png'}
          alt="브랜드 철학 이미지"
          width={400}
          height={400}
          className={cn('image')}
          priority
        />
      </div>
    </section>
  );
};

export default MainSection;
