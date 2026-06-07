






// import type { EnrichedCartItem } from "../mappers/cart.mapper";
// import type { Product } from "../types/buyer.types";

// export type ShippingVendor = {
//   businessId: string;
//   items: EnrichedCartItem[];
//   subtotal: number;
//   totalWeight: number;
//   shippingFee: number;
// };

// export type ShippingSummary = {
//   vendors: ShippingVendor[];
//   totalShipping: number;
//   totalWeight: number;
// };

// export const calculateShipping = (
//   items: EnrichedCartItem[],
//   products: Product[],
//   selectedState: string,
// //   deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice"
// ): ShippingSummary => {
//   const grouped: Record<string, ShippingVendor> = {};


   

//   for (const item of items) {
//     const product = products.find(
//       (p) => (p._id || p.id) === item.productId
//     );

//     if (!product) continue;

//     const businessId = (product as any)?.business?.id;

//     if (!grouped[businessId]) {
//       grouped[businessId] = {
//         businessId,
//         items: [],
//         subtotal: 0,
//         totalWeight: 0,
//         shippingFee: 0,
//       };
//     }

//     grouped[businessId].items.push(item);
//     grouped[businessId].subtotal += item.price * item.quantity;
//     grouped[businessId].totalWeight +=
//       (product.weight || 1) * item.quantity;
//   }


// let totalShipping = 0;

// Object.values(grouped).forEach((vendor) => {

//   const product = products.find(
//     (p) => (p._id || p.id) === vendor.items[0]?.productId
//   );

//   const shipping = product?.shippingRates?.find(
//     (r) => r.destinationState === selectedState
//   );

//   console.log("Selected State:", selectedState);
//   console.log("Available Rates:", product?.shippingRates);
//   console.log("Matched Shipping:", shipping);

//   // ADD THIS BLOCK HERE
//   if (!shipping) {
//     vendor.shippingFee = 0;

//     console.warn(
//       `No shipping rate configured for ${selectedState}`
//     );

//     return; // skip this vendor
//   }

//   const range = shipping.weightRanges.find(
//     (w) =>
//       vendor.totalWeight >= w.min &&
//       (w.max === null || vendor.totalWeight <= w.max)
//   );

//   const fee = range?.price || 0;

//   vendor.shippingFee = fee;
//   totalShipping += fee;
// });


//   return {
//     vendors: Object.values(grouped),
//     totalShipping,
//     totalWeight: Object.values(grouped).reduce(
//       (sum, v) => sum + v.totalWeight,
//       0
//     ),
//   };
// };












// import type { EnrichedCartItem } from "../mappers/cart.mapper";
// import type { Product } from "../types/buyer.types";

// export type ShippingVendor = {
//   businessId: string;
//   items: EnrichedCartItem[];
//   subtotal: number;
//   totalWeight: number;
//   shippingFee: number;
// };

// export type ShippingSummary = {
//   vendors: ShippingVendor[];
//   totalShipping: number;
//   totalWeight: number;
// };

// export const calculateShipping = (
//   items: EnrichedCartItem[],
//   products: Product[],
//   selectedState: string,
//   deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice"
// ): ShippingSummary => {
  
//   // 🚨 IMPORTANT: Skip shipping completely for pickup orders
//   if (deliveryMode !== "homeDelivery") {
//     const groupedPickup: Record<string, ShippingVendor> = {};

//     for (const item of items) {
//       const product = products.find(
//         (p) => (p._id || p.id) === item.productId
//       );

//       if (!product) continue;

//       const businessId =
//         typeof (product as any)?.business === "string"
//           ? (product as any)?.business
//           : (product as any)?.business?.id;

//       if (!businessId) continue;

//       if (!groupedPickup[businessId]) {
//         groupedPickup[businessId] = {
//           businessId,
//           items: [],
//           subtotal: 0,
//           totalWeight: 0,
//           shippingFee: 0,
//         };
//       }

//       groupedPickup[businessId].items.push(item);
//       groupedPickup[businessId].subtotal +=
//         item.price * item.quantity;

//       groupedPickup[businessId].totalWeight +=
//         (product.weight || 1) * item.quantity;
//     }

//     return {
//       vendors: Object.values(groupedPickup),
//       totalShipping: 0,
//       totalWeight: Object.values(groupedPickup).reduce(
//         (sum, v) => sum + v.totalWeight,
//         0
//       ),
//     };
//   }

//   // ================= DELIVERY MODE =================

//   const grouped: Record<string, ShippingVendor> = {};

//   for (const item of items) {
//     const product = products.find(
//       (p) => (p._id || p.id) === item.productId
//     );

//     if (!product) continue;

//     const businessId =
//       typeof (product as any)?.business === "string"
//         ? (product as any)?.business
//         : (product as any)?.business?.id;

//     if (!businessId) continue;

//     if (!grouped[businessId]) {
//       grouped[businessId] = {
//         businessId,
//         items: [],
//         subtotal: 0,
//         totalWeight: 0,
//         shippingFee: 0,
//       };
//     }

//     grouped[businessId].items.push(item);
//     grouped[businessId].subtotal +=
//       item.price * item.quantity;

//     grouped[businessId].totalWeight +=
//       (product.weight || 1) * item.quantity;
//   }

//   let totalShipping = 0;

//   Object.values(grouped).forEach((vendor) => {
//     const product = products.find(
//       (p) => (p._id || p.id) === vendor.items[0]?.productId
//     );

//     const shipping = product?.shippingRates?.find(
//       (r) => r.destinationState === selectedState
//     );

//     if (!shipping) {
//       vendor.shippingFee = 0;
//       console.warn(
//         `No shipping rate configured for ${selectedState}`
//       );
//       return;
//     }

//     const range = shipping.weightRanges.find(
//       (w) =>
//         vendor.totalWeight >= w.min &&
//         (w.max === null || vendor.totalWeight <= w.max)
//     );

//     const fee = range?.price || 0;

//     vendor.shippingFee = fee;
//     totalShipping += fee;
//   });

//   return {
//     vendors: Object.values(grouped),
//     totalShipping,
//     totalWeight: Object.values(grouped).reduce(
//       (sum, v) => sum + v.totalWeight,
//       0
//     ),
//   };
// };










import type { EnrichedCartItem } from "../mappers/cart.mapper";
import type { Product } from "../types/buyer.types";

export type ShippingVendor = {
  businessId: string;
  items: EnrichedCartItem[];
  subtotal: number;
  totalWeight: number;
  shippingFee: number;
};

export type ShippingSummary = {
  vendors: ShippingVendor[];
  totalShipping: number;
  totalWeight: number;
};

type DeliveryRate = {
  buyerState: string;
  buyerTown: string;
  nearestBusStop: string;
  weightRanges: {
    min: number;
    max: number | null;
    price: number;
  }[];
};

export const calculateShipping = (
  items: EnrichedCartItem[],
  products: Product[],
  selectedState: string,
  deliveryRates: DeliveryRate[],
  deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice"
): ShippingSummary => {
  const grouped: Record<string, ShippingVendor> = {};

  /* ================= GROUP ITEMS ================= */

  for (const item of items) {
    const product = products.find(
      (p) => (p._id || p.id) === item.productId
    );

    if (!product) continue;

    const businessId =
      typeof (product as any)?.business === "string"
        ? (product as any)?.business
        : (product as any)?.business?.id;

    if (!businessId) continue;

    if (!grouped[businessId]) {
      grouped[businessId] = {
        businessId,
        items: [],
        subtotal: 0,
        totalWeight: 0,
        shippingFee: 0,
      };
    }

    grouped[businessId].items.push(item);
    grouped[businessId].subtotal += item.price * item.quantity;
    grouped[businessId].totalWeight +=
      (product.weight || 1) * item.quantity;
  }

  const vendors = Object.values(grouped);

  let totalShipping = 0;

  /* ================= PICKUP MODE ================= */

  if (deliveryMode === "pickUpFromOurNearestOffice") {
    vendors.forEach((vendor) => {
      const product = products.find(
        (p) => (p._id || p.id) === vendor.items[0]?.productId
      );

      if (!product?.shippingRates?.length) {
        vendor.shippingFee = 0;
        return;
      }

      const shipping = product.shippingRates.find(
        (r) => r.destinationState === selectedState
      );

      if (!shipping) {
        vendor.shippingFee = 0;
        return;
      }

      const range = shipping.weightRanges.find(
        (w) =>
          vendor.totalWeight >= w.min &&
          (w.max === null || vendor.totalWeight <= w.max)
      );

      vendor.shippingFee = range?.price || 0;
      totalShipping += vendor.shippingFee;
    });

    return {
      vendors,
      totalShipping,
      totalWeight: vendors.reduce(
        (sum, v) => sum + v.totalWeight,
        0
      ),
    };
  }

  /* ================= HOME DELIVERY ================= */

  const stateRate = deliveryRates.find(
    (r) => r.buyerState === selectedState
  );

  vendors.forEach((vendor) => {
    const product = products.find(
      (p) => (p._id || p.id) === vendor.items[0]?.productId
    );

    let productShippingFee = 0;

    if (product?.shippingRates?.length) {
      const shipping = product.shippingRates.find(
        (r) => r.destinationState === selectedState
      );

      if (shipping) {
        const range = shipping.weightRanges.find(
          (w) =>
            vendor.totalWeight >= w.min &&
            (w.max === null || vendor.totalWeight <= w.max)
        );

        productShippingFee = range?.price || 0;
      }
    }

    let busStopFee = 0;

    if (stateRate?.weightRanges?.length) {
      const busStopRange = stateRate.weightRanges.find(
        (w) =>
          vendor.totalWeight >= w.min &&
          (w.max === null || vendor.totalWeight <= w.max)
      );

      busStopFee = busStopRange?.price || 0;
    }

    vendor.shippingFee =
      productShippingFee + busStopFee;

    totalShipping += vendor.shippingFee;
  });

  return {
    vendors,
    totalShipping,
    totalWeight: vendors.reduce(
      (sum, v) => sum + v.totalWeight,
      0
    ),
  };
};