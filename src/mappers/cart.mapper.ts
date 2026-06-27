

export type ShippingRate = {
  destinationState: string;
  weightRanges: {
    min: number;
    max: number | null;
    price: number;
  }[];
};

export type EnrichedCartItem = {
  productId: string;
  quantity: number;

  title: string;
  price: number;
  image: string;
  category: string;
  weight: number;

  vendorState?: string;
  vendorTown?: string;

  businessId?: string;
  businessState?: string;

  shippingRates?: ShippingRate[];
};

const normalizeId = (id: any) =>
  String(id?._id ?? id?.id ?? id ?? "").trim();

/* ================= ENRICH CART ITEMS ================= */

export const enrichCartItems = (
  items: any[] = [],
  products: any[] = []
): EnrichedCartItem[] => {
  if (!Array.isArray(items)) return [];

  /* ================= PRODUCT MAP ================= */

  const productMap = new Map(
    (Array.isArray(products) ? products : []).map((p: any) => [
      normalizeId(p),
      p,
    ])
  );

  /* ================= ENRICH ITEMS ================= */

  return items.map((item) => {
    if (!item) return item;

    const product = productMap.get(normalizeId(item?.productId));

    /* ================= BUSINESS INFO ================= */

    const business = product?.business || {};

console.log("PRODUCT", product);
console.log("BUSINESS", business);

    const businessId =
      business?._id ||
      item?.businessId ||
      product?.businessId ||
      "";

    const businessState =
      business?.businessAddress?.state ||
      item?.businessState ||
      "";

    const vendorState =
      business?.businessAddress?.state ||
      item?.vendorState ||
      "";

    const vendorTown =
      business?.businessAddress?.city ||
      item?.vendorTown ||
      "";

    /* ================= IMAGE RESOLVER ================= */

    const image =
      product?.media?.find(
        (m: any) => m?.type === "image" && m?.url
      )?.url ||
      product?.media?.[0]?.url ||
      item?.image ||
      product?.image ||
      "/placeholder.png";

    return {
      ...item,

      /* ================= CORE FIELDS ================= */

      productId: item?.productId,
      quantity: item?.quantity ?? 1,

      title:
        product?.name ||
        product?.title ||
        item?.name ||
        "Unknown Product",

      price:
        product?.price ??
        item?.price ??
        0,

      image,

      category:
        product?.category ??
        item?.category ??
        "",

      weight:
        product?.weight ??
        item?.weight ??
        0,

      /* ================= BUSINESS FIELDS ================= */

      businessId,
      businessState,
      vendorState,
      vendorTown,
    } as EnrichedCartItem;
  });
};









// export type EnrichedCartItem = {
//   productId: string;
//   quantity: number;

//   title: string;
//   price: number;
//   image: string;
//   category: string;
//   weight: number;

  
//   vendorState?: string;
//   vendorTown?: string;

//   businessId?: string;
//   businessState?: string;
// };

// const normalizeId = (id: any) =>
//   String(id?._id ?? id?.id ?? id ?? "").trim();

// export const enrichCartItems = (
//   items: any[] = [],
//   products: any[] = []
// ) => {
//   if (!Array.isArray(items)) return [];

//   /* ================= PRODUCT MAP ================= */

//   const productMap = new Map(
//     (Array.isArray(products) ? products : []).map((p: any) => [
//       normalizeId(p),
//       p,
//     ])
//   );

//   /* ================= ENRICH ITEMS ================= */

//   return items.map((item) => {
//     if (!item) return item;

//     const product = productMap.get(
//       normalizeId(item?.productId)
//     );

//     /* ================= IMAGE RESOLVER ================= */

//     const image =
//       product?.media?.find(
//         (m: any) => m?.type === "image" && m?.url
//       )?.url ||
//       product?.media?.[0]?.url ||
//       item?.image ||
//       product?.image ||
//       "/placeholder.png";

//     return {
//       ...item,

//       title:
//         product?.name ||
//         product?.title ||
//         item?.name ||
//         "Unknown Product",

//       price:
//         product?.price ??
//         item?.price ??
//         0,

//       image,

//       category:
//         product?.category ??
//         item?.category ??
//         "",

//       weight:
//         product?.weight ??
//         item?.weight ??
//         0,
//     };
//   });
// };

