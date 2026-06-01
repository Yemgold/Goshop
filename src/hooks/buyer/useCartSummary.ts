


import { useMemo } from "react";

export function useCartSummary(items: any[], products: any[]) {
  const enrichedItems = useMemo(() => {
    return items.map((cartItem: any) => {
      const product = products.find(
        (p: any) => (p._id || p.id) === cartItem.productId
      );

      return {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        name: product?.name ?? "Product",
        price: product?.price ?? 0,
        weight: product?.weight ?? 0,
        businessId: product?.businessId,
        image: product?.media?.[0]?.url ?? "/placeholder.png",
      };
    });
  }, [items, products]);

  const total = useMemo(() => {
    return enrichedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [enrichedItems]);

  const totalWeight = useMemo(() => {
    return enrichedItems.reduce(
      (sum, item) => sum + item.weight * item.quantity,
      0
    );
  }, [enrichedItems]);

  const businessId = enrichedItems?.[0]?.businessId;

  return {
    enrichedItems,
    total,
    totalWeight,
    businessId,
  };
}