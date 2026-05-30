


import type { BuyerDashboardDTO } from "../services/buyer.dashboard.service";

export function mapBuyerDashboard(data: BuyerDashboardDTO) {
  return {
    stats: data?.stats ?? {},

    products: (data?.products ?? []).map((p) => ({
      id: p._id,
      name: p.name,
      price: p.price,
      image: p.media?.[0]?.url ?? "/placeholder.png",
    })),

    recentOrders: (data?.recentOrders ?? []).map((o) => ({
      id: o._id,
      total: o.total,
      status: o.status,
      createdAt: o.createdAt,
    })),

    cartCount: data?.cart?.itemsCount ?? 0,
  };
}