import ClientBoardList from '@/src/components/boardPage/clientBoardList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '답지 게시판',
  description: '답지 커뮤니티',
  openGraph: {
    title: '답지 게시판',
    description: '답지 커뮤니티',
    url: `${process.env.NEXT_PUBLIC_URL}/board`,
    images: [
      {
        url: `/icon/blueicon.png`,
        width: 1200,
        height: 630,
        alt: 'DAPJI 클라이밍 로고',
      },
    ],
  },
};

const BoardPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ClientBoardList />
    </div>
  );
};

export default BoardPage;
