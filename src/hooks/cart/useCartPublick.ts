




























import { useAuthStore } from "../../store/auth.store";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { cartService } from "../../services/cart.service";



export const useCart = () => {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const { data: cart, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,

    // Only call backend when logged in
    enabled: !!user,
  });

  const addToCart = useMutation({
    mutationFn: async (payload: any) => {
      if (!user) {
        // Guest cart (temporary)
        const guestCart = JSON.parse(
          localStorage.getItem("guest-cart") || "[]"
        );

        guestCart.push(payload);

        localStorage.setItem(
          "guest-cart",
          JSON.stringify(guestCart)
        );

        return;
      }

      return cartService.addToCart(payload);
    },

    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      }
    },
  });

  const cartCount = user
    ? cart?.items?.reduce(
        (sum: number, item: any) =>
          sum + Number(item.quantity ?? 0),
        0
      ) ?? 0
    : JSON.parse(
        localStorage.getItem("guest-cart") || "[]"
      ).reduce(
        (sum: number, item: any) =>
          sum + Number(item.quantity ?? 1),
        0
      );

   return {
    cart,
    isLoading,
    isError,
    cartCount,

    addToCart,
    // updateQty,
    // removeItem,
    // clearCart,
  };
};



