'use client';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import styles from './profileGymPage.module.scss';
import classNames from 'classnames/bind';
import { ProfileGymsDetailResponseType } from '@/src/utils/type';
import { fetchProfileGymDetail } from '../../api';

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

  const postDetailDatas = profileGymData?.pages.flatMap((page) => page.posts);

  return (
    <div className={cn('container')}>
      <p>{userId}</p>
      <p>{gymId}</p>
    </div>
  );
};

export default ProfileGymPage;
