import styles from './landingFooter.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

const cn = classNames.bind(styles);

const LandingFooter = () => {
  return (
    <footer className={cn('container')}>
      <div className={cn('footerInner')}>
        <div className={cn('bottomTop')}>
          {/* 브랜드 영역 */}
          <div className={cn('brand')}>
            <Image
              src="/icon/btransparent.png"
              alt="Dapji Logo"
              width={70}
              height={70}
            />
            <div className={cn('brandText')}>
              <p>DAPJI</p>
              <p>클라이밍이 쉬워지는 순간,</p>
            </div>
          </div>

          {/* 링크 그룹 영역 */}
          <nav className={cn('navSections')} aria-label="푸터 링크 그룹">
            <section className={cn('navGroup')}>
              <h4 className={cn('navGroupTitle')}>처리방침</h4>
              <ul>
                <li>
                  <Link href="https://dap-ji.github.io/privacy/">
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href="https://dap-ji.github.io/privacy/terms">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="https://dap-ji.github.io/privacy/deletionpolicy">
                    삭제약관
                  </Link>
                </li>
              </ul>
            </section>

            <section className={cn('navGroup')}>
              <h4>고객 지원</h4>
              <ul>
                <li>
                  <Link href="https://forms.gle/w9QGRZcp1RhyJJrj6">
                    문의하기
                  </Link>
                </li>
              </ul>
            </section>

            <section className={cn('navGroup')}>
              <h4>소통</h4>
              <ul className={cn('socialIcons')}>
                <li>
                  <Link
                    href="http://pf.kakao.com/_Avsxdn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* <Image
                      src="/icon/kakao.png"
                      alt="카카오톡"
                      width={24}
                      height={24}
                    /> */}
                    카카오톡
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/dapji_official/?igsh=MWozanozMnVpMTFqYQ%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* <Image
                      src="/icon/instagram.png"
                      alt="인스타그램"
                      width={24}
                      height={24}
                    /> */}
                    인스타그램
                  </Link>
                </li>
              </ul>
            </section>
          </nav>
        </div>

        {/* 하단 바텀 정보 */}
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
