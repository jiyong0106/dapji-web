import { create } from 'zustand';

type MyInfoState = {
  role: string;
  setrole: (role: string) => void;
};

export const useRoleStore = create<MyInfoState>((set) => ({
  role: '',
  setrole: (role) => set({ role }),
}));
