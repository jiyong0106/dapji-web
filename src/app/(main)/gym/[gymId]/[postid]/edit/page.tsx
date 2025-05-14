'use client';
import styles from './postDetailEdit.module.scss';
import classNames from 'classnames/bind';
import PostUploadForm from '@/src/components/postUploadPage/postUploadForm';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { usePostDatas } from '@/src/app/(main)/gym/api';
import Header from '@/src/components/common/header';
import ModalChoice from '@/src/components/common/moadlChoice';

const cn = classNames.bind(styles);

type PostDetailEditPageProps = {
  params: { postid: string; gymId: string };
};

const PostDetailEditPage = ({ params }: PostDetailEditPageProps) => {
  const { postid, gymId } = params;
  const { data: postDetailDatas, isLoading } = usePostDatas(postid);

  if (isLoading || !postDetailDatas) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <Header page={`/gym/${gymId}/${postid}`} />
      <div className={cn('secondContainer')}>
        <PostUploadForm gymId={gymId} initialData={postDetailDatas} />
      </div>
      <ModalChoice />
    </div>
  );
};

export default PostDetailEditPage;
