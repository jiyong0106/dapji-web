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

// 인스타그램 계정이 있는 사용자 목록 조회
export const useFetchInstaUsers = () => {
  return useQuery({
    queryKey: ['instaUsers'],
    queryFn: async () => {
      const res = await instance.get('/videos/instagram/users');
      return res.data;
    }
  });
};

// 특정 사용자의 인스타그램 숏코드 조회
export const useFetchUserShortcodes = (instaName: string) => {
  return useQuery({
    queryKey: ['userShortcodes', instaName],
    queryFn: async () => {
      if (!instaName) return null;
      const res = await instance.get(`/videos/instagram/users/${instaName}/shortcodes`);
      return res.data;
    },
    enabled: !!instaName, // instaName이 있을 때만 쿼리 실행
  });
};

// 모든 사용자의 인스타그램 동기화 상태 조회 (기존 함수, 필요시 사용)
export const useFetchInstaSyncStatus = () => {
  return useQuery({
    queryKey: ['instaSyncStatus'],
    queryFn: async () => {
      const res = await instance.get('/videos/instagram/sync');
      return res.data;
    },
    enabled: false, // 기본적으로 비활성화하고 필요할 때만 실행
  });
};

// 인스타그램 게시물 동기화 (숏코드로 인스타그램 동영상 다운로드)
export const useCreateSyncPost = () => {
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['createSyncPost'],
    mutationFn: async (params: { shortcode: string; user_idx?: number }) => {
      const res = await instance.post('/videos/instagram/sync-post', params);
      return res.data;
    },
    onSuccess: () => {
      // 자동 새로고침 제거
      showModalHandler('alert', '인스타그램 동영상 동기화에 성공했습니다.');
    },
    onError: (error) => {
      showModalHandler('alert', '동기화 실패: 다시 시도해 주세요');
      console.error('동기화 실패:', error);
    }
  });
};

// 인스타그램 동기화 게시물에 대한 알림 발송
export const useSendInstaSyncNotification = () => {
  const { showModalHandler } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['sendInstaSyncNotification'],
    mutationFn: async (insta_sync_post_idx: number) => {
      const res = await instance.post(`/videos/instagram/sync-post/${insta_sync_post_idx}/notify`);
      return res.data;
    },
    onSuccess: () => {
      showModalHandler('alert', '알림이 성공적으로 발송되었습니다.');
      // 자동 새로고침 제거
    },
    onError: (error) => {
      showModalHandler('alert', '알림 발송 실패: 다시 시도해 주세요');
      console.error('알림 발송 실패:', error);
    }
  });
};
