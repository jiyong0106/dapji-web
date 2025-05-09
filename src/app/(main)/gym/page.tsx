// 클라임리스트 서버컴포넌트

import classNames from 'classnames/bind';
import styles from './ClimbListPage.module.scss';
import ClientClimbList from '@/src/components/climbListPage/clientClimbList';
import instance from '@/src/utils/axios';

const cn = classNames.bind(styles);

export const generateMetadata = async () => {
  return {
    title: '클라이밍장',
    description: '클라이밍장 리스트',
    openGraph: {
      title: '클라이밍장',
      description: '클라이밍장 리스트',
      url: `${process.env.NEXT_PUBLIC_URL}/gym`,
      images: '/icon/widelogo.png',
    },
  };
};

const ClimbListPage = async () => {
  const initialData = await instance.get(`/gyms`, {
    params: {
      page: 1,
      search: '',
      // is_favorite,
      sort: 'latest',
    },
  });

  return <ClientClimbList initialData={initialData.data} />;
};

export default ClimbListPage;
