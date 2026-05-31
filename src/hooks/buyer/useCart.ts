



// import {
//   useMutation,
//   useQuery,
//   useQueryClient,
// } from "@tanstack/react-query";

// import type {
//   Cart,
//   Product,
// } from "../../types/buyer.types";

// import {
//   getOrCreateCartAPI,
//   updateCartItemAPI,
//   removeCartItemAPI,
//   clearCartAPI,
// } from "../../api/user/buyer.api";

// import { buyerService } from "../../services/buyer.api.service";

// /* ================= SAFE HELPERS ================= */

// const normalizeCart = (cart: any): Cart => {
//   return {
//     ...cart,
//     items: Array.isArray(cart?.items)
//       ? cart.items
//       : [],
//   };
// };

// export function useCart() {
//   const queryClient = useQueryClient();

//   /* ================= CART ================= */

//   const cartQuery = useQuery<Cart>({
//     queryKey: ["cart"],

//     queryFn: async () => {
//       const data = await getOrCreateCartAPI();

//       return normalizeCart(data);
//     },
//   });

//   /* ================= PRODUCTS ================= */

//   const productsQuery = useQuery<any>({
//     queryKey: ["products"],

//     queryFn: buyerService.getProducts,
//   });

//   console.log(
//     "PRODUCTS QUERY:",
//     productsQuery.data
//   );

//   /* ================= SAFE VALUES ================= */

//   const cart = normalizeCart(
//     cartQuery.data
//   );

//   const products: Product[] =
//     Array.isArray(
//       productsQuery.data?.data
//     )
//       ? productsQuery.data.data
//       : Array.isArray(
//           productsQuery.data
//         )
//       ? productsQuery.data
//       : [];

//   console.log(
//     "SAFE PRODUCTS:",
//     products
//   );

//   /* ================= UPDATE QTY ================= */

//   const updateQty = useMutation({
//     mutationFn: ({
//       productId,
//       quantity,
//     }: {
//       productId: string;
//       quantity: number;
//     }) =>
//       updateCartItemAPI(
//         productId,
//         quantity
//       ),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["cart"],
//       });
//     },
//   });

//   /* ================= REMOVE ITEM ================= */

//   const removeItem = useMutation({
//     mutationFn: removeCartItemAPI,

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["cart"],
//       });
//     },
//   });

//   /* ================= CLEAR CART ================= */

//   const clearCart = useMutation({
//     mutationFn: clearCartAPI,

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["cart"],
//       });
//     },
//   });

//   /* ================= RETURN ================= */

//   return {
//     cart,

//     products,

//     isLoading:
//       cartQuery.isLoading ||
//       productsQuery.isLoading,

//      isFetching: cartQuery.isFetching,   

//     isError:
//       cartQuery.isError ||
//       productsQuery.isError,

//     updateQty,

//     removeItem,

//     clearCart,
//   };
// }







import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type { Cart, Product } from "../../types/buyer.types";

import {
  getOrCreateCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI,
} from "../../api/user/buyer.api";

import { buyerService } from "../../services/buyer.api.service";

/* ================= SAFE HELPERS ================= */

const normalizeCart = (cart: any): Cart => ({
  ...cart,
  items: Array.isArray(cart?.items) ? cart.items : [],
});

export function useCart() {
  const queryClient = useQueryClient();

  /* ================= CART ================= */
 const cartQuery = useQuery<Cart>({
  queryKey: ["cart"],

  queryFn: async () => {
    const data = await getOrCreateCartAPI();
    return normalizeCart(data);
  },

  placeholderData: (prev) => prev, // keeps previous cart (prevents flash)

  staleTime: 1000 * 60 * 0.005, // 10 seconds cache freshness (adjust if needed)

  gcTime: 1000 * 60 * 10, // optional: keeps cache for 5 mins

  select: (data) => normalizeCart(data),
});


const isCartLoaded = cartQuery.data !== undefined;

  /* ================= PRODUCTS ================= */
  const productsQuery = useQuery<any>({
    queryKey: ["products"],
    queryFn: buyerService.getProducts,
  });

  /* ================= SAFE VALUES ================= */

  const cart = normalizeCart(cartQuery.data);

  const products: Product[] = Array.isArray(productsQuery.data?.data)
    ? productsQuery.data.data
    : [];

  /* ================= MUTATIONS ================= */

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

  const removeItem = useMutation({
    mutationFn: removeCartItemAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clearCart = useMutation({
    mutationFn: clearCartAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    cart,
    products,
    isLoading: cartQuery.isLoading || productsQuery.isLoading,
    isError: cartQuery.isError || productsQuery.isError,
    updateQty,
    removeItem,
    clearCart,
    queryClient, // 👈 IMPORTANT for add-to-cart fix
    isCartLoaded,
  };
}