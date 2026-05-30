

import { create } from "zustand";

type ToastItem = {
  id: string;
  name: string;
  image?: string;
  quantity: number;
};

type CartToastState = {
  toast: ToastItem | null;
  showToast: (item: ToastItem) => void;
  hideToast: () => void;
};

export const useCartToast = create<CartToastState>((set) => ({
  toast: null,

  showToast: (item) => {
    set({ toast: item });

    setTimeout(() => {
      set({ toast: null });
    }, 2500);
  },

  hideToast: () => set({ toast: null }),
}));