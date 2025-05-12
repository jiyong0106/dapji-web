// 'use client';

// import classNames from 'classnames/bind';
// import styles from './DetailPage.module.scss';
// import Notification from '@/src/components/climbListDetailPage/notification';
// import HoldColorList from '@/src/components/climbListDetailPage/holdColorList';
// import DetailMainContentList from '@/src/components/climbListDetailPage/detailMainContent';
// import { useRouter } from 'next/navigation';
// import { fetchGymDetailDatas } from '@/src/app/(main)/gym/api';
// import NodetailData from '@/src/components/common/noDetailData';
// import { useState } from 'react';
// import LoadingSpinner from '@/src/components/common/loadingSpinner';
// import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
// import { GymDetailResponseType } from '@/src/utils/type';

// const cn = classNames.bind(styles);
// type DetailPageProps = {
//   params: { gymId: string };
// };

// const DetailPage = ({ params }: DetailPageProps) => {
//   const [activeColor, setActiveColor] = useState<string | null>(null);
//   const [isUpLoading, setIsUpLoading] = useState(false);
//   const router = useRouter();
//   const { gymId } = params;

//   const {
//     data: climbPostData,
//     ref,
//     isLoading,
//     isFetchingNextPage,
//   } = useInfiniteScroll<GymDetailResponseType>({
//     queryKey: ['climbDetail', activeColor],
//     fetchFunction: (pageParam = 1) =>
//       fetchGymDetailDatas({ pageParam, gymId, color: activeColor }),
//     getNextPageParam: (lastPage) =>
//       lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
//   });
//   const lists = climbPostData?.pages.flatMap((page) => page.posts) ?? [];
//   const gymName = climbPostData?.pages[0]?.gym_name ?? '';
//   const noticeData = climbPostData?.pages[0].notice;
//   // 뒤로가기
//   const uploadPage = () => {
//     setIsUpLoading(true);
//     router.replace(`/gym/${gymId}/upload`);
//   };
//   //업로드 페이지

//   const noticePageClick = () => {
//     router.push(`/gym/${gymId}/notice`);
//   };

//   if (isLoading || isUpLoading) {
//     return <LoadingSpinner />;
//   }

//   //로딩중 들어가야할 것
//   return (
//     <div className={cn('container')}>
//       {/* {noticeData?.title && ( */}
//       <Notification onClick={noticePageClick} title={'이번주공지'} />
//       {/* )} */}
//       <HoldColorList
//         type="list"
//         activeColor={activeColor}
//         setActiveColor={setActiveColor}
//       />
//       {lists.length === 0 ? (
//         <NodetailData />
//       ) : (
//         <DetailMainContentList lists={lists} gymName={gymName} />
//       )}
//       <div ref={ref} />
//       {isFetchingNextPage && <LoadingSpinner />}
//     </div>
//   );
// };

// export default DetailPage;

import classNames from 'classnames/bind';
import styles from './gymDetailPage.module.scss';
import { GymDetailResponseType } from '@/src/utils/type';
import instance from '@/src/utils/axios';

const cn = classNames.bind(styles);
type GymDetailPageProps = {
  params: { gymId: string };
};

export const generateMetadata = async ({
  params,
}: {
  params: { gymId: string };
}) => {
  const fetchgymDetailData = await instance.get(`/posts/gym/${params.gymId}`, {
    params: {
      page: 1,
      color: '',
    },
  });
  const getgymDetailData: GymDetailResponseType = fetchgymDetailData.data;

  return {
    title: getgymDetailData.gym_name,
    description: getgymDetailData.gym_name,
    openGraph: {
      title: getgymDetailData.gym_name,
      description: getgymDetailData.gym_name,
      url: `${process.env.NEXT_PUBLIC_URL}/gym/${params.gymId}`,
      images: '/icon/widelogo.png',
    },
  };
};

const GymDetailPage = ({ params }: GymDetailPageProps) => {
  //로딩중 들어가야할 것
  return <div className={cn('container')}></div>;
};

export default GymDetailPage;
