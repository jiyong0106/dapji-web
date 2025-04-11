import { landingFooterOptions } from '@/src/utils/options/landingOptions';
import styles from './landingFooter.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

const cn = classNames.bind(styles);

const LandingFooter = () => {
  return (
    <footer id="contact" className={cn('container')}>
      <div className={cn('footerInner')}>
        <div className={cn('bottomTop')}>
          {/* 브랜드 영역 */}
          <div className={cn('brand')}>
            <Image
              src={process.env.NEXT_PUBLIC_URL + '/icon/btransparent.png'}
              alt="Dapji Logo"
              width={70}
              height={70}
            />
            <div className={cn('brandText')}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_URL + '/images/textTransparent.png'
                }
                alt="로고이미지"
                width={60}
                height={20}
                className={cn('logo2')}
                priority
              />
              <p>클라이밍이 쉬워지는 순간,</p>
            </div>
          </div>

          {/* 링크 그룹 영역 */}
          <nav className={cn('navSections')} aria-label="푸터 링크 그룹">
            {landingFooterOptions.map((group, index) => (
              <section key={index} className={cn('navGroup')}>
                <h4 className={cn('navGroupTitle')}>{group.title}</h4>
                <ul className={cn(group.title === '소통' ? 'socialIcons' : '')}>
                  {group.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        {/* 하단 바텀 정보 */}
        <div className={cn('bottom')}>
          <p>© 2024 Dapji. All rights reserved.</p>
          <p>
            문의:
            <a href="mailto:dapjiofficial@gmail.com">dapjiofficial@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
