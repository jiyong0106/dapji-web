'use client';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import styles from './profileGymPage.module.scss';
import classNames from 'classnames/bind';
import { ProfileGymsDetailResponseType } from '@/src/utils/type';
import { fetchProfileGymDetail } from '../../api';
import ProfileGymDetailDatas from '@/src/components/profilePage/profileGymDetailDatas.tsx';
import Image from 'next/image';

const cn = classNames.bind(styles);

type ProfilePageProps = {
  params: {
    userId: string;
    gymId: string;
  };
};

const ProfileGymPage = ({ params }: ProfilePageProps) => {
  const { userId, gymId } = params;

  const { data: profileGymData, ref } =
    useInfiniteScroll<ProfileGymsDetailResponseType>({
      queryKey: ['ProfileGymsDetailKey', userId, gymId],
      fetchFunction: (page = 1) =>
        fetchProfileGymDetail({
          page,
          userId,
          gymId,
        }),
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
      staleTime: 60 * 1000,
    });

  const gymDetailDatas = profileGymData?.pages[0].gym;

  const postDetailDatas =
    profileGymData?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className={cn('container')}>
      <div className={cn('gymInfo')}>
        <div className={cn('imageWrapper')}>
          <Image
            src={
              gymDetailDatas?.logo ||
              process.env.NEXT_PUBLIC_URL + '/icon/icon.png'
            }
            alt="로고이미지"
            fill
            className={cn('image')}
            priority
          />
        </div>
        <div className={cn('gymInfoText')}>
          <h4>{gymDetailDatas?.name}</h4>
          <p>{gymDetailDatas?.address}</p>
          <p>총 {gymDetailDatas?.post_count}개의 답지를 올렸어요</p>
        </div>
      </div>
      <ProfileGymDetailDatas items={postDetailDatas} gymId={gymId} />
      <div ref={ref} />
    </div>
  );
};

export default ProfileGymPage;
