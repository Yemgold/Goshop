// import { useMutation } from "@tanstack/react-query";

// import { useCartStore } from "../store/cart.store";

// import type {
//   CartPayload,
// } from "../types/buyer.types";

// export const useAddToCart = () => {
//   const addToCart = useCartStore(
//     (s) => s.addToCart
//   );

//   return useMutation({
//     mutationFn: async (
//       item: CartPayload
//     ) => {
//       await addToCart(item);
//     },
//   });
// };