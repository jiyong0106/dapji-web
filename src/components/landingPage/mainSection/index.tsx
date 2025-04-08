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
    <section ref={ref} className={cn('container')}>
      <div className={cn('wrapper', { animate: isVisible })}>
        <div className={cn('left')}>
          <h2 className={cn('slogan')}>
            답지는 ‘왜 이 문제가 안 풀릴까?’
            <br />
            라는 고민에서 출발했어요.
          </h2>
          <p className={cn('desc')}>
            겨우 찾은 문제 영상. 그 불편함에서 답지는 시작됐어요.
          </p>
        </div>

        <Image
          src="/images/backimg.png"
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
