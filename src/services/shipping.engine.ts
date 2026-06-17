import type { EnrichedCartItem } from "../mappers/cart.mapper";
import type { Product } from "../types";

/* ================= TYPES ================= */

export type ShippingVendor = {
  businessId: string;
  items: EnrichedCartItem[];
  subtotal: number;
  totalWeight: number;

  // product → office
  shippingFee: number;

  // office → customer
  deliveryFee: number;
};

export type ShippingSummary = {
  vendors: ShippingVendor[];

  // breakdowns (IMPORTANT: keep them or you'll lose precision)
  shippingFeeSummation: number;
  deliveryFeeSummation: number;

  totalShipping: number;
  totalWeight: number;
};

type DeliveryRate = {
  buyerState: string;
  buyerTown?: string;
  nearestBusStop?: string;

  weightRanges: {
    min: number;
    max: number | null;
    price: number;
  }[];
};

/* ================= ENGINE ================= */

export const calculateShipping = (
  items: EnrichedCartItem[],
  products: Product[],
  selectedState: string,
  deliveryRates: DeliveryRate[],
  deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice"
): ShippingSummary => {
  const grouped: Record<string, ShippingVendor> = {};

  /* ================= GROUP ITEMS BY BUSINESS ================= */

  for (const item of items) {
    const product = products.find(
      (p) => (p._id || p.id) === item.productId
    );

    if (!product) continue;

    const businessId =
      typeof (product as any)?.business === "string"
        ? (product as any).business
        : (product as any)?.business?._id ||
          (product as any)?.business?.id;

    if (!businessId) continue;

    if (!grouped[businessId]) {
      grouped[businessId] = {
        businessId,
        items: [],
        subtotal: 0,
        totalWeight: 0,
        shippingFee: 0,
        deliveryFee: 0,
      };
    }

    grouped[businessId].items.push(item);
    grouped[businessId].subtotal += item.price * item.quantity;

    const weight = Number(product.weight ?? 1);
    grouped[businessId].totalWeight += weight * item.quantity;
  }

  const vendors = Object.values(grouped);

  let shippingFeeSummation = 0;
  let deliveryFeeSummation = 0;

  /* ================= PICKUP MODE ================= */

  if (deliveryMode === "pickUpFromOurNearestOffice") {
    for (const vendor of vendors) {
      const product = products.find(
        (p) => (p._id || p.id) === vendor.items[0]?.productId
      );

      const shipping = product?.shippingRates?.find(
        (r: any) => r.destinationState === selectedState
      );

      const range = shipping?.weightRanges?.find(
        (w: any) =>
          vendor.totalWeight >= w.min &&
          (w.max === null || vendor.totalWeight <= w.max)
      );

      const fee = range?.price || 0;

      vendor.shippingFee = fee;
      vendor.deliveryFee = 0;

      shippingFeeSummation += fee;
    }

    return {
      vendors,
      shippingFeeSummation,
      deliveryFeeSummation: 0,
      totalShipping: shippingFeeSummation,
      totalWeight: vendors.reduce((s, v) => s + v.totalWeight, 0),
    };
  }

  /* ================= HOME DELIVERY ================= */

  const stateRate = deliveryRates.find(
    (r) => r.buyerState === selectedState
  );

  for (const vendor of vendors) {
    const product = products.find(
      (p) => (p._id || p.id) === vendor.items[0]?.productId
    );

    // ---------------- product → office fee ----------------
    let shippingFee = 0;

    const shipping = product?.shippingRates?.find(
      (r: any) => r.destinationState === selectedState
    );

    const productRange = shipping?.weightRanges?.find(
      (w: any) =>
        vendor.totalWeight >= w.min &&
        (w.max === null || vendor.totalWeight <= w.max)
    );

    shippingFee = productRange?.price || 0;

    // ---------------- office → customer fee ----------------
    let deliveryFee = 0;

    const busStopRange = stateRate?.weightRanges?.find(
      (w) =>
        vendor.totalWeight >= w.min &&
        (w.max === null || vendor.totalWeight <= w.max)
    );

    deliveryFee = busStopRange?.price || 0;

    vendor.shippingFee = shippingFee;
    vendor.deliveryFee = deliveryFee;

    shippingFeeSummation += shippingFee;
    deliveryFeeSummation += deliveryFee;
  }

  return {
    vendors,
    shippingFeeSummation,
    deliveryFeeSummation,
    totalShipping: shippingFeeSummation + deliveryFeeSummation,
    totalWeight: vendors.reduce((s, v) => s + v.totalWeight, 0),
  };
};










































// import type { EnrichedCartItem } from "../mappers/cart.mapper";
// import type { Product } from "../types/buyer.types";

// export type ShippingVendor = {
//   businessId: string;
//   items: EnrichedCartItem[];
//   subtotal: number;
//   totalWeight: number;

//   // Vendor → nearest office
//   shippingFee: number;

//   // Nearest office → customer
//   deliveryFee: number;
// };

// export type ShippingSummary = {
//   vendors: ShippingVendor[];
//   totalShipping: number;
//   totalWeight: number;
// };

// type DeliveryRate = {
//   buyerState: string;
//   buyerTown: string;
//   nearestBusStop: string;
//   weightRanges: {
//     min: number;
//     max: number | null;
//     price: number;
//   }[];
// };

// export const calculateShipping = (
//   items: EnrichedCartItem[],
//   products: Product[],
//   selectedState: string,
//   deliveryRates: DeliveryRate[],
//   deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice"
// ): ShippingSummary => {
//   const grouped: Record<string, ShippingVendor> = {};

//   /* ================= GROUP ITEMS ================= */

//   for (const item of items) {
//     const product = products.find(
//       (p) => (p._id || p.id) === item.productId
//     );

//     if (!product) continue;

//     const businessId =
//       typeof (product as any)?.business === "string"
//         ? (product as any)?.business
//         : (product as any)?.business?._id ||
//           (product as any)?.business?.id;

//     if (!businessId) continue;

//     if (!grouped[businessId]) {
//       grouped[businessId] = {
//         businessId,
//         items: [],
//         subtotal: 0,
//         totalWeight: 0,
//         shippingFee: 0,
//         deliveryFee: 0,
//       };
//     }

//     grouped[businessId].items.push(item);
//     grouped[businessId].subtotal +=
//       item.price * item.quantity;

//     grouped[businessId].totalWeight +=
//       (product.weight || 1) * item.quantity;
//   }

//   const vendors = Object.values(grouped);

//   let totalShipping = 0;

//   /* ================= PICKUP MODE ================= */

//   if (deliveryMode === "pickUpFromOurNearestOffice") {
//     vendors.forEach((vendor) => {
//       const product = products.find(
//         (p) => (p._id || p.id) === vendor.items[0]?.productId
//       );

//       if (!product?.shippingRates?.length) {
//         vendor.shippingFee = 0;
//         vendor.deliveryFee = 0;
//         return;
//       }

//       const shipping = product.shippingRates.find(
//         (r) => r.destinationState === selectedState
//       );

//       if (!shipping) {
//         vendor.shippingFee = 0;
//         vendor.deliveryFee = 0;
//         return;
//       }

//       const range = shipping.weightRanges.find(
//         (w) =>
//           vendor.totalWeight >= w.min &&
//           (w.max === null ||
//             vendor.totalWeight <= w.max)
//       );

//       vendor.shippingFee = range?.price || 0;
//       vendor.deliveryFee = 0;

//       totalShipping += vendor.shippingFee;
//     });

//     return {
//       vendors,
//       totalShipping,
//       totalWeight: vendors.reduce(
//         (sum, v) => sum + v.totalWeight,
//         0
//       ),
//     };
//   }

//   /* ================= HOME DELIVERY ================= */

//   const stateRate = deliveryRates.find(
//     (r) => r.buyerState === selectedState
//   );

//   vendors.forEach((vendor) => {
//     const product = products.find(
//       (p) => (p._id || p.id) === vendor.items[0]?.productId
//     );

//     let productShippingFee = 0;

//     if (product?.shippingRates?.length) {
//       const shipping = product.shippingRates.find(
//         (r) => r.destinationState === selectedState
//       );

//       if (shipping) {
//         const range = shipping.weightRanges.find(
//           (w) =>
//             vendor.totalWeight >= w.min &&
//             (w.max === null ||
//               vendor.totalWeight <= w.max)
//         );

//         productShippingFee = range?.price || 0;
//       }
//     }

//     let deliveryFee = 0;

//     if (stateRate?.weightRanges?.length) {
//       const busStopRange = stateRate.weightRanges.find(
//         (w) =>
//           vendor.totalWeight >= w.min &&
//           (w.max === null ||
//             vendor.totalWeight <= w.max)
//       );

//       deliveryFee = busStopRange?.price || 0;
//     }


//     vendor.shippingFee = productShippingFee;
//     vendor.deliveryFee = deliveryFee;

//     totalShipping +=
//       vendor.shippingFee +
//       vendor.deliveryFee;
//   });



//   return {
//     vendors,
//     totalShipping,
//     totalWeight: vendors.reduce(
//       (sum, v) => sum + v.totalWeight,
//       0
//     ),
//   };
// };




