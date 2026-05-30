


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { CartItemB, CartPayload } from "../types/buyer.types";

import { addToCartAPI,updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI, } from "../api/user/buyer.api"; 

/* ================= STORE ================= */

interface CartState {
  cartId: string;
  items: CartItemB[];

  addToCart: (item: CartPayload) => Promise<void>;
  increaseQty: (productId: string) => Promise<void>;
  decreaseQty: (productId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;

  hydrateFromAPI: (items: CartItemB[]) => void;

  resetCart: () => void; // ✅ IMPORTANT FIX
}

/* ================= STORE ================= */

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({

      cartId: crypto.randomUUID(),
      items: [],

      /* ================= RESET (FIX FOR STALE DATA) ================= */
      resetCart: () => {
        set({ items: [] });
      },



      /* ================= ADD ================= */
             addToCart: async (payload) => {
  const newItem: CartItemB = {
    productId: payload.productId,
    businessId: payload.businessId,
    quantity: Number(payload.quantity || 1),

  name: payload.name,
  price: payload.price,
  image: payload.image,
  
  };

  // ✅ IMMEDIATE UI UPDATE
  set((state) => {
    const items = Array.isArray(state.items)
      ? [...state.items]
      : [];

    const existingIndex = items.findIndex(
      (i) => i.productId === newItem.productId
    );

    // UPDATE EXISTING
    if (existingIndex !== -1) {
      const updatedItems = [...items];

      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity:
          Number(updatedItems[existingIndex].quantity || 0) +
          newItem.quantity,
      };

      return {
        items: updatedItems,
      };
    }

    // ADD NEW
    return {
      items: [...items, newItem],
    };
  });

  // ✅ BACKEND SYNC AFTER UI UPDATE
  try {
    await addToCartAPI(
      newItem.productId,
      newItem.businessId,
      newItem.quantity
    );
  } catch (err) {
    console.error("addToCartAPI failed", err);
  }
},
      /* ================= INCREASE ================= */
      increaseQty: async (productId) => {
        const item = get().items.find((i) => i.productId === productId);
        if (!item) return;

        const newQty = item.quantity + 1;

        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: newQty } : i
          ),
        }));

        try {
          await updateCartItemAPI(productId, newQty);
        } catch (err) {
          console.error(err);
        }
      },

      /* ================= DECREASE ================= */
      decreaseQty: async (productId) => {
        const item = get().items.find((i) => i.productId === productId);
        if (!item) return;

        const newQty = item.quantity - 1;

        if (newQty <= 0) {
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          }));

          try {
            await removeCartItemAPI(productId);
          } catch (err) {
            console.error(err);
          }
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: newQty } : i
          ),
        }));

        try {
          await updateCartItemAPI(productId, newQty);
        } catch (err) {
          console.error(err);
        }
      },

      /* ================= REMOVE ================= */
      removeFromCart: async (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));

        try {
          await removeCartItemAPI(productId);
        } catch (err) {
          console.error(err);
        }
      },

      /* ================= CLEAR ================= */

           clearCart: async () => {
  // clear zustand state
  set({ items: [] });

  // clear persisted storage immediately
  localStorage.removeItem("cart-storage");

  try {
    await clearCartAPI();
  } catch (err) {
    console.error("clearCart failed", err);
  }

  
},







            /* ================= HYDRATE ================= */
      hydrateFromAPI: (items) => {
        set({
          items: Array.isArray(items)
            ? [...items]
            : [],
        });
      },
    }),

    /* ================= PERSIST CONFIG ================= */
    {
      name: "cart-storage",

      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        items: state.items,
      }),

      // avoid restoring corrupted old carts
      version: 2,

      migrate: (persistedState: any, version) => {
        if (version < 2) {
          return { items: [] };
        }

        return persistedState;
      },
    }
  )
);