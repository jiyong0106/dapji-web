import instance from '@/src/utils/axios';

//  공지 업로드  /api/notices
//  공지 조회  /api/notices
//  공지 수정  /api/notices/noticeId
//  공지 삭제  /api/notices /noticeId
//  공지 업로드  /api/notices

export const fetchadNoticeUpload = async (formData: any) => {
  const res = await instance.post(`/api/notices`, formData);
  return res.data;
};

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
