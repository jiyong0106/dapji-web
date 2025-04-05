import styles from './landingFooter.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

const cn = classNames.bind(styles);

const LandingFooter = () => {
  return (
    <footer className={cn('container')}>
      <div className={cn('footerInner')}>
        <div className={cn('brand')}>
          <Image
            src="/icon/btransparent.png"
            alt="Dapji Logo"
            width={100}
            height={32}
          />
          <p>클라이머들을 위한 영상 플랫폼</p>
        </div>

        <div className={cn('links')}>
          <Link href="https://dap-ji.github.io/privacy/">개인정보처리방침</Link>
          <Link href="https://dap-ji.github.io/privacy/terms">이용약관</Link>
          <Link href="https://dap-ji.github.io/privacy/deletionpolicy">
            삭제약관
          </Link>
          <Link href="https://forms.gle/w9QGRZcp1RhyJJrj6">문의하기</Link>
          <Link href="https://apps.apple.com/us/app/dapji/id6738718316">
            앱 다운로드
          </Link>
        </div>

        <div className={cn('bottom')}>
          <p>© 2025 Dapji. All rights reserved.</p>
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
