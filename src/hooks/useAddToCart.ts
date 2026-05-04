import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../services/buyer.service"; 
import type { CartItem } from "../types/buyer.types"; 

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onMutate: async (newItem: CartItem) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart =
        queryClient.getQueryData<CartItem[]>(["cart"]) || [];

      // ✅ SMART MERGE LOGIC (no duplicates)
      const exists = previousCart.find((i) => i.id === newItem.id);

      let updatedCart: CartItem[];

      if (exists) {
        updatedCart = previousCart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...previousCart, newItem];
      }

      queryClient.setQueryData(["cart"], updatedCart);

      return { previousCart };
    },

    onError: (_err, _newItem, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};