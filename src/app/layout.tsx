// app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/src/styles/globals.css';
import TopProgressBar from '../components/common/TopProgressBar';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'DAPJI';
const APP_DEFAULT_TITLE = '답지(DAPJI) | 클라이밍이 쉬워지는 순간,';
const APP_TITLE_TEMPLATE = '%s | DAPJI';
const APP_DESCRIPTION =
  'DAPJI - 루트 파인딩 너무 고민하지 마세요, 답지에서 클라이밍 루트를 쉽고 빠르게 찾아보세요 ';

export const metadata: Metadata = {
  metadataBase: new URL('https://climbdapji.kr'),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    url: 'https://climbdapji.kr',
    images: [
      {
        url: '/icon/widelogo.png',
        width: 1200,
        height: 630,
        alt: 'DAPJI OG 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    images: [
      {
        url: '/icon/btransparent.png',
        alt: 'DAPJI 트위터 이미지',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: 'white',
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 네이버 서치 어드바이저용 */}
        <meta
          name="naver-site-verification"
          content="88d757e9f613a6c254b90d739f5ebfb31bba00fc"
        />
        {/* favicon */}
        <link rel="icon" href="/icon/blueicon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <TopProgressBar />
        {children}
      </body>
    </html>
  );
}
