import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useFormPostUploadProps,
  useFormListUploadProps,
} from '@/src/utils/type';
import { useRouter } from 'next/navigation';
import instance from '@/src/utils/axios';
import { useModal } from '@/src/hooks/useModal';

type ClimbListProps = {
  page: number;
  search: string;
  is_favorite?: boolean;
};

//클라이밍장 리스트 조회 함수
export const ClimbListDatas = async ({
  page,
  search,
  is_favorite,
}: ClimbListProps) => {
  const res = await instance.get(`/gyms`, {
    params: {
      page,
      search,
      is_favorite,
    },
  });
  return res.data;
};

//클라이밍장 리스트 상세 조회 함수
export const useClimbListDetails = (gymId: string) => {
  return useQuery({
    queryKey: ['climbListDetails', gymId],
    queryFn: () => instance.get(`/gyms/${gymId}`),
    select: (res: any) => res.data,
  });
};

//클라이밍장 리스트 업로드 함수
export const useClimbListDatasUpload = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();
  return useMutation({
    mutationKey: ['climbListUpload'],
    mutationFn: (formData: useFormListUploadProps) =>
      instance.post(`/gyms`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbList'] });
      router.push(`/admin/list`);
    },
    onError: (error) => {
      console.error('업로드 실패:', error);
      showModalHandler('alert', '업로드에 실패했어요');
    },
  });
};

//클라이밍장 리스트 삭제 함수
export const useClimbListDatasDelete = (gymId: number) => {
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['climbListDelete'],
    mutationFn: () => instance.delete(`/gyms/${gymId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbList'] });
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      showModalHandler('alert', '삭제에 실패했어요');
    },
  });
};
//클라이밍장 리스트 수정 함수
export const useClimbListDataUpdate = (gymId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['climbListUpdate'],
    mutationFn: (formData: useFormListUploadProps) =>
      instance.patch(`/gyms/${gymId}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbList'] });
      router.push(`/admin/list`);
    },
    onError: (error) => {
      console.error('수정 실패:', error);
      showModalHandler('alert', '수정에 실패했어요');
    },
  });
};

// 클라이밍장 포스트 데이터 조회 함수
type ClimbPostDatasProps = {
  pageParam: number;
  gymId: string;
  color: string | null;
};

export const climbPostDatas = async ({
  pageParam = 1,
  gymId,
  color,
}: ClimbPostDatasProps) => {
  const res = await instance(`/posts/gym/${gymId}`, {
    params: {
      page: pageParam,
      color,
    },
  });
  return res.data;
};

//클라이밍장 포스트 데이터 업로드 함수
export const usePostDetailUpload = (gymId: string | number) => {
  const router = useRouter();
  const { showModalHandler } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['detailUpload'],
    mutationFn: (formData: useFormPostUploadProps) =>
      instance.post('/posts', formData),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['userProfileData'] });
      router.replace(`/gym/${gymId}`);
    },
    onError: () => {
      showModalHandler('alert', '동영상,등반일, 난이도 선택은 필수에요.');
    },
  });
};

// 동영상 업로드 함수
export const useVideoUpload = () => {
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['videoUpload'],
    mutationFn: async (formData: FormData) => {
      const response = await instance.post('/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onError: (error) => {
      console.error('동영상 업로드 실패:', error);
      showModalHandler('alert', '동영상 업로드에 실패했어요');
    },
  });
};

// 클라이밍장 포스트 수정 함수
export const usePostDetailUpdate = (postid: string, gymId: string) => {
  const router = useRouter();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['postDetailUpdate'],
    mutationFn: (formData: useFormPostUploadProps) =>
      instance.patch(`/posts/${postid}`, formData),
    onSuccess: () => {
      router.replace(`/gym/${gymId}/${postid}`);
    },
    onError: () => {
      showModalHandler('alert', '동영상,등반일, 난이도 선택은 필수에요.');
    },
  });
};

// 클라이밍장 포스트의 디테일 함수
export const usePostDetailDatas = (postid: string) => {
  return useQuery({
    queryKey: ['postDetailDatas', postid],
    queryFn: () => instance.get(`/posts/${postid}`),
    select: (res: any) => res.data,
  });
};

// 클라이밍장 포스트 삭제 함수
export const usePostDetailDelete = (postid: string, gymId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['postDetailDelete'],
    mutationFn: () => instance.delete(`/posts/${postid}`),
    onSuccess: () => {
      router.replace(`/gym/${gymId}`);
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      showModalHandler('alert', '삭제가 되지 않았어요');
    },
  });
};

// 클라이밍장 동영상 개별 삭제 함수
export const useVideoDelete = () => {
  const queryClient = useQueryClient();
  const videoDelete = useMutation({
    mutationKey: ['videoDelete'],
    mutationFn: (url: { videoUrl: string; thumbnailUrl: string }) =>
      instance.post(`/videos/delete`, url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfileData'] });
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });
  return videoDelete;
};

// 클라이밍장별 공지 조회
export const fetchNoticeData = async (gymId: string) => {
  const res = await instance.get(`/gyms/${gymId}/notice`);
  return res.data;
};
