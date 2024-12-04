'use client';

import classNames from 'classnames/bind';
import styles from './DetailPage.module.scss';
import Notification from '@/src/components/climbListDetailPage/notification';
import HoldColorList from '@/src/components/climbListDetailPage/holdColorList';
import DetailMainContentList from '@/src/components/climbListDetailPage/detailMainContent';
import { AddIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import { climbPostDatas } from '@/src/app/gym/api';
import NodetailData from '@/src/components/common/noDetailData';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import Header from '@/src/components/common/header';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { ClimbPostResponseType } from '@/src/utils/type';

const cn = classNames.bind(styles);
type DetailPageProps = {
  params: { gymId: string };
};

const DetailPage = ({ params }: DetailPageProps) => {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [isUpLoading, setIsUpLoading] = useState(false);

  const router = useRouter();
  const { gymId } = params;

  const {
    data: climbPostData,
    ref,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteScroll<ClimbPostResponseType>({
    queryKey: ['climbDetail', activeColor],
    fetchFunction: (pageParam = 1) =>
      climbPostDatas({ pageParam, gymId, color: activeColor }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });
  const lists = climbPostData?.pages.flatMap((page) => page.posts) ?? [];
  const gymName = climbPostData?.pages[0]?.gym_name ?? '';
  const noticeData = climbPostData?.pages[0].notice;
  // 뒤로가기
  const uploadPage = () => {
    setIsUpLoading(true);
    router.replace(`/gym/${gymId}/upload`);
  };
  //업로드 페이지

  const noticePageClick = () => {
    router.push(`/gym/${gymId}/notice`);
  };

  if (isLoading || isUpLoading) {
    return <LoadingSpinner />;
  }

  //로딩중 들어가야할 것
  return (
    <div className={cn('container')}>
      <Header title={gymName} page={'/gym'}>
        <AddIcon onClick={uploadPage} width="30" height="30" />
      </Header>
      <div className={cn('secondContainer')}>
        {noticeData?.title && (
          <Notification onClick={noticePageClick} title={noticeData?.title} />
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
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default DetailPage;
