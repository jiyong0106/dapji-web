'use client';

import classNames from 'classnames/bind';
import styles from './clinetGymDetail.module.scss';
import { useRouter } from 'next/navigation';
import { fetchGymDetailDatas } from '@/src/app/(main)/gym/api';
import NodetailData from '@/src/components/common/noDetailData';
import { useState } from 'react';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { GymDetailResponseType } from '@/src/utils/type';
import HoldColorList from '../holdColorList';
import DetailMainContentList from '../detailMainContent';
import Notification from '../notification';

const cn = classNames.bind(styles);
type DetailPageProps = {
  params: { gymId: string };
};

const ClinetGymDetail = ({ params }: DetailPageProps) => {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [isUpLoading, setIsUpLoading] = useState(false);
  const router = useRouter();
  const { gymId } = params;

  const {
    data: climbPostData,
    ref,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteScroll<GymDetailResponseType>({
    queryKey: ['climbDetail', activeColor],
    fetchFunction: (pageParam = 1) =>
      fetchGymDetailDatas({ pageParam, gymId, color: activeColor }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });
  const lists = climbPostData?.pages.flatMap((page) => page.posts) ?? [];
  const gymName = climbPostData?.pages[0]?.gym_name ?? '';
  const noticeData = climbPostData?.pages[0].notice;
  // 뒤로가기

  const noticePageClick = () => {
    router.push(`/gym/${gymId}/notice`);
  };

  if (isLoading || isUpLoading) {
    return <LoadingSpinner />;
  }

  //로딩중 들어가야할 것
  return (
    <div className={cn('container')}>
      {noticeData?.title && (
        <Notification onClick={noticePageClick} title={noticeData.title} />
      )}
      <HoldColorList
        type="list"
        activeColor={activeColor}
        setActiveColor={setActiveColor}
      />
      {lists.length === 0 ? (
        <NodetailData />
      ) : (
        <DetailMainContentList lists={lists} gymName={gymName} />
      )}
      <div ref={ref} />
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default ClinetGymDetail;
