import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrCreateCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI,
  addToCartAPI,
} from "../../api/user/buyer.api";

import { buyerService } from "../../services/buyer.api.service";
import type { Product } from "../../types/buyer.types";

/* ================= NORMALIZER ================= */

const normalizeCart = (cart: any) => ({
  ...cart,
  items: Array.isArray(cart?.items) ? cart.items : [],
});

/* ================= HOOK ================= */

export function useCart() {
  const queryClient = useQueryClient();

  /* ================= CART ================= */
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await getOrCreateCartAPI();
      return normalizeCart(res);
    },
  });

  const cart = normalizeCart(cartQuery.data);

  /* ================= PRODUCTS ================= */
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: buyerService.getProducts,
  });

  const products: Product[] = Array.isArray(productsQuery.data)
  ? productsQuery.data
  : Array.isArray((productsQuery.data as any)?.data)
  ? (productsQuery.data as any).data
  : Array.isArray((productsQuery.data as any)?.products)
  ? (productsQuery.data as any).products
  : [];



  /* ================= ADD TO CART (FIXED) ================= */
  const addToCartMutation = useMutation({
    mutationFn: (payload: {
      productId: string;
      businessId: string;
      quantity: number;
    }) =>
      addToCartAPI(
        payload.productId,
        payload.businessId,
        payload.quantity
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // ✅ CLEAN FUNCTION WRAPPER (THIS FIXES YOUR ERROR)
  const addToCart = async (payload: {
    productId: string;
    businessId: string;
    quantity: number;
  }) => {
    return addToCartMutation.mutateAsync(payload);
  };

  /* ================= UPDATE QTY ================= */
  const updateQty = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => updateCartItemAPI(productId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  /* ================= REMOVE ================= */
  const removeItem = useMutation({
    mutationFn: removeCartItemAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  /* ================= CLEAR ================= */
  const clearCart = useMutation({
    mutationFn: clearCartAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  /* ================= CART COUNT ================= */
  const cartCount = cart.items.reduce(
    (sum: number, i: any) => sum + (i.quantity || 0),
    0
  );

  return {
    cart,
    products,
    cartCount,

    isLoading: cartQuery.isLoading || productsQuery.isLoading,
    isError: cartQuery.isError || productsQuery.isError,

    // ✅ FIXED API (FUNCTION, NOT MUTATION OBJECT)
    addToCart,

    updateQty,
    removeItem,
    clearCart,
  };
}



















// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   getOrCreateCartAPI,
//   updateCartItemAPI,
//   removeCartItemAPI,
//   clearCartAPI,
//   addToCartAPI,
// } from "../../api/user/buyer.api";

// import { buyerService } from "../../services/buyer.api.service";
// import type { Product } from "../../types/buyer.types";

// /* ================= NORMALIZER ================= */

// const normalizeCart = (cart: any) => ({
//   ...cart,
//   items: Array.isArray(cart?.items) ? cart.items : [],
// });

// /* ================= HOOK ================= */

// export function useCart() {
//   const queryClient = useQueryClient();

//   /* ================= CART QUERY ================= */
//   const cartQuery = useQuery({
//     queryKey: ["cart"],
//     queryFn: async () => {
//       const res = await getOrCreateCartAPI();
//       return normalizeCart(res);
//     },
//     staleTime: 1000 * 10,
//     gcTime: 1000 * 60 * 10,
//   });

//   const cart = normalizeCart(cartQuery.data);

//   /* ================= PRODUCTS ================= */
//   const productsQuery = useQuery({
//     queryKey: ["products"],
//     queryFn: buyerService.getProducts,
//   });

//   const products: Product[] = productsQuery.data ?? [];

//   /* ================= SAFE CACHE UPDATER ================= */
//   const updateCartCache = (updater: (old: any) => any) => {
//     queryClient.setQueryData(["cart"], (old: any) => {
//       if (!old) {
//         return { items: [] };
//       }
//       return updater(old);
//     });
//   };

//   /* ================= ADD TO CART (FIXED) ================= */

//   const addToCartMutation = useMutation({
//     mutationFn: (payload: {
//       productId: string;
//       businessId: string;
//       quantity: number;
//     }) =>
//       addToCartAPI(
//         payload.productId,
//         payload.businessId,
//         payload.quantity
//       ),

//     onMutate: async (newItem) => {
//       await queryClient.cancelQueries({ queryKey: ["cart"] });

//       const prev = queryClient.getQueryData(["cart"]);

//       updateCartCache((old) => {
//         const items = Array.isArray(old.items) ? [...old.items] : [];

//         const index = items.findIndex(
//           (i: any) => i.productId === newItem.productId
//         );

//         if (index >= 0) {
//           items[index] = {
//             ...items[index],
//             quantity: items[index].quantity + newItem.quantity,
//           };
//         } else {
//           items.push({
//             productId: newItem.productId,
//             businessId: newItem.businessId,
//             quantity: newItem.quantity,
//           });
//         }

//         return { ...old, items };
//       });

//       return { prev };
//     },

//     onError: (_err, _vars, ctx) => {
//       queryClient.setQueryData(["cart"], ctx?.prev);
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });

//   /* ================= WRAPPER FUNCTION (IMPORTANT FIX) ================= */

//   const addToCart = async (payload: {
//     productId: string;
//     businessId: string;
//     quantity: number;
//   }) => {
//     return addToCartMutation.mutateAsync(payload);
//   };

//   /* ================= UPDATE QTY ================= */

//   const updateQtyMutation = useMutation({
//     mutationFn: ({
//       productId,
//       quantity,
//     }: {
//       productId: string;
//       quantity: number;
//     }) => updateCartItemAPI(productId, quantity),

//     onMutate: async ({ productId, quantity }) => {
//       await queryClient.cancelQueries({ queryKey: ["cart"] });

//       const prev = queryClient.getQueryData(["cart"]);

//       updateCartCache((old) => {
//         const items = Array.isArray(old.items) ? [...old.items] : [];

//         const updated = items.map((i: any) =>
//           i.productId === productId ? { ...i, quantity } : i
//         );

//         return { ...old, items: updated };
//       });

//       return { prev };
//     },

//     onError: (_err, _vars, ctx) => {
//       queryClient.setQueryData(["cart"], ctx?.prev);
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });

//   const updateQty = updateQtyMutation.mutateAsync;

//   /* ================= REMOVE ================= */

//   const removeItem = useMutation({
//     mutationFn: removeCartItemAPI,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });

//   /* ================= CLEAR ================= */

//   const clearCartMutation = useMutation({
//     mutationFn: clearCartAPI,
//     onSuccess: () => {
//       queryClient.setQueryData(["cart"], { items: [] });
//     },
//   });

//   const clearCart = clearCartMutation.mutateAsync;

//   /* ================= CART COUNT ================= */

//   const cartCount = cart.items.reduce(
//     (sum: number, i: any) => sum + (i.quantity || 0),
//     0
//   );

//   /* ================= RETURN CLEAN API ================= */

//   return {
//     cart,
//     products,
//     cartCount,

//     isLoading: cartQuery.isLoading || productsQuery.isLoading,
//     isError: cartQuery.isError || productsQuery.isError,

//     addToCart,   // ✅ FUNCTION
//     updateQty,   // ✅ FUNCTION
//     removeItem: removeItem.mutateAsync,
//     clearCart,   // ✅ FUNCTION
//   };
// }