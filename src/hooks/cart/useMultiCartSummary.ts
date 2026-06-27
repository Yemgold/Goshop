


import { useMemo } from "react";
import { groupCartByVendor } from "../../mappers/group.cart.mapper";

export function useMultiCartSummary(
  items: any[],
  cartId?: string
) {
  const safeItems = Array.isArray(items) ? items : [];

  const vendors = useMemo(() => {
    return groupCartByVendor(safeItems);
  }, [safeItems]);

  const total = useMemo(
    () => vendors.reduce((sum, v) => sum + (v.subtotal || 0), 0),
    [vendors]
  );

  const totalWeight = useMemo(
    () => vendors.reduce((sum, v) => sum + (v.totalWeight || 0), 0),
    [vendors]
  );

  return {
    cartId: cartId || "",
    vendors,
    total,
    totalWeight,
  };
}




