'use client';
import classNames from 'classnames/bind';
import styles from './detailMainContent.module.scss';
import { RightArrowIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import { PostDetailType } from '@/src/utils/type';
import Image from 'next/image';
import LikeAction from '@/src/components/common/likeAction';

import useTimeAgo from '@/src/hooks/useTimeAgo';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import CommentCount from '@/src/components/common/commentCount';
import Link from 'next/link';

const cn = classNames.bind(styles);

export type DetailMainContentProps = {
  list: PostDetailType;
  gymName: string;
};

const DetailMainContent = ({ list, gymName }: DetailMainContentProps) => {
  const {
    color,
    User,
    clearday,
    content,
    post_idx,
    gym_idx,
    user_idx,
    createdAt,
    like_count,
    is_like,
    post_comment,
    post_comment_count,
    thumbnailUrl,
  } = list;

  //리스트 데이터들

  const timeAgo = useTimeAgo(createdAt);
  const cleartimeAgo = useTimeAgo(clearday);

  const { likeCount, likeToggle, handleLikeClick } = useLikeAction({
    category: 'posts',
    content_id: post_idx,
    initalLikeCount: like_count,
    initalLikeToggle: is_like,
    firQueryKeyName: 'climbPost',
  });

  const router = useRouter();

  const postDetailPage = () => {
    router.push(`/gym/${gym_idx}/${post_idx}`);
  };
  // 영상 상세 페이지 이동

  const deleteT = (date: string | null) => date?.split('T')[0];
  // 시간 가공

  const profileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/profile/${user_idx}`);
  };
  // 프로필 클릭

  return (
    <div className={cn('container')}>
      {/* 유저프로필 */}
      <div className={cn('userWrapper')}>
        <div className={cn('userInfo')} onClick={profileClick}>
          <Image
            src={User.img || '/icon/blueicon.png'}
            width="30"
            height="30"
            alt="userImg"
          />
          <div className={cn('dateWrapper')}>
            <span>{User?.nickname}</span>
            <span>{timeAgo}</span>
          </div>
        </div>
        <RightArrowIcon width="15" height="15" onClick={postDetailPage} />
      </div>
      {/* 썸네일 이미지 */}
      <div className={cn('videoWrapper')}>
        <Image
          src={thumbnailUrl?.[0] || '/images/default-thumbnail.png'}
          alt={`thumbnail`}
          width={900}
          height={200}
          className={cn('thumbnail')}
          priority
        />
      </div>
      {/* 썸네일 이미지 아래 내용 */}
      <div className={cn('contentWrapper')} onClick={postDetailPage}>
        <div className={cn('iconWrapper')}>
          <LikeAction
            likeToggle={likeToggle}
            likeCount={likeCount}
            onClick={handleLikeClick}
          />
          <CommentCount count={post_comment_count} />
        </div>
        <div className={cn('clearday')}>
          <div className={cn('difficultyWrapper')}>
            <span>{gymName} | </span>
            <span>난이도</span>
            <div className={cn('color', `color-${color}`)} />
          </div>

          <span>
            등반일 : {deleteT(clearday)} (
            {new Date(clearday).toDateString() === new Date().toDateString()
              ? '오늘'
              : cleartimeAgo}
            )
          </span>
        </div>
      </div>
    </div>
  );
};

export type DetailMainContentListProps = {
  lists: PostDetailType[];
  gymName: string;
};

const DetailMainContentList = ({
  lists,
  gymName,
}: DetailMainContentListProps) => {
  const isCompactLayout = lists.length <= 3;
  return (
    <div className={cn('outercontainer', { compact: isCompactLayout })}>
      {lists?.map((list: PostDetailType) => (
        <DetailMainContent key={list.post_idx} list={list} gymName={gymName} />
      ))}
    </div>
  );
};

export default DetailMainContentList;
