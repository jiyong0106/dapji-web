'use client';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './officialNoticeLists.module.scss';
import Image from 'next/image';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import { useRouter } from 'next/navigation';
import { OfficialResultType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type OfficialNoticeListProps = {
  list: OfficialResultType;
};

const OfficialNoticeList = ({ list }: OfficialNoticeListProps) => {
  const { title, content, createdAt, notice_idx } = list;
  const timeAgo = useTimeAgo(createdAt);
  const router = useRouter();
  const detailPage = () => {
    router.push(`/officialnotice/${notice_idx}`);
  };
  return (
    <div className={cn('container')} onClick={detailPage}>
      <div className={cn('header')}>
        <Image
          src={process.env.NEXT_PUBLIC_URL + '/icon/noticereverse.png'}
          width={20}
          height={20}
          className={cn('profileImage')}
          alt="팔로우 페이지 프로필 이미지"
          priority
        />
        <h2 className={cn('title')}>{title}</h2>
      </div>
      <p className={cn('content')}>{content[0].value}</p>
      <span className={cn('created')}>{timeAgo}</span>
    </div>
  );
};

type OfficialNoticeListsProps = {
  lists: OfficialResultType[];
};

const OfficialNoticeLists = ({ lists }: OfficialNoticeListsProps) => {
  return (
    <div className={cn('outercontainer')}>
      {lists.map((list) => (
        <OfficialNoticeList key={list.notice_idx} list={list} />
      ))}
    </div>
  );
};

export default OfficialNoticeLists;
