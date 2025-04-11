import classNames from 'classnames/bind';
import styles from './heroSecton.module.scss';
import Image from 'next/image';

const cn = classNames.bind(styles);

const HeroSection = () => {
  return (
    <div className={cn('container')}>
      <div className={cn('content')}>
        <h1 className={cn('slogan')}>
          클라이밍이 쉬워지는 순간,
          <br /> 답지
        </h1>
        <a
          className={cn('appStore')}
          href={'https://apps.apple.com/us/app/dapji/id6738718316'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={process.env.NEXT_PUBLIC_URL + '/icon/applewhitepng.png'}
            alt="로고이미지"
            width={20}
            height={20}
            className={cn('logo')}
            priority
          />
          App Store
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
