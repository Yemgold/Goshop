import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { cartService } from "../../services/cart.service";

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cart, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
  });

  /* ================= MUTATIONS ================= */

  const addToCart = useMutation({
    mutationFn: cartService.addToCart,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const updateQty = useMutation({
    mutationFn: cartService.updateCartItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeItem = useMutation({
    mutationFn: cartService.removeCartItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const clearCart = useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  /* ================= SAFE COUNT ================= */

  const cartCount =
    cart?.items?.reduce(
      (sum: number, item: any) =>
        sum + Number(item.quantity ?? 0),
      0
    ) ?? 0;

  return {
    cart,
    isLoading,
    isError,
    cartCount,

    addToCart,
    updateQty,
    removeItem,
    clearCart,
  };
};



