import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/src/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'DAPJI';
const APP_DEFAULT_TITLE = 'DAPJI';
const APP_TITLE_TEMPLATE = '%s - DAPJI';
const APP_DESCRIPTION = 'DAPJI';

export const metadata: Metadata = {
  metadataBase: new URL('https://climbdapji.kr'),
  //이거 url바꾸기
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
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: '/icon/widelogo.png',
        width: 1200,
        height: 630,
        alt: 'DAPJI',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: '/icon/icon.png',
        alt: 'DAPJI',
      },
    ],
  },
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: 'white',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* <!-- Open Graph 메타 태그 --> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DAPJI - 클라이밍이 쉬워지는 순간," />
        <meta
          property="og:description"
          content="DAPJI - 클라이밍 정답지를 찾아보고 공유해보세요"
        />
        <meta property="og:image" content="/icon/widelogo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://climbdapji.kr" />
        <meta property="og:site_name" content="DAPJI" />

        {/* <!-- Twitter 메타 태그 --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="DAPJI - 클라이밍이 쉬워지는 순간,"
        />
        <meta
          name="twitter:description"
          content="DAPJI - 클라이밍 정답지를 찾아보고 공유해보세요"
        />
        <meta name="twitter:image" content="/icon/icon.png" />
        <meta name="twitter:image:alt" content="DAPJI" />

        {/* 파비콘 */}
        <link rel="icon" href="/icon/btransparent.png" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
