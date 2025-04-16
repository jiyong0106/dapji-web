import classNames from 'classnames/bind';
import styles from './profileForm.module.scss';
import Image from 'next/image';
import { ProfilePostType } from '@/src/utils/type';
import { useRouter } from 'next/navigation';
import FollowingBtn from '@/src/components/common/followingBtn';
import useFollowRequest from '@/src/hooks/useFollowRequest';
import ProfileBtn from '../profileBtn';

const cn = classNames.bind(styles);

type ProfileFormProps = {
  profileInfo: ProfilePostType;
  params: {
    userId: string;
  };
};

const ProfileForm = ({ params, profileInfo }: ProfileFormProps) => {
  const { userId } = params;
  const router = useRouter();
  const { handleFollowRequest, isFollow } = useFollowRequest({
    userId: userId,
    initalFollowToggle: profileInfo.isFollowing,
  });


  const renderProviderIcon = () => {
    return (
      <>
        <Image
          src={process.env.NEXT_PUBLIC_URL + '/icon/iconTransparent.png'}
          width="30"
          height="30"
          alt="provider 기본이미지"
          priority
        />
        <span>DAPJI</span>
      </>
    );
  };

  const followPageClick = (userId: string, page: string) => {
    router.push(`/profile/${userId}/follow?page=${page}`);
  };
  const profileEditClick = (userId: string) => {
    router.replace(`/profile/${userId}/edit`);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('profileWrapper')}>
        <Image
          src={
            profileInfo.user.img ||
            process.env.NEXT_PUBLIC_URL + '/icon/icon.png'
          }
          alt="profileImage"
          width="120"
          height="120"
          priority={true}
          className={cn('profileImage')}
        />

        <div className={cn('infoWrapper')}>
          <div className={cn('btnWrapper')}>
            <ProfileBtn
              className={cn('oauth')}
              onClick={() => profileEditClick(userId)}
            >
              {renderProviderIcon()}
            </ProfileBtn>

            {profileInfo.isOwnProfile ? (
              <ProfileBtn
                className={cn('profileEdit')}
                onClick={() => profileEditClick(userId)}
              >
                프로필 편집
              </ProfileBtn>
            ) : (
              <FollowingBtn onClick={handleFollowRequest} isFollow={isFollow} />
            )}
          </div>
          <ProfileBtn className={cn('BodyStat')}>
            <span>키 {profileInfo.user.height ?? '--'}cm</span>
            <span>|</span>
            <span>리치 {profileInfo.user.reach ?? '--'}cm</span>
          </ProfileBtn>

          <div className={cn('followWrapper')}>
            <div
              className={cn('follower')}
              onClick={() => followPageClick(userId, 'follower')}
            >
              <span>클로워</span>
              <span>{profileInfo.followerCount}</span>
            </div>

            <div
              className={cn('following')}
              onClick={() => followPageClick(userId, 'following')}
            >
              <span>클로잉</span>
              <span>{profileInfo.followingCount}</span>
            </div>
          </div>
        </div>
      </div>

      <pre className={cn('textWrapper')}>{profileInfo.user.introduce}</pre>
    </div>
  );
};

export default ProfileForm;

//커밋 테스트
//두번째 pr
