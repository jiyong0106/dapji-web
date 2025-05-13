'use client';
import classNames from 'classnames/bind';
import styles from './userProfilePage.module.scss';
import ProfileAllData from '@/src/components/profilePage/profileAllData';
import ProfileForm from '@/src/components/profilePage/profileForm';
import { fethcProfilePostDatas } from '@/src/app/(main)/profile/api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { ProfilePostResponseType } from '@/src/utils/type';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { AdminIcon } from '@/public/icon';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRoleStore } from '@/src/utils/store/useRoleStore';

const cn = classNames.bind(styles);

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

const ProfilePage = ({ params }: ProfilePageProps) => {
  const { userId } = params;
  const { setrole } = useRoleStore();

  const {
    data: profileData,
    ref,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteScroll<ProfilePostResponseType>({
    queryKey: ['profileDatas', userId],
    fetchFunction: (page = 1) =>
      fethcProfilePostDatas({
        page,
        userId,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const name = profileData?.pages[0]?.user.nickname ?? '';

  const profilePosts = profileData?.pages.flatMap((page) => page.posts) ?? [];

  const profileInfo = profileData?.pages[0];

  const admin = profileData?.pages[0]?.userRole === 'admin';

  const profileDataObject = {
    posts: profilePosts,
    userName: name,
  };

  useEffect(() => {
    if (profileData?.pages[0]?.userRole) {
      setrole(profileData.pages[0].userRole);
    }
  }, [profileData, setrole]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <div className={cn('BtnStyles')}>
        {admin && (
          <Link href={'/admin'}>
            <AdminIcon />
          </Link>
        )}
      </div>
      {profileInfo ? (
        <ProfileForm params={params} profileInfo={profileInfo} />
      ) : (
        <LoadingSpinner />
      )}
      <ProfileAllData profileData={profileDataObject} params={params} />
      <div ref={ref} />
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default ProfilePage;
