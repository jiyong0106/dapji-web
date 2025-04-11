'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './adnoticeEditPage.module.scss';
import ModalChoice from '@/src/components/common/moadlChoice';
import AdNoticeEditForm from '@/src/components/adminPage/adnoticepage/adnoticeEditForm/adnoticeEditForm';
import { fetchNoticeDetailData } from '../../api';
import { OfficialResultType } from '@/src/utils/type';
import LoadingSpinner from '@/src/components/common/loadingSpinner';

const cn = classNames.bind(styles);

type AdnoticeEditPageProps = {
  params: {
    noticeId: string;
  };
};

const AdnoticeEditPage = ({ params }: AdnoticeEditPageProps) => {
  const { noticeId } = params;
  const [initialData, setInitialData] = useState<OfficialResultType | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await fetchNoticeDetailData(noticeId);
        setInitialData(data.result);
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
      {loading && <LoadingSpinner />}

      {!loading && initialData && (
        <AdNoticeEditForm initialData={initialData} />
      )}
      <ModalChoice />
    </div>
  );
};

export default AdnoticeEditPage;
