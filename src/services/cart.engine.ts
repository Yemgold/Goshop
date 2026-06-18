


export function buildCartSummary(items: any[], products: any[]) {
  if (!items.length || !products.length) {
    return { vendors: [], total: 0 };
  }

  const vendorsMap = new Map();

  for (const item of items) {
    const product = products.find(p => p._id === item.productId);

    if (!vendorsMap.has(item.businessId)) {
      vendorsMap.set(item.businessId, {
        businessId: item.businessId,
        items: [],
        subtotal: 0,
      });
    }

    const vendor = vendorsMap.get(item.businessId);

    vendor.items.push({
      ...item,
      name: product?.name,
      weight: product?.weight || 0,
    });

    vendor.subtotal += item.price * item.quantity;
  }

  const vendors = Array.from(vendorsMap.values());

  return {
    vendors,
    total: vendors.reduce((sum, v) => sum + v.subtotal, 0),
  };
}