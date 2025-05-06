import { useModal } from '@/src/hooks/useModal';
import instance from '@/src/utils/axios';
import { useFormNoticeUploadType } from '@/src/utils/type';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

//공지 업로드
export const fetchNoticeUpload = async (
  formData: useFormNoticeUploadType,
  gymId: string,
) => {
  const res = await instance.post(`/gyms/${gymId}/notice`, formData);
  return res.data;
};

//공지 수정
export const fetchNoticeUpdate = async (
  formData: useFormNoticeUploadType,
  gymId: string,
) => {
  const res = await instance.patch(`/gyms/${gymId}/notice`, formData);
  return res.data;
};

//공지 이미지 삭제
export const useNoticeImageDelete = () => {
  const { showModalHandler } = useModal();
  const imageDelete = useMutation({
    mutationKey: ['noticeImageDelete'],
    mutationFn: (imageUrl: string) =>
      instance.post(`/images/notice-image/delete`, imageUrl),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['userProfileData'] });
    },
    onError: (error) => {
      showModalHandler('alert', '이미지 삭제를 다시 시도해 주세요');
      console.error('삭제 실패:', error);
    },
  });
  return imageDelete;
};

// 인스타그램 동기화 상태 조회
export const useFetchInstaSyncStatus = () => {
  return useQuery({
    queryKey: ['instaSyncStatus'],
    queryFn: async () => {
      const res = await instance.get('/videos/instagram/sync');
      return res.data;
    }
  });
};

// 인스타그램 게시물 동기화 (숏코드로 인스타그램 동영상 다운로드)
export const useCreateSyncPost = () => {
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['createSyncPost'],
    mutationFn: async (shortcode: string) => {
      const res = await instance.post('/videos/instagram/sync-post', { shortcode });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instaSyncStatus'] });
      showModalHandler('alert', '인스타그램 동영상 동기화에 성공했습니다.');
    },
    onError: (error) => {
      showModalHandler('alert', '동기화 실패: 다시 시도해 주세요');
      console.error('동기화 실패:', error);
    }
  });
};
