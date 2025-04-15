import classNames from 'classnames/bind';
import styles from './brandSection.module.scss';
import Image from 'next/image';

const cn = classNames.bind(styles);

const BrandSection = () => {
  return (
    <section className={cn('container')}>
      <div className={cn('content')}>
        <div>
          <p className={cn('slogan')}>클라이밍이 쉬워지는 순간,</p>
          <h1 className={cn('name')}>답지</h1>
          <a
            className={cn('appStore')}
            href={process.env.NEXT_PUBLIC_IOS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_URL}/icon/applewhitepng.png`}
              alt="앱스토어"
              width={20}
              height={20}
              className={cn('logo')}
              priority
            />
            App Store
          </a>
        </div>
      </div>

      <div className={cn('mockup')}>
        <Image
          src="/images/mockgymvideo.png"
          alt="앱 이미지 1"
          width={300}
          height={600}
          className={cn('mock1')}
        />
        <Image
          src="/images/mockprofile.png"
          alt="앱 이미지 2"
          width={300}
          height={600}
          className={cn('mock2')}
        />
      </div>
    </section>
  );
};

export default BrandSection;
