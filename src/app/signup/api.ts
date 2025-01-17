import instance from '@/src/utils/axios';

export type fetchSignUpType = {
  email: string;
  password: string;
};

export const fetchSignUp = async (formData: fetchSignUpType) => {
  const res = await instance.post(`/signUp`, formData);
  return res.data;
};
