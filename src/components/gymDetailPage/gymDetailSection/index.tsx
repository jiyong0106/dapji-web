'use client';

import { fetchGymDetailDatas } from '@/src/app/(main)/gym/api';
import NodetailData from '@/src/components/common/noDetailData';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { GymDetailResponseType } from '@/src/utils/type';
import DetailMainContentList from '../detailMainContent';
import SkeletonGymDetail from '../skeletonGymDetail';

type DetailPageProps = {
  params: { gymId: string };
  activeColor: string | null;
};

const GymDetailSection = ({ params, activeColor }: DetailPageProps) => {
  const { gymId } = params;

  const {
    data: climbPostData,
    ref,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteScroll<GymDetailResponseType>({
    queryKey: ['climbDetail', gymId, activeColor],
    fetchFunction: (pageParam = 1) =>
      fetchGymDetailDatas({ pageParam, gymId, color: activeColor }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });
  const lists = climbPostData?.pages.flatMap((page) => page.posts) ?? [];
  const gymName = climbPostData?.pages[0]?.gym_name ?? '';
  // 뒤로가기

  if (isLoading) {
    return <SkeletonGymDetail />;
  }

  //로딩중 들어가야할 것
  return (
    <>
      {lists.length === 0 ? (
        <NodetailData />
      ) : (
        <>
          <DetailMainContentList lists={lists} gymName={gymName} />
          <div ref={ref} />
        </>
      )}
      {isFetchingNextPage && <LoadingSpinner />}
    </>
  );
};

export default GymDetailSection;
