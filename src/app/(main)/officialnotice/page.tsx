'use client';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './officialNoticePage.module.scss';
import OfficialNoticeLists from '@/src/components/officialnoticepage/officialNoticeLists';
import Header from '@/src/components/common/header';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { OfficialnoticeType } from '@/src/utils/type';
import { fetchadNoticeData } from '../admin/adnotice/api';
import LoadingSpinner from '@/src/components/common/loadingSpinner';

const cn = classNames.bind(styles);

const OfficialNoticePage = () => {
  const {
    data: officialnoitceDatas,
    ref,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<OfficialnoticeType>({
    queryKey: ['officialnoitceDatasKey'],
    fetchFunction: (page = 1) => fetchadNoticeData({ page }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const lists =
    officialnoitceDatas?.pages.flatMap((page) => page.notices) ?? [];

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className={cn('container')}>
      <Header back={true} title="공지" />
      <div className={cn('secondContainer')}>
        <OfficialNoticeLists lists={lists} />
        <div ref={ref} />
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default OfficialNoticePage;
