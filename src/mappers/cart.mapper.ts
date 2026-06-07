// import type {
//   CartItem,
//   Product,
// } from "../types/buyer.types";

// export type EnrichedCartItem = CartItem & {
//   title: string;
//   price: number;
//   image: string;
//   category: string;
//   description: string;
// };

// export const enrichCartItems = (
//   items: CartItem[] = [],
//   products: Product[] | any = []
// ): EnrichedCartItem[] => {
//   /* ================= SAFE PRODUCTS ================= */

//   const safeProducts = Array.isArray(products)
//     ? products
//     : Array.isArray(products?.data)
//     ? products.data
//     : Array.isArray(products?.products)
//     ? products.products
//     : [];

//   console.log("CART PRODUCTS:", safeProducts);

//   return items.map((item) => {
//     /* ================= FIND PRODUCT ================= */

//     const product = safeProducts.find((p: any) => {
//       const pid = p?._id || p?.id;
//       return pid === item.productId;
//     });

//     console.log("CART PRODUCT MATCH:", {
//       item,
//       product,
//     });

//     /* ================= SAFE IMAGE ================= */

//     const image =
//       Array.isArray(product?.media) &&
//       product.media.length > 0
//         ? product.media[0]?.url
//         : product?.image ||
//           "/placeholder.png";

//     /* ================= RETURN ================= */

//     return {
//       ...item,

//       title:
//         product?.name ||
//         product?.title ||
//         "Unknown Product",

//       price: Number(product?.price || 0),

//       image,

//       category: product?.category || "",

//       description:
//         product?.description || "",
//     };
//   });
// };

// export const calculateCartTotal = (
//   items: EnrichedCartItem[] = []
// ): number => {
//   return items.reduce(
//     (sum: number, item: EnrichedCartItem) =>
//       sum + Number(item.price || 0) * Number(item.quantity || 0),
//     0
//   );
// };

















import type { CartItem, Product } from "../types/buyer.types";

export type EnrichedCartItem = CartItem & {
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;

  // ✅ SHIPPING (IMPORTANT)
  shippingRates?: any[];
  baseShippingPrice?: number;
};

/* ================= HELPERS ================= */

const getProductId = (p: any) => p?._id || p?.id;

/* ================= MAIN MAPPER ================= */

export const enrichCartItems = (
  items: CartItem[] = [],
  products: Product[] = []
): EnrichedCartItem[] => {
  if (!Array.isArray(items) || !Array.isArray(products)) {
    return [];
  }

  return items.map((item) => {
    const product = products.find((p) => getProductId(p) === item.productId);

    console.log("CART PRODUCT MATCH:", { item, product });

    const image =
      Array.isArray(product?.media) && product.media.length > 0
        ? product.media[0].url
        : (product as any)?.image || "/placeholder.png";

    return {
      ...item,

      title: product?.name || product?.title || "Unknown Product",
      price: Number(product?.price || 0),
      image,
      category: product?.category || "",
      description: product?.description || "",

      // ✅ SHIPPING DATA (FOR CHECKOUT LATER)
      shippingRates: product?.shippingRates || [],

      baseShippingPrice:
        product?.shippingRates?.[0]?.weightRanges?.[0]?.price ?? 0,
    };
  });
};

/* ================= TOTAL ================= */

export const calculateCartTotal = (
  items: EnrichedCartItem[] = []
): number => {
  return items.reduce((sum, item) => {
    return sum + (item.price || 0) * (item.quantity || 0);
  }, 0);
};