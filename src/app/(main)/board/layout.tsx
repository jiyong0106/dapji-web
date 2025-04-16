import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '게시판',
  description: '게시판 페이지',
};

const BoardLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default BoardLayout;
