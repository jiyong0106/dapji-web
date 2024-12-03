import instance from "@/src/utils/axios";

export const fetchBoardReports = async () => {
  try {
    const response = await instance.post(`/api/allBoardReports`);
    return response.data;
  } catch (error) {
    console.error('Error fetching board reports:', error);
    throw error;
  }
};

export const deleteBoardData = async (board_idx: number) => {
  try {
    const response = await instance.delete(`/api/board/${board_idx}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting board:', error);
    throw error;
  }
};