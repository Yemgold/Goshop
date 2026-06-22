

// shipping.normalize.ts
export type NormalizedItem = {
  productId: string;
  quantity: number;
  vendorState: string;
  weight: number;
  price: number;
};

export const normalizeCartItems = (items: any[]): NormalizedItem[] => {
  return items
    .map((item) => {
      const vendorState =
        item.businessState ||
        item.vendorState ||
        item.business?.state ||
        "";

      return {
        productId: item.productId,
        quantity: item.quantity ?? 1,
        vendorState: typeof vendorState === "string" ? vendorState.trim() : "",
        weight: item.weight ?? 0,
        price: item.price ?? 0,
      };
    })
    .filter((item) => item.productId);
};