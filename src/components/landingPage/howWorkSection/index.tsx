'use client';
import { landingHowOptions } from '@/src/utils/options/landingOptions';
import styles from './howWorkSection.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const cn = classNames.bind(styles);

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
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="howto" ref={ref} className={cn('container')}>
      {landingHowOptions.map((step, idx) => (
        <div
          key={idx}
          className={cn('row', { reverse: idx % 2 === 1, animate: isVisible })}
        >
          <div className={cn('text')}>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            <ul>
              {step.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <Image
            src={process.env.NEXT_PUBLIC_URL + step.icon}
            alt={step.title}
            className={cn('image')}
            width={600}
            height={400}
            priority
          />
        </div>
      ))}
    </section>
  );
};

export default HowWorkSection;
