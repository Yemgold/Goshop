


import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCartAPI } from "../../api/user/buyer.api"; // ✅ IMPORTANT CHANGE
import type { Cart } from "../../types";
import { useEffect, useState, useMemo } from "react";

export default function CartIcon() {
  /* ================= CART QUERY ================= */
  const { data: cart } = useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: getCartAPI, // ✅ NO MORE getOrCreateCartAPI
  });

  /* ================= CART COUNT ================= */

const cartCount = useMemo(() => {
  return cart?.items?.length || 0;
}, [cart]);

  /* ================= ANIMATION STATE ================= */
  const [animate, setAnimate] = useState(false);
  const [prevCount, setPrevCount] = useState(cartCount);

  useEffect(() => {
    if (cartCount !== prevCount) {
      setAnimate(true);
      setPrevCount(cartCount);

      const t = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(t);
    }
  }, [cartCount, prevCount]);

  /* ================= UI ================= */
  return (
    <Link to="/buyers/cart" className="relative p-2 inline-flex">
      {/* ICON */}
      <ShoppingCart
        size={22}
        className={cartCount > 0 ? "text-gray-800" : "text-gray-500"}
      />

      {/* BADGE */}
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1">
          {/* pulse ring */}
          <span className="absolute inline-flex h-4 w-4 rounded-full bg-red-400 opacity-60 animate-ping" />

          {/* badge */}
          <span
            className={`
              relative flex items-center justify-center
              bg-red-500 text-white text-[10px] font-bold
              min-w-[18px] h-[18px] px-1 rounded-full
              transition-transform duration-200
              ${animate ? "scale-125 animate-bounce" : "scale-100"}
            `}
          >
            {cartCount}
          </span>
        </span>
      )}
    </Link>
  );
}