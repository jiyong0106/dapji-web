import classNames from 'classnames/bind';
import styles from './profileGymData.module.scss';
import { ProfileGymsType } from '@/src/utils/type';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { RightArrowIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type ProfileGymDataProps = {
  item: ProfileGymsType;
  userId: string;
};

const ProfileGymData = ({ item, userId }: ProfileGymDataProps) => {
  const { logo, post_count, gym_idx } = item;
  const router = useRouter();

  const gymClick = () => {
    router.push(`/profile/${userId}/${gym_idx}`);
  };

  //클라이밍 상세 클릭

  return (
    <li className={cn('container')} onClick={gymClick}>
      <Image
        src={logo || process.env.NEXT_PUBLIC_URL + '/icon/blueicon.png'}
        alt="로고이미지"
        width={80}
        height={80}
        priority
        className={cn('image')}
      />
      <div className={cn('textWrapper')}>
        <span className={cn('post_count')}>{post_count}개의 답지 공유</span>
        <RightArrowIcon width="15" height="15" />
      </div>
    </li>
  );
};

export default ProfileGymData;
