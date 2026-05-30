import type {
  CartItem,
  Product,
} from "../types/buyer.types";

export type EnrichedCartItem = CartItem & {
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

export const enrichCartItems = (
  items: CartItem[] = [],
  products: Product[] = []
): EnrichedCartItem[] => {
  return items.map((item) => {
    /* ================= FIND PRODUCT ================= */

    const product = products.find((p: any) => {
      const pid = p._id || p.id;

      return pid === item.productId;
    });

    console.log("CART PRODUCT MATCH:", {
      item,
      product,
    });

    /* ================= SAFE IMAGE ================= */

    const image =
      Array.isArray(product?.media) &&
      product.media.length > 0
        ? product.media[0].url
        : product?.image ||
          "/placeholder.png";

    /* ================= RETURN ================= */

    return {
      ...item,

      title:
        product?.name ||
        product?.title ||
        "Unknown Product",

      price: Number(product?.price || 0),

      image,

      category: product?.category || "",

      description:
        product?.description || "",
    };
  });
};

export const calculateCartTotal = (
  items: EnrichedCartItem[] = []
) => {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
};








