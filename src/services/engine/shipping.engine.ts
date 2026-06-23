
import { apiClient } from "../../api/core/api.client";

/* ================= API ================= */

export const getCollectionFeeByStateAPI = async (state: string) => {
  return apiClient.get(
    `/collection/find-collection-fee-by-state/${state}`
  );
};







import type { EnrichedCartItem } from "../../mappers/cart.mapper";
import type { Product } from "../../types";
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
      (r) => weight >= r.min && (r.max === null || weight <= r.max)
    )?.price || 0
  );
};

export const calculateShipping = (
  items: EnrichedCartItem[],
  products: Product[],
  selectedState: string,
  deliveryRates: DeliveryRate[],
  deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice"
): ShippingSummary => {
  const safeState = getSafeState(selectedState);

  // 🚨 HARD GUARD (fixes your undefined bug)
  if (!safeState || !items?.length || !products?.length) {
    return {
      vendors: [],
      shippingFeeSummation: 0,
      deliveryFeeSummation: 0,
      totalShipping: 0,
      totalWeight: 0,
    };
  }

  // 1. GROUP
  const vendors = groupCartItems(items, products);

  let shippingFeeSummation = 0;
  let deliveryFeeSummation = 0;

  const totalWeight = vendors.reduce(
    (sum, v) => sum + v.totalWeight,
    0
  );

  // 2. PICKUP MODE
  if (deliveryMode === "pickUpFromOurNearestOffice") {
    for (const vendor of vendors) {
      const product = products.find(
        (p: any) =>
          String(p._id || p.id) === String(vendor.items[0]?.productId)
      );

      const rate = (product as any)?.shippingRates?.find(
        (r: any) => r.destinationState === safeState
      );

      const fee = findWeightPrice(rate?.weightRanges, vendor.totalWeight);

      vendor.shippingFee = fee;
      vendor.deliveryFee = 0;

      shippingFeeSummation += fee;
    }

    return {
      vendors,
      shippingFeeSummation,
      deliveryFeeSummation: 0,
      totalShipping: shippingFeeSummation,
      totalWeight,
    };
  }

  // 3. HOME DELIVERY
  const stateRate = deliveryRates.find(
    (r) => r.buyerState === safeState
  );

  deliveryFeeSummation = findWeightPrice(
    stateRate?.weightRanges,
    totalWeight
  );

  for (const vendor of vendors) {
    const product = products.find(
      (p: any) =>
        String(p._id || p.id) === String(vendor.items[0]?.productId)
    );

    const rate = (product as any)?.shippingRates?.find(
      (r: any) => r.destinationState === safeState
    );

    const shippingFee = findWeightPrice(rate?.weightRanges, vendor.totalWeight);

    vendor.shippingFee = shippingFee;
    vendor.deliveryFee = 0;

    shippingFeeSummation += shippingFee;
  }

  return {
    vendors,
    shippingFeeSummation,
    deliveryFeeSummation,
    totalShipping: shippingFeeSummation + deliveryFeeSummation,
    totalWeight,
  };
};




























// import type { EnrichedCartItem } from "../../mappers/cart.mapper";
// import type { Product } from "../../types";

// /* ================= TYPES ================= */

// type DeliveryRate = {
//   buyerState: string;
//   weightRanges: {
//     min: number;
//     max: number | null;
//     price: number;
//   }[];
// };

// export type ShippingVendor = {
//   businessId: string;
//   businessState: string;

//   items: EnrichedCartItem[];
//   subtotal: number;
//   totalWeight: number;

//   shippingFee: number;
//   deliveryFee: number;
// };

// export type ShippingSummary = {
//   vendors: ShippingVendor[];

//   shippingFeeSummation: number;
//   deliveryFeeSummation: number;

//   totalShipping: number;
//   totalWeight: number;
// };

// /* ================= HELPERS ================= */

// const normalizeId = (id: any) => String(id ?? "").trim();

// const findWeightPrice = (ranges: any[] = [], weight: number) => {
//   return (
//     ranges.find(
//       (r) => weight >= r.min && (r.max === null || weight <= r.max)
//     )?.price || 0
//   );
// };

// /* ================= ENGINE ================= */

// export const calculateShipping = (
//   items: EnrichedCartItem[],
//   products: Product[],
//   selectedState: string,
//   deliveryRates: DeliveryRate[],
//   deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice"
// ): ShippingSummary => {
//   const safeState = selectedState?.trim() || "";


// /* ================= GUARD CLAUSE ================= */

// if (!safeState) {
//   return {
//     vendors: [],
//     shippingFeeSummation: 0,
//     deliveryFeeSummation: 0,
//     totalShipping: 0,
//     totalWeight: 0,
//   };
// }

//   /* ================= 1. PRODUCT MAP (O(1)) ================= */

//   const productMap = new Map<string, Product>();

//   for (const p of products) {
//     const id = normalizeId((p as any)._id || (p as any).id);
//     if (id) productMap.set(id, p);
//   }

// /* ================= 2. GROUP CART ITEMS (PRODUCTION SAFE) ================= */

// const grouped = new Map<string, ShippingVendor>();

// for (const item of items) {
//   const product = productMap.get(normalizeId(item.productId));

//   if (!product) continue;
//   if (!item.businessId) continue;

//   const weight = Number((product as any)?.weight ?? 1);

//   // ✅ Get state from cart item first, then product business
//   const cartState =
//     typeof (item as any)?.vendorState === "string"
//       ? (item as any).vendorState.trim()
//       : "";

//   const productState =
//     typeof (product as any)?.business?.businessAddress?.state === "string"
//       ? (product as any).business.businessAddress.state.trim()
//       : "";

//   const businessState =
//     cartState || productState || "UNKNOWN";

// console.log("VENDOR STATE CHECK", {
//   productId: item.productId,
//   vendorStateFromCart: item.vendorState,
//   vendorStateFromProduct:
//     (product as any)?.business?.businessAddress?.state,
// });

//   // ✅ DEBUG
//   console.log("GROUPING ITEM:", {
//     productId: item.productId,
//     businessId: item.businessId,
//     cartState,
//     productState,
//     businessState,
//   });

//   let vendor = grouped.get(item.businessId);

//   if (!vendor) {
//     vendor = {
//       businessId: item.businessId,
//       businessState,
//       items: [],
//       subtotal: 0,
//       totalWeight: 0,
//       shippingFee: 0,
//       deliveryFee: 0,
//     };

//     grouped.set(item.businessId, vendor);
//   }

//   vendor.items.push(item);
//   vendor.subtotal += Number(item.price || 0) * Number(item.quantity || 0);
//   vendor.totalWeight += weight * Number(item.quantity || 0);
// }

// const vendors = Array.from(grouped.values());

// // ✅ DEBUG
// console.log(
//   "GROUPED VENDORS:",
//   vendors.map((v) => ({
//     businessId: v.businessId,
//     businessState: v.businessState,
//     itemCount: v.items.length,
//     totalWeight: v.totalWeight,
//   }))
// );

// let shippingFeeSummation = 0;
// let deliveryFeeSummation = 0;

//   /* ================= 3. DELIVERY MODE: PICKUP ================= */

//   if (deliveryMode === "pickUpFromOurNearestOffice") {
//     for (const vendor of vendors) {
//       const firstItem = vendor.items[0];
//       const product = productMap.get(normalizeId(firstItem?.productId));

//       const shippingRate = (product as any)?.shippingRates?.find(
//         (r: any) => r.destinationState === safeState
//       );

//       const fee = findWeightPrice(
//         shippingRate?.weightRanges,
//         vendor.totalWeight
//       );

//       vendor.shippingFee = fee;
//       vendor.deliveryFee = 0;

//       shippingFeeSummation += fee;
//     }

//     return {
//       vendors,
//       shippingFeeSummation,
//       deliveryFeeSummation: 0,
//       totalShipping: shippingFeeSummation,
//       totalWeight: vendors.reduce((s, v) => s + v.totalWeight, 0),
//     };
//   }

// /* ================= 4. HOME DELIVERY ================= */

// const stateRate = deliveryRates.find(
//   (r) => r.buyerState === safeState
// );

// /**
//  * Total weight of all vendors combined
//  */
// const totalWeight = vendors.reduce(
//   (sum, vendor) => sum + vendor.totalWeight,
//   0
// );

// /**
//  * Delivery fee is calculated ONCE
//  * using total cart weight
//  */
// deliveryFeeSummation = findWeightPrice(
//   stateRate?.weightRanges,
//   totalWeight
// );

// for (const vendor of vendors) {
//   const firstItem = vendor.items[0];

//   const product = productMap.get(
//     normalizeId(firstItem?.productId)
//   );

//   if (!product) continue;

//   /**
//    * Vendor → Buyer State shipping fee
//    */
//   const shippingRate = (product as any)?.shippingRates?.find(
//     (r: any) => r.destinationState === safeState
//   );

//   const shippingFee = findWeightPrice(
//     shippingRate?.weightRanges,
//     vendor.totalWeight
//   );

//   vendor.shippingFee = shippingFee;

//   /**
//    * Delivery fee is not per vendor
//    */
//   vendor.deliveryFee = 0;

//   shippingFeeSummation += shippingFee;

//   console.log("============== SHIPPING DEBUG ==============");
//   console.log("Vendor:", vendor.businessId);
//   console.log("Vendor State:", vendor.businessState);
//   console.log("Vendor Weight:", vendor.totalWeight);
//   console.log("Shipping Fee:", shippingFee);
//   console.log("============================================");
// }


// console.log("============== DELIVERY DEBUG ==============");
// console.log("Buyer State:", safeState);
// console.log("Total Cart Weight:", totalWeight);
// console.log("Delivery Fee:", deliveryFeeSummation);
// console.log("Shipping Fee Sum:", shippingFeeSummation);
// console.log(
//   "Total Home Delivery:",
//   shippingFeeSummation + deliveryFeeSummation
// );
// console.log("============================================");

// return {
//   vendors,
//   shippingFeeSummation,
//   deliveryFeeSummation,
//   totalShipping:
//     shippingFeeSummation +
//     deliveryFeeSummation,
//   totalWeight,
// };



// };