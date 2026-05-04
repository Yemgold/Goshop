
export const vendorKeys = {
  all: ["vendor"] as const,

  dashboard: ["vendor", "dashboard"] as const,

  analytics: ["vendor", "analytics"] as const,

  orders: (page = 1) =>
    ["vendor", "orders", page] as const,

  order: (id: string) =>
    ["vendor", "orders", id] as const,

  products: (page = 1, limit = 10) =>
    ["vendor", "products", page, limit] as const,
};