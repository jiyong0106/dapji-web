// api.ts 수정
import instance from "@/src/utils/axios";

export const fetchBoardReports = async () => {
  try {
    const response = await instance.post(`/allBoardReports`);
    return response.data;
  } catch (error) {
    console.error('Error fetching board reports:', error);
    throw error;
  }
};

export const deleteBoardData = async (board_idx: number) => {
  try {
    const response = await instance.delete(`/board/${board_idx}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting board:', error);
    throw error;
  }
};

export const keepBoardData = async (board_idx: number) => {
  try {
    const response = await instance.patch(`/board/${board_idx}`,{
            status: 'confirmed'
    });
    return response.data;
  } catch (error) {
    console.error('Error keeping board:', error);
    throw error;
  }
};

// resetBoardStatus 함수도 동일한 patch API를 사용하도록 수정
export const resetBoardStatus = async (board_idx: number) => {
  try {
    const response = await instance.patch(`/board/${board_idx}`,{
            status: 'pending'  // 이 부분도 추가
    });
    return response.data;
  } catch (error) {
    console.error('Error resetting board status:', error);
    throw error;
  }
};