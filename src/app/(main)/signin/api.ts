import instance from '@/src/utils/axios';

export type fetchSignInType = {
  email: string;
  password: string;
};

export const fetchSignIn = async (formData: fetchSignInType) => {
  const res = await instance.post(`/login`, formData);
  return res.data;
};
