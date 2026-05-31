

// import { ShoppingCart } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getOrCreateCartAPI } from "../../api/user/buyer.api"; 
// import type { Cart, CartItem } from "../../types/buyer.types";

// export default function CartIcon() {
//   const { data: cart } = useQuery<Cart>({
//     queryKey: ["cart"],
//     queryFn: getOrCreateCartAPI,
//   });

//   const cartCount =
//     cart?.items?.reduce(
//       (total: number, item: CartItem) => total + item.quantity,
//       0
//     ) || 0;

//   return (
//     <Link to="/buyers/cart" className="relative p-2">
//       <ShoppingCart size={22} />

//       {cartCount > 0 && (
//         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold">
//           {cartCount}
//         </span>
//       )}
//     </Link>
//   );
// }





import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrCreateCartAPI } from "../../api/user/buyer.api";
import type { Cart, CartItem } from "../../types/buyer.types";
import { useEffect, useState } from "react";

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

  // 👇 animation trigger state
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