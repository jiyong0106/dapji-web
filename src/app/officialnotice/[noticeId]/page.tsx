'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './officialNoticeDetailPage.module.scss';
import OfficialNoticeDetailLists from '@/src/components/officialnoticeDetailpage/officialNoticeDetailLists';
import Header from '@/src/components/common/header';
import { fetchNoticeDetailData } from '../../admin/adnotice/api';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { OfficialResultType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type OfficialNoticeDetailPageProps = {
  params: { noticeId: string };
};

const OfficialNoticeDetailPage = ({
  params,
}: OfficialNoticeDetailPageProps) => {
  const { noticeId } = params;
  const [list, setList] = useState<OfficialResultType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchNoticeDetailData(noticeId);
        setList(data.result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [noticeId]);

  return (
    <div className={cn('container')}>
      <Header back={true} title="공지" />
      <div className={cn('secondContainer')}>
        {loading && <LoadingSpinner />}
        {!loading && list && <OfficialNoticeDetailLists list={list} />}
      </div>
    </div>
  );
};

export default OfficialNoticeDetailPage;
