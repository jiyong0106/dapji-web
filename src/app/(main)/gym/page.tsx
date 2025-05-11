import ClientClimbList from '@/src/components/climbListPage/clientClimbList';

export const generateMetadata = async () => {
  return {
    title: '클라이밍장 목록',
    description: '클라이밍장 목록',
    openGraph: {
      title: '클라이밍장 목록',
      description: '클라이밍장 목록',
      url: `${process.env.NEXT_PUBLIC_URL}/gym`,
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
};

const ClimbListPage = async () => {
  return <ClientClimbList />;
};

export default ClimbListPage;
