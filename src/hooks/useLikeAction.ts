import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import instance from '@/src/utils/axios';
import { isServerError } from '../utils/axiosError';
import { useModal } from './useModal';
import { useRouter } from 'next/navigation';

type LikeRequestProps = {
  category: string;
  content_id: string;
};

const LikeRequestData = async ({ category, content_id }: LikeRequestProps) => {
  const res = await instance.post(`/${category}/${content_id}/like`);
  return res.data;
};

type LikeActionState = {
  likeToggle: boolean;
  likeCount: number;
  handleLikeClick: (e: React.MouseEvent) => void;
};

type useLikeActionProps = {
  category: string;
  content_id: string;
  initalLikeToggle: boolean;
  initalLikeCount: number;
  firQueryKeyName?: string;
};

export const useLikeAction = ({
  category,
  content_id,
  initalLikeCount,
  initalLikeToggle,
  firQueryKeyName,
}: useLikeActionProps): LikeActionState => {
  const [likeToggle, setLikeToggle] = useState(initalLikeToggle);
  const [likeCount, setLikeCount] = useState(initalLikeCount);
  const { showModalHandler } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: likeRequest } = useMutation({
    mutationKey: ['LikeRequest'],
    mutationFn: () => LikeRequestData({ category, content_id }),
    onMutate: async () => {
      const previousData = queryClient.getQueryData([firQueryKeyName]);

      setLikeToggle((prev) => {
        const newToggle = !prev;
        setLikeCount((prevCount) =>
          newToggle ? prevCount + 1 : prevCount - 1,
        );
        return newToggle;
      });

      return { previousData };
    },
    onError: (e, variables, context) => {
      if (isServerError(e) && e.response && e.response.status === 401) {
        showModalHandler('alert', ' 해당 기능은 로그인이 필요해요', () =>
          router.replace('/main'),
        );
        return;
      }
      if (isServerError(e) && e.response && e.response.status === 500) {
        showModalHandler('alert', '잠시후 다시 시도해 주세요');
        return;
      }
      if (context?.previousData) {
        queryClient.setQueryData([firQueryKeyName], context.previousData);
      }
    },
    onSettled: () => {
      // 전체 쿼리 무효화가 아닌 필요한 데이터만 업데이트
      queryClient.setQueryData([firQueryKeyName], (oldData: any) => {
        if (!oldData) return oldData;
        // 좋아요 카운트와 토글 상태를 업데이트하여 캐시 데이터 변경
        return {
          ...oldData,
          likeCount: likeToggle ? likeCount - 1 : likeCount + 1,
          likeToggle: !likeToggle,
        };
      });
    },
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    likeRequest();
  };

  return { likeToggle, likeCount, handleLikeClick };
};

//initalLikeToggle 값은 컴포넌트의 초기 상태일뿐 현재 상태와 항상 일치하지 않음
//이로인해 likeToggle이 변화해도 initalLikeToggle을 기준으로 증가/감소가 이루어져 likeCount가 잘못된 값으로 설정될 가능성이 생김

//likeToggle 상태가 변경되면, 그 새로운 상태(newToggle)를 setLikeCount의 기준으로 사용
// 이렇게 하면, 실제 상태 변경에 맞추어 likeCount가 정확하게 1씩 증가 또는 감소.
