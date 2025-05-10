import ClientClimbList from '@/src/components/climbListPage/clientClimbList';

export const generateMetadata = async () => {
  return {
    title: '클라이밍장 목록',
    description: '클라이밍장 목록',
    openGraph: {
      title: '클라이밍장 목록',
      description: '클라이밍장 목록',
      url: `${process.env.NEXT_PUBLIC_URL}/gym`,
      images: '/icon/widelogo.png',
    },
  };
};

const ClimbListPage = async () => {
  return <ClientClimbList />;
};

export default ClimbListPage;
