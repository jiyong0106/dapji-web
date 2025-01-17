import instance from "@/src/utils/axios";

export const fetchPostReports = async () => {
  try {
    const response = await instance.get(`/allPostReports`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post reports:', error);
    throw error;
  }
};

export const deletePostData = async (post_idx: number) => {
  try {
    // /posts/:post_idx로 수정
    const response = await instance.delete(`/posts/${post_idx}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const keepPostData = async (post_idx: number) => {
  try {
    // /posts/:post_idx로 수정
    const response = await instance.patch(`/posts/${post_idx}`, {
      status: 'confirmed'
    });
    return response.data;
  } catch (error) {
    console.error('Error keeping post:', error);
    throw error;
  }
};

export const resetPostStatus = async (post_idx: number) => {
  try {
    // /posts/:post_idx로 수정
    const response = await instance.patch(`/posts/${post_idx}`, {
      status: 'pending'
    });
    return response.data;
  } catch (error) {
    console.error('Error resetting post status:', error);
    throw error;
  }
};