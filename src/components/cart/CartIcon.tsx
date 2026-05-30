

import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrCreateCartAPI } from "../../api/user/buyer.api"; 
import type { Cart, CartItem } from "../../types/buyer.types";

export default function CartIcon() {
  const { data: cart } = useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: getOrCreateCartAPI,
  });

  const cartCount =
    cart?.items?.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    ) || 0;

  return (
    <Link to="/buyers/cart" className="relative p-2">
      <ShoppingCart size={22} />

      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold">
          {cartCount}
        </span>
      )}
    </Link>
  );
}