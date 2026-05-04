

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { BuyerProduct, CartItem } from "../types/buyer.types";
import { toCartItem } from "../mappers/cart.mapper";

import {
  addToCart as apiAddToCart,
  updateCartItem,
  removeCartItem,
  clearCart as apiClearCart,
} from "../services/buyer.service";

interface CartState {
  items: CartItem[];

  addToCart: (item: BuyerProduct | CartItem) => Promise<void>;
  increaseQty: (id: string) => Promise<void>;
  decreaseQty: (id: string) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;

  hydrateFromAPI: (items: CartItem[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      /* ================= ADD ================= */
      addToCart: async (item) => {
        const cartItem =
          "quantity" in item ? item : toCartItem(item);

        // 🟢 update UI instantly
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === cartItem.id
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === cartItem.id
                  ? {
                      ...i,
                      quantity: i.quantity + cartItem.quantity,
                    }
                  : i
              ),
            };
          }

          return { items: [...state.items, cartItem] };
        });

        // 🔵 sync with API (if logged in)
        try {
          await apiAddToCart(cartItem);
        } catch (err) {
          console.error("API add failed", err);
        }
      },

      /* ================= INCREASE ================= */
      increaseQty: async (id) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }));

        const item = get().items.find((i) => i.id === id);
        if (item) {
          try {
            await updateCartItem(id, item.quantity);
          } catch {}
        }
      },

      /* ================= DECREASE ================= */
      decreaseQty: async (id) => {
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        }));

        const item = get().items.find((i) => i.id === id);
        if (item) {
          try {
            await updateCartItem(id, item.quantity);
          } catch {}
        }
      },

      /* ================= REMOVE ================= */
      removeFromCart: async (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));

        try {
          await removeCartItem(id);
        } catch {}
      },

      /* ================= CLEAR ================= */
      clearCart: async () => {
        set({ items: [] });

        try {
          await apiClearCart();
        } catch {}
      },

      /* ================= HYDRATE ================= */
      hydrateFromAPI: (items) => {
        set({ items });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

