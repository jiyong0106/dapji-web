'use client';
import classNames from 'classnames/bind';
import styles from './mainNav.module.scss';
import Image from 'next/image';
import { mainHeaderOptions } from '@/src/utils/options/landingOptions';

const cn = classNames.bind(styles);

const MainNav = () => {
  return (
    <nav className={cn('container')}>
      <a
        className={cn('left')}
        href={process.env.NEXT_PUBLIC_WEB_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={process.env.NEXT_PUBLIC_URL + '/icon/btransparent.png'}
          alt="로고이미지"
          width={60}
          height={60}
          className={cn('logo')}
          priority
        />
        <p className={cn('leftText')}>DAPJI</p>
      </a>

      <div className={cn('right')}>
        <ul className={cn('menu')}>
          {mainHeaderOptions.map((item, index) => (
            <li
              key={index}
              onClick={() =>
                // document
                //   .getElementById(`${item.sectionId}`)
                //   ?.scrollIntoView({ behavior: 'smooth' })
                console.log('페이지클릭')
              }
            >
              {item.title}
            </li>
          ))}
        </ul>
        <a
          href={process.env.NEXT_PUBLIC_MAIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn('downloadBtn')}
        >
          로그인
        </a>
      </div>
    </nav>
  );
};

export default MainNav;
