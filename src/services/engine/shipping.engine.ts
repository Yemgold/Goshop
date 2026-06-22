


import type { EnrichedCartItem } from "../../mappers/cart.mapper";
import type { Product } from "../../types";

/* ================= TYPES ================= */

type DeliveryRate = {
  buyerState: string;
  weightRanges: {
    min: number;
    max: number | null;
    price: number;
  }[];
};

export type ShippingVendor = {
  businessId: string;
  businessState: string;

  items: EnrichedCartItem[];
  subtotal: number;
  totalWeight: number;

  shippingFee: number;
  deliveryFee: number;
};

export type ShippingSummary = {
  vendors: ShippingVendor[];

  shippingFeeSummation: number;
  deliveryFeeSummation: number;

  totalShipping: number;
  totalWeight: number;
};

/* ================= HELPERS ================= */

const normalizeId = (id: any) => String(id ?? "").trim();

const findWeightPrice = (ranges: any[] = [], weight: number) => {
  return (
    ranges.find(
      (r) => weight >= r.min && (r.max === null || weight <= r.max)
    )?.price || 0
  );
};

/* ================= ENGINE ================= */

export const calculateShipping = (
  items: EnrichedCartItem[],
  products: Product[],
  selectedState: string,
  deliveryRates: DeliveryRate[],
  deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice"
): ShippingSummary => {
  const safeState = selectedState?.trim() || "";

  /* ================= 1. PRODUCT MAP (O(1)) ================= */

  const productMap = new Map<string, Product>();

  for (const p of products) {
    const id = normalizeId((p as any)._id || (p as any).id);
    if (id) productMap.set(id, p);
  }

/* ================= 2. GROUP CART ITEMS (PRODUCTION SAFE) ================= */

const grouped = new Map<string, ShippingVendor>();

for (const item of items) {
  const product = productMap.get(normalizeId(item.productId));

  if (!product) continue;
  if (!item.businessId) continue;

  const weight = Number((product as any)?.weight ?? 1);

  // ✅ SAFE BUSINESS STATE EXTRACTION
  const rawState =
    (product as any)?.business?.businessAddress?.state;

  const businessState =
    typeof rawState === "string" ? rawState.trim() : "";

  let vendor = grouped.get(item.businessId);

  if (!vendor) {
    vendor = {
      businessId: item.businessId,

      // ✅ never allow undefined/unstable value
      businessState: businessState || "UNKNOWN",

      items: [],
      subtotal: 0,
      totalWeight: 0,

      shippingFee: 0,
      deliveryFee: 0,
    };

    grouped.set(item.businessId, vendor);
  }

  vendor.items.push(item);
  vendor.subtotal += item.price * item.quantity;
  vendor.totalWeight += weight * item.quantity;
}

const vendors = Array.from(grouped.values());

let shippingFeeSummation = 0;
let deliveryFeeSummation = 0;

  /* ================= 3. DELIVERY MODE: PICKUP ================= */

  if (deliveryMode === "pickUpFromOurNearestOffice") {
    for (const vendor of vendors) {
      const firstItem = vendor.items[0];
      const product = productMap.get(normalizeId(firstItem?.productId));

      const shippingRate = (product as any)?.shippingRates?.find(
        (r: any) => r.destinationState === safeState
      );

      const fee = findWeightPrice(
        shippingRate?.weightRanges,
        vendor.totalWeight
      );

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

/* ================= 4. HOME DELIVERY ================= */

const stateRate = deliveryRates.find(
  (r) => r.buyerState === safeState
);

/**
 * Total weight of all vendors combined
 */
const totalWeight = vendors.reduce(
  (sum, vendor) => sum + vendor.totalWeight,
  0
);

/**
 * Delivery fee is calculated ONCE
 * using total cart weight
 */
deliveryFeeSummation = findWeightPrice(
  stateRate?.weightRanges,
  totalWeight
);

for (const vendor of vendors) {
  const firstItem = vendor.items[0];

  const product = productMap.get(
    normalizeId(firstItem?.productId)
  );

  if (!product) continue;

  /**
   * Vendor → Buyer State shipping fee
   */
  const shippingRate = (product as any)?.shippingRates?.find(
    (r: any) => r.destinationState === safeState
  );

  const shippingFee = findWeightPrice(
    shippingRate?.weightRanges,
    vendor.totalWeight
  );

  vendor.shippingFee = shippingFee;

  /**
   * Delivery fee is not per vendor
   */
  vendor.deliveryFee = 0;

  shippingFeeSummation += shippingFee;

  console.log("============== SHIPPING DEBUG ==============");
  console.log("Vendor:", vendor.businessId);
  console.log("Vendor State:", vendor.businessState);
  console.log("Vendor Weight:", vendor.totalWeight);
  console.log("Shipping Fee:", shippingFee);
  console.log("============================================");
}

console.log("============== DELIVERY DEBUG ==============");
console.log("Buyer State:", safeState);
console.log("Total Cart Weight:", totalWeight);
console.log("Delivery Fee:", deliveryFeeSummation);
console.log("Shipping Fee Sum:", shippingFeeSummation);
console.log(
  "Total Home Delivery:",
  shippingFeeSummation + deliveryFeeSummation
);
console.log("============================================");

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










import { apiClient } from "../../api/core/api.client";

/* ================= API ================= */

export const getCollectionFeeByStateAPI = async (state: string) => {
  return apiClient.get(
    `/collection/find-collection-fee-by-state/${state}`
  );
};


