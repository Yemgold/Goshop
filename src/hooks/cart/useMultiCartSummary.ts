


import { useMemo } from "react";
import { groupCartByVendor } from "../../mappers/group.cart.mapper";

export function useMultiCartSummary(items: any[], products: any[]) {
  const safeItems = Array.isArray(items) ? items : [];
  const safeProducts = Array.isArray(products) ? products : [];

  const vendors = useMemo(() => {
    if (safeItems.length === 0 || safeProducts.length === 0) return [];
    return groupCartByVendor(safeItems, safeProducts);
  }, [safeItems, safeProducts]);

  const total = vendors.reduce(
    (sum, v) => sum + (v.subtotal || 0),
    0
  );

  const totalWeight = vendors.reduce(
    (sum, v) => sum + (v.totalWeight || 0),
    0
  );

  return { vendors, total, totalWeight };
}














// import { useMemo } from "react";
// import { groupCartByVendor } from "../../mappers/group.cart.mapper";

// export function useMultiCartSummary(items: any[]) {
//   const vendors = useMemo(() => {
//     return groupCartByVendor(items);
//   }, [items]);

//   const total = useMemo(() => {
//     return vendors.reduce((sum: number, v: any) => sum + v.subtotal, 0);
//   }, [vendors]);

//   const totalWeight = useMemo(() => {
//     return vendors.reduce((sum: number, v: any) => sum + v.totalWeight, 0);
//   }, [vendors]);

//   return { vendors, total, totalWeight };
// }