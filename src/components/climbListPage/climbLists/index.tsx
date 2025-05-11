'use client';
import styles from './climbLists.module.scss';
import classNames from 'classnames/bind';
import { GymsType } from '@/src/utils/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FavoriteAction from '../favoriteClimbList';
import useFavoriteAction from '@/src/hooks/useFavoriteAction';
import { PostIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type ClimbListProps = {
  list: GymsType;
};

const ClimbList = ({ list }: ClimbListProps) => {
  const { logo, name, gym_idx, address, is_favorite, post_count } = list;
  console.log(list);

  const router = useRouter();

  const { handleFavoriteClick, favoriteToggle } = useFavoriteAction({
    initalFavoriteToggle: is_favorite,
    gymId: gym_idx,
  });

  const detailClick = () => {
    router.push(`/gym/${gym_idx}`);
  };

  return (
    <li className={cn('container')} onClick={detailClick}>
      <div className={cn('imageWrapper')}>
        <Image
          src={logo || process.env.NEXT_PUBLIC_URL + '/icon/blueicon.png'}
          alt="로고이미지"
          width={100}
          height={100}
          priority
          className={cn('image')}
        />
        <div className={cn('like')}>
          <FavoriteAction
            favoriteToggle={favoriteToggle}
            onClick={handleFavoriteClick}
          />
        </div>
        <p>
          <PostIcon width="15" height="15" fill="white" />
          {post_count}개
        </p>
      </div>
      <div className={cn('textWrapper')}>
        <div className={cn('nameWrapper')}>
          <span className={cn('name')}>{name}</span>
        </div>
        <span className={cn('address')}>{address}</span>
      </div>
    </li>
  );
};

//
type ClimbListsProps = {
  lists: GymsType[];
};

const ClimbLists = ({ lists }: ClimbListsProps) => {
  return (
    <div className={cn('outercontainer')}>
      {lists.map((list: GymsType) => (
        <ClimbList key={list.gym_idx} list={list} />
      ))}
    </div>
  );
};

export default ClimbLists;
