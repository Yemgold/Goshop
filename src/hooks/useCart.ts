import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/buyer.service";
import type { CartItem } from "../types/buyer.types";

export function useCart() {
  /* ================= CART QUERY ================= */
  const cartQuery = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 30,
  });

  /* ================= TOTAL ITEMS ================= */
  const totalItems =
    cartQuery.data?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return {
    ...cartQuery,
    cart: cartQuery.data ?? [],
    totalItems,
  };
}