


import { useMemo } from "react";
import { groupCartByVendor } from "../../mappers/group.cart.mapper";

export function useMultiCartSummary(items: any[], products: any[]) {
  const vendors = useMemo(() => {
    return groupCartByVendor(items, products);
  }, [items, products]);

  const total = useMemo(() => {
    return vendors.reduce((sum, vendor: any) => {
      return sum + vendor.subtotal;
    }, 0);
  }, [vendors]);

  const totalWeight = useMemo(() => {
    return vendors.reduce((sum, vendor: any) => {
      return sum + vendor.totalWeight;
    }, 0);
  }, [vendors]);

  return {
    vendors,
    total,
    totalWeight,
  };
}