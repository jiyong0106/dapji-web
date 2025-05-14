import classNames from 'classnames/bind';
import styles from './landingHeader.module.scss';
import Image from 'next/image';
import { landingHeaderOptions } from '@/src/utils/options/landingOptions';

const cn = classNames.bind(styles);

const LandingHeader = () => {
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
        <Image
          src={process.env.NEXT_PUBLIC_URL + '/images/textTransparent.png'}
          alt="로고이미지"
          width={60}
          height={20}
          className={cn('logo2')}
          priority
        />
      </a>

      <div className={cn('right')}>
        <ul className={cn('menu')}>
          {landingHeaderOptions.map((item, index) => (
            <li key={index} onClick={() => scrollClick(item.sectionId)}>
              {item.title}
            </li>
          ))}
        </ul>
        <a
          href={process.env.NEXT_PUBLIC_URL + '/gym'}
          target="_blank"
          rel="noopener noreferrer"
          className={cn('downloadBtn')}
        >
          웹에서 보기
        </a>
      </div>
    </nav>
  );
};

export default LandingHeader;
