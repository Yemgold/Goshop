

export function groupCartByVendor(items: any[], products: any[]) {
  if (!Array.isArray(items) || !Array.isArray(products)) {
    return [];
  }

  const productMap = new Map(
    products.map((p: any) => [String(p._id), p])
  );

  const grouped: Record<string, any> = {};

  for (const item of items) {
    const product = productMap.get(String(item.productId));

    if (!product) continue; // 🔴 prevents zero bugs

    const businessId = product.businessId;

    if (!grouped[businessId]) {
      grouped[businessId] = {
        businessId,
        items: [],
        subtotal: 0,
        totalWeight: 0,
      };
    }

    const enrichedItem = {
      productId: item.productId,
      quantity: item.quantity,
      price: Number(product.price || 0),
    };

    grouped[businessId].items.push(enrichedItem);

    grouped[businessId].subtotal +=
      enrichedItem.price * enrichedItem.quantity;

    grouped[businessId].totalWeight +=
      (product.weight || 0) * item.quantity;
  }

  return Object.values(grouped);
}