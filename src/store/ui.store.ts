

import { create } from "zustand";

type UIState = {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  startLoading: () => set({ loading: true }),
  stopLoading: () => set({ loading: false }),
}));