import classNames from 'classnames/bind';
import styles from './ProfileAllData.module.scss';
import { useState } from 'react';
import ProfileGymDatas from '../profileGymData/ProfileGymDatas';
import ProfilePostDatas from '../profilePostData';
import { PostIcon } from '@/public/icon';
import { ProfilePostDetailType } from '@/src/utils/type';
import Image from 'next/image';

const cn = classNames.bind(styles);

type ProfileAllDataProps = {
  profileData: {
    posts: ProfilePostDetailType[];
    userName: string;
  };
  params: {
    userId: string;
  };
};
const ProfileAllData = ({ profileData, params }: ProfileAllDataProps) => {
  const [selectList, setSelectList] = useState<string>('post');
  const [underlineStyle, setUnderlineStyle] = useState({ left: '0%' });

  const handleIconClick = (type: string, left: string) => {
    setSelectList(type);
    setUnderlineStyle({ left });
  };

  return (
    <div className={cn('container')}>
      <div className={cn('iconWrapper')}>
        <div
          className={cn('icon')}
          onClick={() => handleIconClick('post', '0%')}
        >
          <PostIcon width="30" height="30" />
        </div>
        <div
          className={cn('icon')}
          onClick={() => handleIconClick('board', '50%')}
        >
          <Image
            src="/icon/bouldering.svg"
            width="35"
            height="35"
            alt="즐겨찾기 로고"
          />
        </div>
        <div className={cn('underline')} style={underlineStyle} />
      </div>
      {selectList === 'post' ? (
        profileData.posts.length === 0 ? (
          <p className={cn('emptyMessage')}>공유한 답지가 없어요! 🔥</p>
        ) : (
          <ProfilePostDatas lists={profileData.posts} />
        )
      ) : (
        <ProfileGymDatas params={params} />
      )}
    </div>
  );
};

export default ProfileAllData;
