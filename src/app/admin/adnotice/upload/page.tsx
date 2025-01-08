'use client';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './adNoticeUploadPage.module.scss';
import AdNoticeUploadForm from '@/src/components/adminPage/adnoticepage/adnoticeuploadForm/adnoticeuploadForm';
import ModalChoice from '@/src/components/common/moadlChoice';

const cn = classNames.bind(styles);

const AdNoticeUploadPage = () => {
  return (
    <div className={cn('container')}>
      <AdNoticeUploadForm />
      <ModalChoice />
    </div>
  );
};

export default AdNoticeUploadPage;
