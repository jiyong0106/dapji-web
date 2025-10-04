// src/stores/useRouteProgress.ts
import { create } from 'zustand';

type S = {
  active: boolean;
  progress: number; // 0 ~ 100
  start: () => void;
  done: () => void;
  reset: () => void;
  tick: (n: number) => void;
};

export const useRouteProgress = create<S>((set) => ({
  active: false,
  progress: 0,
  start: () => set({ active: true, progress: 10 }),
  done: () => set({ progress: 100 }),
  reset: () => set({ active: false, progress: 0 }),
  tick: (n) => set((s) => ({ progress: Math.min(99, s.progress + n) })),
}));
