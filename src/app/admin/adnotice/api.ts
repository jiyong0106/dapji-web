import instance from '@/src/utils/axios';

//  공지 업로드  /api/notices
//  공지 조회  /api/notices
//  공지 수정  /api/notices/noticeId
//  공지 삭제  /api/notices /noticeId
//  공지 업로드  /api/notices

type fetchadNoticeDataProps = {
  page: number;
};

//공지 전체 조회
export const fetchadNoticeData = async ({ page }: fetchadNoticeDataProps) => {
  const res = await instance.get(`/api/notices`, {
    params: {
      page,
    },
  });
  return res.data;
};

//공지 상세 조회
export const fetchNoticeDetailData = async (noticeId: string) => {
  const res = await instance.get(`/api/notices/${noticeId}`);
  return res.data;
};

//공지 업로드
export const fetchadNoticeUpload = async (formData: any) => {
  const res = await instance.post(`/api/notices`, formData);
  return res.data;
};

//공지 이미지 업로드
export const fetchadNoticeImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file); // API의 "image" 필드에 파일 추가

  const response = await instance.post('/api/images/gym-logo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // multipart 형식으로 요청
    },
  });

  return response.data;
};
