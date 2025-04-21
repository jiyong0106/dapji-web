import classNames from 'classnames/bind';
import styles from './boardDetailForm.module.scss';
import { BorardDetailResponseType } from '@/src/utils/type';
import Image from 'next/image';
import { DeleteIcon, EditIcon } from '@/public/icon';
import LikeAction from '../../common/likeAction';
import { boardDeleteData } from '@/src/app/(main)/board/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useModal } from '@/src/hooks/useModal';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import CommentCount from '../../common/commentCount';
import LinkifyText from '@/src/hooks/useLinkifyText';
import LinkPreview from '../../common/linkPreview';
import useTimeAgo from '@/src/hooks/useTimeAgo';

const cn = classNames.bind(styles);

type BoardDetailFormProps = {
  boardDetailData: BorardDetailResponseType;
};

const BoardDetailForm = ({ boardDetailData }: BoardDetailFormProps) => {
  const {
    board_idx,
    user_idx,
    title,
    content,
    category,
    createdAt,
    updatedAt,
    img = [],
    like_count,
    comment_count,
    User,
    is_like,
    is_owner,
  } = boardDetailData?.result;
  const previews = boardDetailData?.preview;

  const { likeToggle, likeCount, handleLikeClick } = useLikeAction({
    category: 'boards',
    content_id: board_idx,
    initalLikeCount: like_count,
    initalLikeToggle: is_like,
    firQueryKeyName: 'boardDetailData',
  });

  const router = useRouter();
  const { showModalHandler } = useModal();
  const timeAgo = useTimeAgo(createdAt);

  const { mutate: boardDelete } = useMutation({
    mutationKey: ['boardDelete'],
    mutationFn: () => boardDeleteData(board_idx),
    onSuccess: () => {
      router.replace(`/board`);
    },
    onError: () => {
      showModalHandler('alert', '게시글 삭제에 실패했어요');
    },
  });

  const handleBoardDelete = () => {
    const confirmAction = () => {
      boardDelete();
    };
    showModalHandler('choice', '게시글을 삭제하시겠어요?', confirmAction);
  };

  const boardEditClick = () => {
    router.replace(`/board/${board_idx}/edit`);
  };

  const profileClick = () => {
    if (typeof user_idx === 'undefined') return;
    router.push(`/profile/${user_idx}`);
  };

  return (
    <div className={cn('container', { hasComment: comment_count > 0 })}>
      <header className={cn('boardDetailHeader')}>
        <div className={cn('userInfo')}>
          <Image
            src={User?.img || process.env.NEXT_PUBLIC_URL + '/icon/icon.png'}
            width="30"
            height="30"
            alt="게시물 작성자 프로필 이미지"
            className={cn('profileImage')}
            onClick={user_idx ? profileClick : undefined}
            style={{ cursor: user_idx ? 'pointer' : 'default' }}
          />
          <div className={cn('userText')}>
            <span className={cn('category')}>{category}</span>
            <div className={cn('nicknameWrapper')}>
              <span>{User?.nickname || '❗탈퇴한 사용자'}</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
        {is_owner && (
          <div className={cn('iconWrapper')}>
            <EditIcon onClick={boardEditClick} />
            <DeleteIcon onClick={handleBoardDelete} />
          </div>
        )}
      </header>
      <main className={cn('mainWrapper')}>
        <div className={cn('textWrapper')}>
          <h1>{title}</h1>
          <pre className={cn('contentWrapper')}>
            <LinkifyText text={content} />
          </pre>
        </div>
        {img?.length > 0 ? (
          img.map((image, index) => (
            <Image
              key={index}
              src={image || process.env.NEXT_PUBLIC_URL + '/icon/icon.png'}
              width={100}
              height={100}
              alt={`게시물 이미지 ${index + 1}`}
              className={cn('boardImage')}
              priority
            />
          ))
        ) : (
          <div className={cn('noBoardImage')}></div>
        )}
        {previews && <LinkPreview previews={previews} />}
      </main>
      <div className={cn('iconWrapper')}>
        <LikeAction
          likeCount={likeCount}
          likeToggle={likeToggle}
          onClick={handleLikeClick}
        />
        <CommentCount count={comment_count} />
      </div>
    </div>
  );
};

export default BoardDetailForm;
