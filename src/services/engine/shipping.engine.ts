
import { apiClient } from "../../api/core/api.client";

/* ================= API ================= */

export const getCollectionFeeByStateAPI = async (state: string) => {
  return apiClient.get(
    `/collection/find-collection-fee-by-state/${state}`
  );
};







// import type { EnrichedCartItem } from "../../mappers/cart.mapper";
// import type { Product } from "../../types";
// import { groupCartItems } from "./groupCartItems";
// import { getSafeState } from "./stateHydration";

// type DeliveryRate = {
//   buyerState: string;
//   weightRanges: { min: number; max: number | null; price: number }[];
// };

// type ShippingVendor = any;

// type ShippingSummary = {
//   vendors: ShippingVendor[];
//   shippingFeeSummation: number;
//   deliveryFeeSummation: number;
//   totalShipping: number;
//   totalWeight: number;
// };

// const findWeightPrice = (ranges: any[] = [], weight: number) => {
//   return (
//     ranges.find(
//       (r) => weight >= r.min && (r.max === null || weight <= r.max)
//     )?.price || 0
//   );
// };

// export const calculateShipping = (
//   items: EnrichedCartItem[],
//   products: Product[],
//   selectedState: string,
//   deliveryRates: DeliveryRate[],
//   deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice"
// ): ShippingSummary => {
//   const safeState = getSafeState(selectedState);

//   // 🚨 HARD GUARD (fixes your undefined bug)
//   if (!safeState || !items?.length || !products?.length) {
//     return {
//       vendors: [],
//       shippingFeeSummation: 0,
//       deliveryFeeSummation: 0,
//       totalShipping: 0,
//       totalWeight: 0,
//     };
//   }

//   // 1. GROUP
//   const vendors = groupCartItems(items, products);

//   let shippingFeeSummation = 0;
//   let deliveryFeeSummation = 0;

//   const totalWeight = vendors.reduce(
//     (sum, v) => sum + v.totalWeight,
//     0
//   );

//   // 2. PICKUP MODE
//   if (deliveryMode === "pickUpFromOurNearestOffice") {
//     for (const vendor of vendors) {
//       const product = products.find(
//         (p: any) =>
//           String(p._id || p.id) === String(vendor.items[0]?.productId)
//       );

//       const rate = (product as any)?.shippingRates?.find(
//         (r: any) => r.destinationState === safeState
//       );

//       const fee = findWeightPrice(rate?.weightRanges, vendor.totalWeight);

//       vendor.shippingFee = fee;
//       vendor.deliveryFee = 0;

//       shippingFeeSummation += fee;
//     }

//     return {
//       vendors,
//       shippingFeeSummation,
//       deliveryFeeSummation: 0,
//       totalShipping: shippingFeeSummation,
//       totalWeight,
//     };
//   }

//   // 3. HOME DELIVERY
//   const stateRate = deliveryRates.find(
//     (r) => r.buyerState === safeState
//   );

//   deliveryFeeSummation = findWeightPrice(
//     stateRate?.weightRanges,
//     totalWeight
//   );

//   for (const vendor of vendors) {
//     const product = products.find(
//       (p: any) =>
//         String(p._id || p.id) === String(vendor.items[0]?.productId)
//     );

//     const rate = (product as any)?.shippingRates?.find(
//       (r: any) => r.destinationState === safeState
//     );

//     const shippingFee = findWeightPrice(rate?.weightRanges, vendor.totalWeight);

//     vendor.shippingFee = shippingFee;
//     vendor.deliveryFee = 0;

//     shippingFeeSummation += shippingFee;
//   }

//   return {
//     vendors,
//     shippingFeeSummation,
//     deliveryFeeSummation,
//     totalShipping: shippingFeeSummation + deliveryFeeSummation,
//     totalWeight,
//   };
// };















import type { EnrichedCartItem } from "../../mappers/cart.mapper";
import { groupCartItems } from "./groupCartItems";
import { getSafeState } from "./stateHydration";

type DeliveryRate = {
  buyerState: string;
  weightRanges: { min: number; max: number | null; price: number }[];
};

type ShippingVendor = any;

type ShippingSummary = {
  vendors: ShippingVendor[];
  shippingFeeSummation: number;
  deliveryFeeSummation: number;
  totalShipping: number;
  totalWeight: number;
};

const findWeightPrice = (ranges: any[] = [], weight: number) => {
  return (
    ranges.find(
      (r) =>
        weight >= r.min &&
        (r.max === null || weight <= r.max)
    )?.price || 0
  );
};

export const calculateShipping = (
  items: EnrichedCartItem[],
  selectedState: string,
  deliveryRates: DeliveryRate[],
  deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice"
): ShippingSummary => {

  const safeState = getSafeState(selectedState);

  if (!safeState || !items?.length) {
    return {
      vendors: [],
      shippingFeeSummation: 0,
      deliveryFeeSummation: 0,
      totalShipping: 0,
      totalWeight: 0,
    };
  }

  const vendors = groupCartItems(items);

  let shippingFeeSummation = 0;
  let deliveryFeeSummation = 0;

  const totalWeight = vendors.reduce(
    (sum, v) => sum + v.totalWeight,
    0
  );

  if (deliveryMode === "pickUpFromOurNearestOffice") {

    for (const vendor of vendors) {

      const shippingRates =
        vendor.items[0]?.shippingRates || [];

      const rate = shippingRates.find(
        (r: any) =>
          r.destinationState === safeState
      );

      const fee = findWeightPrice(
        rate?.weightRanges,
        vendor.totalWeight
      );

      vendor.shippingFee = fee;
      vendor.deliveryFee = 0;

      shippingFeeSummation += fee;
    }

console.log("========== VENDORS AFTER GROUPING ==========");

vendors.forEach((vendor: any) => {
  console.log({
    businessId: vendor.businessId,
    businessState: vendor.businessState,
    shippingRates: vendor.items[0]?.shippingRates,
  });
});

    return {
      vendors,
      shippingFeeSummation,
      deliveryFeeSummation: 0,
      totalShipping: shippingFeeSummation,
      totalWeight,
    };
  }

  const stateRate = deliveryRates.find(
    (r) => r.buyerState === safeState
  );

  deliveryFeeSummation = findWeightPrice(
    stateRate?.weightRanges,
    totalWeight
  );

  for (const vendor of vendors) {

    const shippingRates =
      vendor.items[0]?.shippingRates || [];

    const rate = shippingRates.find(
      (r: any) =>
        r.destinationState === safeState
    );

    const shippingFee = findWeightPrice(
      rate?.weightRanges,
      vendor.totalWeight
    );

    vendor.shippingFee = shippingFee;
    vendor.deliveryFee = 0;

    shippingFeeSummation += shippingFee;
  }

  return {
    vendors,
    shippingFeeSummation,
    deliveryFeeSummation,
    totalShipping:
      shippingFeeSummation +
      deliveryFeeSummation,
    totalWeight,
  };
};















