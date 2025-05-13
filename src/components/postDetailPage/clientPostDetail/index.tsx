'use client';
import { useState } from 'react';
import styles from './clientPostDetail.module.scss';
import classNames from 'classnames/bind';
import PostDetailForm from '@/src/components/postDetailPage/postDetailForm';
import { usePostDatas } from '@/src/app/(main)/gym/api';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import CommentInput from '@/src/components/boardDetailPage/commentInput';
import PostCommentLists from '@/src/components/postDetailPage/postCommentLists';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { CommentDatas } from '@/src/hooks/useCommentDatas';
import { PostCommentType, PostCommentDetailType } from '@/src/utils/type';
import SkeletonGymDetail from '../../gymDetailPage/skeletonGymDetail';

const cn = classNames.bind(styles);

type ClientPostDetail = {
  params: { postid: string; gymId: string };
};

const ClientPostDetail = ({ params }: ClientPostDetail) => {
  const { postid, gymId } = params;
  const [tagNickname, setTagNickname] = useState('');
  const [selectId, setSelectId] = useState('');

  const { data: postDetailDatas, isLoading } = usePostDatas(postid);
  //포스트 상세페이지 데이터
  const {
    data: postDetailCommentData,
    isFetchingNextPage,
    ref,
  } = useInfiniteScroll<PostCommentType>({
    queryKey: ['postDetailComment'],
    fetchFunction: (page = 1) =>
      CommentDatas({
        page,
        content_id: postid,
        category: 'postComment',
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const commentDatas: PostCommentDetailType[] =
    postDetailCommentData?.pages.flatMap((page) => page.postComments) ?? [];

  const isMyPost = postDetailDatas?.is_post_owner;

  if (isLoading || !postDetailDatas) {
    return <SkeletonGymDetail />;
  }

  return (
    <div className={cn('container')}>
      <PostDetailForm params={params} postDetailDatas={postDetailDatas} />
      <PostCommentLists
        lists={commentDatas}
        setTagNickname={setTagNickname}
        setSelectId={setSelectId}
        isMyPost={isMyPost}
      />
      <CommentInput
        params={{ postId: postid }}
        tagNickname={tagNickname}
        setTagNickname={setTagNickname}
        selectId={selectId}
      />
      <div ref={ref} />
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default ClientPostDetail;
