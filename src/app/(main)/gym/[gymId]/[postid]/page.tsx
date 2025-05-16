import { PostDetailDataType } from '@/src/utils/type';
import instance from '@/src/utils/axios';
import ClientPostDetail from '@/src/components/postDetailPage/clientPostDetail';

type PostDetailPageProps = {
  params: { postid: string; gymId: string };
};

export const generateMetadata = async ({
  params,
}: {
  params: {
    gymId: string;
    postid: string;
  };
}) => {
  const res = await instance.get(`/posts/${params.postid}`);
  const postDetailData: PostDetailDataType = res.data;

  return {
    title: `${postDetailData.gym_name} - ${postDetailData.color}`,
    description: `${postDetailData.gym_name}에서 완등한 ${postDetailData.color} 문제`,
    openGraph: {
      title: `${postDetailData.gym_name} - ${postDetailData.color}`,
      description: `${postDetailData.gym_name}에서 완등한 ${postDetailData.color} 문제`,
      url: `${process.env.NEXT_PUBLIC_URL}/gym/${params.gymId}/${params.postid}`,
      images: '/icon/widelogo.png',
    },
  };
};

const PostDetailPage = ({ params }: PostDetailPageProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ClientPostDetail params={params} />
    </div>
  );
};

export default PostDetailPage;
