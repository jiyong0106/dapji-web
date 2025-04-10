import classNames from 'classnames/bind';
import styles from './profileGymData.module.scss';
import { fetchProfileGyms } from '@/src/app/(main)/profile/api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { ProfileGymsResponseType } from '@/src/utils/type';
import ProfileGymData from './profileGymData';

const cn = classNames.bind(styles);

type ProfileGymDatasProps = {
  params: {
    userId: string;
  };
};

const ProfileGymDatas = ({ params }: ProfileGymDatasProps) => {
  const { userId } = params;

  const { data: profileGymData, ref } =
    useInfiniteScroll<ProfileGymsResponseType>({
      queryKey: ['profileFavoriteGyms', userId],
      fetchFunction: (page = 1) =>
        fetchProfileGyms({
          page,
          userId,
        }),
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
      staleTime: 60 * 1000,
    });

  // 각 페이지의 favoriteGyms 배열을 하나로 병합
  const profileGyms = profileGymData?.pages.flatMap((page) => page.gyms) ?? [];

  return (
    <div className={cn('outerContainer')}>
      {profileGyms.length > 0 ? (
        <>
          {profileGyms.map((gym) => (
            <ProfileGymData item={gym} userId={userId} />
          ))}
        </>
      ) : (
        <p className={cn('emptyMessage')}>등반한 클라이밍장이 없어요! 🔥</p>
      )}
      <div ref={ref} />
    </div>
  );
};

export default ProfileGymDatas;
