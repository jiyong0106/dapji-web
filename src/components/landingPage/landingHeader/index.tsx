import classNames from 'classnames/bind';
import styles from './landingHeader.module.scss';
import Image from 'next/image';

const cn = classNames.bind(styles);

const LandingHeader = () => {
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
          <li>브랜드</li>
          <li>서비스</li>
          <li>문의</li>
          <li>공지사항</li>
        </ul>
        <a
          href={process.env.NEXT_PUBLIC_MAIN_URL}
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
