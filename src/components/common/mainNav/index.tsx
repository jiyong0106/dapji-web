'use client';
import classNames from 'classnames/bind';
import styles from './mainNav.module.scss';
import Image from 'next/image';
import { mainHeaderOptions } from '@/src/utils/options/landingOptions';
import { useRouter } from 'next/navigation';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';

const cn = classNames.bind(styles);

const MainNav = () => {
  const { myId } = useMyInfoStore();

  const menuItems = mainHeaderOptions(myId);

  const router = useRouter();
  return (
    <nav className={cn('container')}>
      <a
        className={cn('left')}
        href={process.env.NEXT_PUBLIC_URL}
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
          {menuItems.map((item, index) => (
            <li key={index} onClick={() => router.push(item.getPath())}>
              {item.title}
            </li>
          ))}
        </ul>
        <p
          className={cn('downloadBtn')}
          onClick={() =>
            router.push(`${process.env.NEXT_PUBLIC_URL + '/signin'}`)
          }
        >
          로그인
        </p>
      </div>
    </nav>
  );
};

export default MainNav;
