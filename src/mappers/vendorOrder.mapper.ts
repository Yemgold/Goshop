

import type { VendorOrderListItem } from "../types/vendor/vendorOrderList.types";

export const normalizeVendorOrderList = (order: any): VendorOrderListItem => {
  return {
    id: order._id || order.id || order.orderId || order.referenceId, // 🔥 add fallback
    customer: order.customer?.name || order.customer || "Unknown",
    total: order.totalAmount || order.total || 0,
    orderStatus: order.status || order.orderStatus || "pending",
    createdAt: order.createdAt,
  };
};