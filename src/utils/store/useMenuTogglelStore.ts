import { create } from 'zustand';

interface ToggleState {
  toggle: boolean;
  toggleMenu: () => void;
}

export const useMenuToggleStore = create<ToggleState>((set) => ({
  toggle: false,
  toggleMenu: () => set((state) => ({ toggle: !state.toggle })),
}));
