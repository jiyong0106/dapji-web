'use client';
import classNames from 'classnames/bind';
import styles from './detailMainContent.module.scss';
import { RightArrowIcon } from '@/public/icon';
import { PostDetailType } from '@/src/utils/type';
import Image from 'next/image';
import LikeAction from '@/src/components/common/likeAction';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import CommentCount from '@/src/components/common/commentCount';
import SmartLink from '../../common/smartLink';

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
    post_idx,
    gym_idx,
    user_idx,
    createdAt,
    like_count,
    is_like,
    post_comment_count,
    thumbnailUrl,
  } = list;

  const timeAgo = useTimeAgo(createdAt);
  const cleartimeAgo = useTimeAgo(clearday);

  const { likeCount, likeToggle, handleLikeClick } = useLikeAction({
    category: 'posts',
    content_id: post_idx,
    initalLikeCount: like_count,
    initalLikeToggle: is_like,
    firQueryKeyName: 'climbPost',
  });

  const deleteT = (date: string | null) => date?.split('T')[0];

  return (
    <div className={cn('container')}>
      {/* 유저프로필 */}
      <div className={cn('userWrapper')}>
        {/* 프로필 SmartLink */}
        <SmartLink
          href={`/profile/${user_idx}`}
          className={cn('userInfo')}
          prefetch
        >
          <Image
            src={User.img || '/icon/blueicon.png'}
            width={30}
            height={30}
            alt="userImg"
          />
          <div className={cn('dateWrapper')}>
            <span>{User?.nickname}</span>
            <span>{timeAgo}</span>
          </div>
        </SmartLink>

        {/* 상세페이지 SmartLink */}
        <SmartLink href={`/gym/${gym_idx}/${post_idx}`} prefetch>
          <RightArrowIcon width="15" height="15" />
        </SmartLink>
      </div>

      {/* 썸네일 (여기는 그대로 클릭 시 postDetailPage 역할) */}
      <SmartLink
        href={`/gym/${gym_idx}/${post_idx}`}
        className={cn('videoWrapper')}
        prefetch
      >
        <Image
          src={thumbnailUrl?.[0] || '/images/default-thumbnail.png'}
          alt={`thumbnail`}
          width={900}
          height={200}
          className={cn('thumbnail')}
          priority
        />
        {Array.isArray(thumbnailUrl) && thumbnailUrl.length > 1 && (
          <div className={cn('indicatorWrapper')}>
            {thumbnailUrl.slice(0, 5).map((_, index) => (
              <span key={index} className={cn('dot')} />
            ))}
            {thumbnailUrl.length > 5 && (
              <span className={cn('more')}>+{thumbnailUrl.length - 5}</span>
            )}
          </div>
        )}
      </SmartLink>

      {/* 본문 내용 영역 */}
      <SmartLink
        href={`/gym/${gym_idx}/${post_idx}`}
        className={cn('contentWrapper')}
        prefetch
      >
        <div className={cn('iconWrapper')}>
          <LikeAction
            likeToggle={likeToggle}
            likeCount={likeCount}
            onClick={handleLikeClick} // ✅ 좋아요는 그대로 유지
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
      </SmartLink>
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
