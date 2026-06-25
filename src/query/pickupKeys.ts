
export const pickupKeys = {
  all: ["pickup"] as const,

  dashboard: ["pickup", "dashboard"] as const,

  analytics: ["pickup", "analytics"] as const,

  orders: (page = 1) =>
    ["pickup", "orders", page] as const,

  order: (id: string) =>
    ["pickup", "orders", id] as const,

  
};