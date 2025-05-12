import ClientBoardDetail from '@/src/components/boardDetailPage/clientBoardDetail';
import { boardDetailGetDatas } from '../api';
import { BorardDetailResponseType } from '@/src/utils/type';

export const generateMetadata = async ({
  params,
}: {
  params: { boardId: string };
}) => {
  const boardDetailData: BorardDetailResponseType = await boardDetailGetDatas(
    params.boardId,
  );

  return {
    title: boardDetailData.result.title,
    description: boardDetailData.result.category,
    openGraph: {
      title: boardDetailData.result.title,
      description: boardDetailData.result.category,
      url: `${process.env.NEXT_PUBLIC_URL}/board/${params.boardId}`,
      images: '/icon/widelogo.png',
    },
  };
};

const BoardDetailPage = ({ params }: { params: { boardId: string } }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ClientBoardDetail boardId={params.boardId} />
    </div>
  );
};

export default BoardDetailPage;
