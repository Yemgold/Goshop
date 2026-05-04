

/* ================= DASHBOARD ================= */
export const MOCK_DASHBOARD = {
  vendorName: "Demo Vendor",
  revenue: 240000,
  orders: 48,
  products: 12,
  recentOrders: [
    {
      id: "ORD-001",
      customer: "John Doe",
      amount: 12000,
      status: "Processing" as const,
    },
    {
      id: "ORD-002",
      customer: "Mary Jane",
      amount: 8500,
      status: "Delivered" as const,
    },
    {
      id: "ORD-003",
      customer: "David Smith",
      amount: 15000,
      status: "Accepted" as const,
    },
  ],
};