'use client';

import { landingHowOptions } from '@/src/utils/options/landingOptions';
import styles from './howWorkSection.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const cn = classNames.bind(styles);

const HowWorkSection = () => {
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleRows, setVisibleRows] = useState<boolean[]>(
    new Array(landingHowOptions.length).fill(false),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting && !visibleRows[index]) {
            setVisibleRows((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.2 },
    );

    rowsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleRows]);

  return (
    <section id="howto" className={cn('container')}>
      {landingHowOptions.map((step, idx) => (
        <div
          key={idx}
          ref={(el) => {
            rowsRef.current[idx] = el;
          }}
          data-index={idx}
          id={step.id}
          className={cn(
            'row',
            {
              reverse: idx % 2 === 1,
              animate: visibleRows[idx],
            },
            `row${idx}`,
          )}
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
