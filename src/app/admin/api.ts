import { useModal } from '@/src/hooks/useModal';
import instance from '@/src/utils/axios';
import { useFormNoticeUploadType } from '@/src/utils/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//공지 업로드
export const fetchNoticeUpload = async (
  formData: useFormNoticeUploadType,
  gymId: string,
) => {
  const res = await instance.post(`/api/gyms/${gymId}/notice`, formData);
  return res.data;
};

//공지 수정
export const fetchNoticeUpdate = async (
  formData: useFormNoticeUploadType,
  gymId: string,
) => {
  const res = await instance.patch(`/api/gyms/${gymId}/notice`, formData);
  return res.data;
};

//공지 이미지 삭제
export const useNoticeImageDelete = () => {
  const { showModalHandler } = useModal();
  const imageDelete = useMutation({
    mutationKey: ['noticeImageDelete'],
    mutationFn: (imageUrl: string) =>
      instance.post(`/api/images/notice-image/delete`, imageUrl),
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
