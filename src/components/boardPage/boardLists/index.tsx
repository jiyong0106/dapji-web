import styles from './boardLists.module.scss';
import classNames from 'classnames/bind';
import { BoardListDataType } from '@/src/utils/type';
import Image from 'next/image';
import useTruncateString from '@/src/hooks/useTruncateString';
import LinkPreview from '@/src/components/common/linkPreview';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import LikeAction from '../../common/likeAction';
import { useRouter } from 'next/navigation';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import CommentCount from '../../common/commentCount';

const cn = classNames.bind(styles);

type BoardListProps = {
  list: BoardListDataType;
};

const BoardList = ({ list }: BoardListProps) => {
  const {
    User,
    category,
    like_count,
    comment_count,
    title,
    content,
    preview,
    img,
    createdAt,
    is_like,
    user_idx,
    board_idx,
  } = list;
  const { likeCount, likeToggle, handleLikeClick } = useLikeAction({
    category: 'boards',
    content_id: board_idx,
    initalLikeCount: like_count,
    initalLikeToggle: is_like,
    firQueryKeyName: 'boardListData',
  });

  const router = useRouter();

  const timeAgo = useTimeAgo(createdAt);
  //시간대 표시

  const truncateString = useTruncateString();
  //글자수 제한한
  const imageLeghth = img.length;
  //이미지 갯수 표시

  const profileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof user_idx === 'undefined') return;
    router.push(`/profile/${user_idx}`);
  };

  const navigateToBoard = () => {
    router.push(`/board/${board_idx}`);
  };

  return (
    <article className={cn('container')} onClick={navigateToBoard}>
      <div className={cn('containerWrapper')}>
        <section className={cn('contentWrapper')}>
          <header className={cn('userInfo')}>
            <Image
              src={
                User?.img || process.env.NEXT_PUBLIC_URL + '/icon/blueicon.png'
              }
              width={30}
              height={30}
              alt="유저 이미지"
              className={cn('profileImage')}
              onClick={user_idx ? profileClick : undefined}
              style={{ cursor: user_idx ? 'pointer' : 'default' }}
            />
            <div className={cn('dateWrapper')}>
              <span className={cn('category')}>{category}</span>
              <div className={cn('dataInfo')}>
                <span>{User?.nickname || '❗탈퇴한 사용자'}</span>
                <span>{timeAgo}</span>
              </div>
            </div>
          </header>
          <h1>{truncateString(title, 15)}</h1>
          <span className={cn('content')}>{truncateString(content, 20)}</span>
        </section>

        <section className={cn('boardImageWrapper')}>
          {img.length > 0 && (
            <>
              <Image
                src={img[0]}
                width="100"
                height="100"
                alt="게시물 이미지"
                className={cn('boardImage')}
                priority
              />
              {img.length >= 1 && (
                <span className={cn('imageLength')}>+ {imageLeghth}</span>
              )}
            </>
          )}
          <div className={cn('iconWrapper')}>
            <LikeAction
              likeToggle={likeToggle}
              likeCount={likeCount}
              onClick={handleLikeClick}
            />
            <CommentCount count={comment_count} />
          </div>
        </section>
      </div>

      {preview && <LinkPreview previews={preview} singlePreview={true} />}
    </article>
  );
};

type BoardListsProps = {
  lists: BoardListDataType[];
};

const BoardLists = ({ lists }: BoardListsProps) => {
  return (
    <div className={cn('outerContainer')}>
      {lists.map((list: BoardListDataType) => (
        <BoardList key={list.board_idx} list={list} />
      ))}
    </div>
  );
};

export default BoardLists;
