import React from 'react';
import classNames from 'classnames/bind';
import styles from './officialNoticeDetailLists.module.scss';
import LinkifyText from '@/src/hooks/useLinkifyText';
import Image from 'next/image';
import { OfficialResultType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type OfficialNoticeDetailListsProps = {
  list: OfficialResultType;
};

const OfficialNoticeDetailLists = ({
  list,
}: OfficialNoticeDetailListsProps) => {
  const { title, content, createdAt, notice_idx } = list;
  const formatDate = (date: string | null) => date?.split('T')[0] || '';

  return (
    <div className={cn('container')}>
      <header>
        <span>{formatDate(createdAt)}</span>
        <h1>{title}</h1>
      </header>
      <div className={cn('contentWrapper')}>
        {content.map((item, index) =>
          item.type === 'image' ? (
            <Image
              key={index}
              src={item.value}
              alt="공지 이미지"
              width={200}
              height={200}
              className={cn('contentImage')}
              priority
            />
          ) : (
            <div key={index} className={cn('contentText')}>
              <LinkifyText text={item.value} />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default OfficialNoticeDetailLists;
