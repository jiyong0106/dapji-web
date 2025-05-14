import { GymDetailResponseType } from '@/src/utils/type';
import instance from '@/src/utils/axios';
import ClinetGymDetail from '@/src/components/gymDetailPage/clinetGymDetail';

type GymDetailPageProps = {
  params: { gymId: string };
};

export const generateMetadata = async ({
  params,
}: {
  params: { gymId: string };
}) => {
  const fetchgymDetailData = await instance.get(`/posts/gym/${params.gymId}`, {
    params: {
      page: 1,
      color: '',
    },
  });
  const getgymDetailData: GymDetailResponseType = fetchgymDetailData.data;

  return {
    title: getgymDetailData.gym_name,
    description: getgymDetailData.gym_name,
    openGraph: {
      title: getgymDetailData.gym_name,
      description: getgymDetailData.gym_name,
      url: `${process.env.NEXT_PUBLIC_URL}/gym/${params.gymId}`,
      images: '/icon/widelogo.png',
    },
  };
};

const GymDetailPage = ({ params }: GymDetailPageProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ClinetGymDetail params={params} />
    </div>
  );
};

export default GymDetailPage;
