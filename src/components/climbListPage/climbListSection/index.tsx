'use client';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './climbListSection.module.scss';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { ClimbListDatas } from '@/src/app/(main)/gym/api';
import { ClimbLIstResponseType } from '@/src/utils/type';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import SkeletonClimbList from '../skeletonClimbList';
import ClimbLists from '../climbLists';

const cn = classNames.bind(styles);

type CardListSectionProps = {
  searchName: string;
  selectSort: string;
};

const ClimbListSection = ({ searchName, selectSort }: CardListSectionProps) => {
  const {
    data: climbListData,
    ref,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<ClimbLIstResponseType>({
    queryKey: ['climbListKey', searchName, selectSort],
    fetchFunction: (page = 1) =>
      ClimbListDatas({ page, search: searchName, sort: selectSort }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    staleTime: 60 * 1000,
  });

  const lists = climbListData?.pages.flatMap((page) => page.gyms) ?? [];

  // 초기 로딩 시 스켈레톤만 렌더
  if (isLoading) {
    return <SkeletonClimbList />;
  }

  return (
    <>
      {lists.length === 0 ? (
        <p className={cn('noSearchData')}>검색 결과가 없습니다</p>
      ) : (
        <>
          <ClimbLists lists={lists} />
          <div ref={ref} />
        </>
      )}
      {isFetchingNextPage && <LoadingSpinner />}
    </>
  );
};

export default ClimbListSection;
