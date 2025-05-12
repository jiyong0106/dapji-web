'use client';
import styles from './ClientBoardDetail.module.scss';
import classNames from 'classnames/bind';
import BoardDetailForm from '@/src/components/boardDetailPage/boardDetailForm';
import CommentLists from '@/src/components/boardDetailPage/commentLists';
import { boardDetailGetDatas } from '@/src/app/(main)/board/api';
import { CommentDatas } from '@/src/hooks/useCommentDatas';
import { useQuery } from '@tanstack/react-query';
import {
  BoardCommentType,
  BoardCommentDetailType,
  BorardDetailResponseType,
} from '@/src/utils/type';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import CommentInput from '@/src/components/boardDetailPage/commentInput';
import { useState } from 'react';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';

const cn = classNames.bind(styles);

type ClientBoardDetailProps = {
  boardId: string;
};
const ClientBoardDetail = ({ boardId }: ClientBoardDetailProps) => {
  const [tagNickname, setTagNickname] = useState('');
  const [selectId, setSelectId] = useState('');

  //게시판 상세 내용데이터
  const { data: boardDetailData, isLoading } =
    useQuery<BorardDetailResponseType>({
      queryKey: ['boardDetailData'],
      queryFn: () => boardDetailGetDatas(boardId),
    });

  //게시판 댓글 데이터

  const {
    data: boardDetailCommentData,
    isFetchingNextPage,
    ref,
  } = useInfiniteScroll<BoardCommentType>({
    queryKey: ['boardDetailComment'],
    fetchFunction: (page = 1) =>
      CommentDatas({
        page,
        content_id: boardId,
        category: 'comment',
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const commentDatas: BoardCommentDetailType[] =
    boardDetailCommentData?.pages.flatMap((page) => page.comments) ?? [];

  if (isLoading || !boardDetailData) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <BoardDetailForm boardDetailData={boardDetailData} />
      <CommentLists
        lists={commentDatas}
        setTagNickname={setTagNickname}
        setSelectId={setSelectId}
      />
      <CommentInput
        params={{ boardId: boardId }}
        tagNickname={tagNickname}
        setTagNickname={setTagNickname}
        selectId={selectId}
        anonymous
      />
      <div ref={ref} />
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default ClientBoardDetail;
