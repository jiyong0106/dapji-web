import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useFormPostUploadProps,
  useFormListUploadProps,
} from '@/src/utils/type';
import { useRouter } from 'next/navigation';
import instance from '@/src/utils/axios';
import { useModal } from '@/src/hooks/useModal';

export type fetchGymListDatasProps = {
  page: number;
  search: string;
  is_favorite?: boolean;
  sort?: string | null;
};

//클라이밍장 리스트 조회 함수
export const fetchGymListDatas = async ({
  page,
  search,
  is_favorite,
  sort,
}: fetchGymListDatasProps) => {
  const res = await instance.get(`/gyms`, {
    params: {
      page,
      search,
      is_favorite,
      sort,
    },
  });
  return res.data;
};

//클라이밍장 리스트 상세 조회 함수
export const useGymListDetails = (gymId: string) => {
  return useQuery({
    queryKey: ['gymDetailsKey', gymId],
    queryFn: () => instance.get(`/gyms/${gymId}`),
    select: (res: any) => res.data,
  });
};

//클라이밍장 리스트 업로드 함수
export const useGymListDatasUpload = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();
  return useMutation({
    mutationKey: ['gymListUploadKey'],
    mutationFn: (formData: useFormListUploadProps) =>
      instance.post(`/gyms`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gymListKey'] });
      router.push(`/admin/list`);
    },
    onError: (error) => {
      console.error('업로드 실패:', error);
      showModalHandler('alert', '업로드에 실패했어요');
    },
  });
};

//클라이밍장 리스트 삭제 함수
export const useGymListDatasDelete = (gymId: number) => {
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['gymListDeleteKey'],
    mutationFn: () => instance.delete(`/gyms/${gymId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gymListKey'] });
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      showModalHandler('alert', '삭제에 실패했어요');
    },
  });
};
//클라이밍장 리스트 수정 함수
export const useGymListDataUpdate = (gymId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['gymListUpdateKey'],
    mutationFn: (formData: useFormListUploadProps) =>
      instance.patch(`/gyms/${gymId}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gymListKey'] });
      router.push(`/admin/list`);
    },
    onError: (error) => {
      console.error('수정 실패:', error);
      showModalHandler('alert', '수정에 실패했어요');
    },
  });
};

// 클라이밍장 포스트 데이터 조회 함수
type fetchGymDetailDatasProps = {
  pageParam: number;
  gymId: string;
  color: string | null;
};

export const fetchGymDetailDatas = async ({
  pageParam = 1,
  gymId,
  color,
}: fetchGymDetailDatasProps) => {
  const res = await instance(`/posts/gym/${gymId}`, {
    params: {
      page: pageParam,
      color,
    },
  });
  return res.data;
};

// 클라이밍장 단일 비디오  데이터 조회 함수

export const fetchRenderSingleVideo = async (
  postId: string,
  videoIndex: number | null,
) => {
  const res = await instance.get(`/posts/${postId}/video/${videoIndex}`);
  return res.data.videoUrl;
};

//클라이밍장 포스트 데이터 업로드 함수
export const usePostUpload = (gymId: string | number) => {
  const router = useRouter();
  const { showModalHandler } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['postUploadKey'],
    mutationFn: (formData: useFormPostUploadProps) =>
      instance.post('/posts', formData),
    onSuccess: () => {
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
export const usePostUpdate = (postid: string, gymId: string) => {
  const router = useRouter();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['postUpdateKey'],
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
export const usePostDatas = (postid: string) => {
  return useQuery({
    queryKey: ['postDatasKey', postid],
    queryFn: () => instance.get(`/posts/${postid}`),
    select: (res: any) => res.data,
  });
};

// 클라이밍장 포스트 삭제 함수
export const usePostDelete = (postid: string, gymId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['postDeleteKey'],
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
