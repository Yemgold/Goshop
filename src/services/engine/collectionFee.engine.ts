


import type { ShippingVendor } from "./shipping.engine";

export type CollectionFeeResponse = {
  breakdown: {
    businessId: string;
    businessState: string;
    fee: number;
  }[];

  totalFee: number;
  interstateVendorCount: number;
};

export const calculateCollectionFee = (
  vendors: ShippingVendor[],
  buyerState: string,
  baseFee: number,
  additionalFee: number
): CollectionFeeResponse => {
  const normalizedBuyerState =
    buyerState?.trim().toLowerCase();

  const interstateVendors = vendors.filter(
    (v) =>
      v.businessState?.trim().toLowerCase() !==
      normalizedBuyerState
  );

  const breakdown: CollectionFeeResponse["breakdown"] = [];

  let totalFee = 0;

  interstateVendors.forEach((vendor, index) => {
    const fee =
      index === 0 ? baseFee : additionalFee;

    totalFee += fee;

    breakdown.push({
      businessId: vendor.businessId,
      businessState: vendor.businessState,
      fee,
    });
  });

  // add same-state vendors as zero
  const sameStateVendors = vendors.filter(
    (v) =>
      v.businessState?.trim().toLowerCase() ===
      normalizedBuyerState
  );

  sameStateVendors.forEach((vendor) => {
    breakdown.push({
      businessId: vendor.businessId,
      businessState: vendor.businessState,
      fee: 0,
    });
  });

  return {
    breakdown,
    totalFee,
    interstateVendorCount: interstateVendors.length,
  };
};