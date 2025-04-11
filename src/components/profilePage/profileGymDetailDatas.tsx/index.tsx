'use client';
import React from 'react';
import styles from './profileGymDetailDatas.module.scss';
import classNames from 'classnames/bind';
import { ProfileGymDetailPostType } from '@/src/utils/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type ProfileGymDetailDatapProps = {
  item: ProfileGymDetailPostType;
  gymId: string;
};

const ProfileGymDetail = ({ item, gymId }: ProfileGymDetailDatapProps) => {
  const { post_idx, thumbnailUrl, clearday, color, media_count } = item;
  const router = useRouter();
  const dateOnly = clearday.split('T')[0];

  const postClick = () => {
    router.push(`/gym/${gymId}/${post_idx}`);
  };

  return (
    <div className={cn('container')} onClick={postClick}>
      <div className={cn('imageWrapper')}>
        <Image
          src={thumbnailUrl || process.env.NEXT_PUBLIC_URL + '/icon/icon.png'}
          alt="로고이미지"
          fill
          className={cn('image')}
          priority
          sizes="(min-width: 769px) 100px, 80px"
        />
      </div>
      <div className={cn('postInfoText')}>
        <p>{dateOnly}</p>
        <div className={cn('colorWrapper')}>
          <div
            className={cn('color')}
            style={{
              color: color,
              border:
                color.toLowerCase() === 'white'
                  ? '0.5px solid #858585'
                  : 'none',
            }}
          />
          <span>{media_count}개</span>
          <span>|</span>
          <span>답지로 이동</span>
        </div>
      </div>
    </div>
  );
};

////////
type ProfileGymDetailDataspProps = {
  items: ProfileGymDetailPostType[];
  gymId: string;
};

const ProfileGymDetailDatas = ({
  items,
  gymId,
}: ProfileGymDetailDataspProps) => {
  return (
    <div className={cn('outContainer')}>
      {items.map((item) => (
        <ProfileGymDetail key={item.post_idx} item={item} gymId={gymId} />
      ))}
    </div>
  );
};

export default ProfileGymDetailDatas;
