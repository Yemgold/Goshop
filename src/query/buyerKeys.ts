
export const buyerKeys = {
  all: ["buyer"] as const,

  dashboard: ["buyer", "dashboard"] as const,

  analytics: ["buyer", "analytics"] as const,

  products: (page = 1, limit = 10) =>
    ["buyer", "products", page, limit] as const,

  product: (id: string) =>
    ["buyer", "product", id] as const,

  cart: ["buyer", "cart"] as const,

  checkout: ["buyer", "checkout"] as const,

  orders: (page = 1) =>
    ["buyer", "orders", page] as const,

  order: (id: string) =>
    ["buyer", "orders", id] as const,

  wishlist: ["buyer", "wishlist"] as const,

  addresses: ["buyer", "addresses"] as const,

  notifications: ["buyer", "notifications"] as const,
};