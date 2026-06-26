


import type { UserRole } from "../types/roles";

export type DashboardConfig = {
  title: string;
  subtitle?: string;
  nav: {
    label: string;
    to: string;
  }[];
  actions?: {
    label: string;
    to: string;
  }[];
};

export const dashboardConfig: Record<UserRole, DashboardConfig> = {
  user: {
    title: "User Dashboard 🛍️",
    subtitle: "Shop & track orders",
    nav: [
      { label: "Home", to: "/buyer/home" },
      { label: "Shop", to: "/buyer/products" },
      { label: "Cart", to: "/buyer/cart" },
    ],
  },

  vendor: {
    title: "Vendor Panel 🏪",
    subtitle: "Manage your store",
    nav: [
      { label: "Dashboard", to: "/vendor/dashboard" },
      { label: "Products", to: "/vendor/products" },
      { label: "Orders", to: "/vendor/orders" },
    ],
    actions: [
      { label: "Products", to: "/vendor/products" },
      { label: "Orders", to: "/vendor/orders" },
      { label: "Analytics", to: "/vendor/analytics" },
    ],
  },

  promoter: {
    title: "Promoter 📢",
    subtitle: "Share & earn",
    nav: [
      { label: "Dashboard", to: "/promoter/dashboard" },
      { label: "Share", to: "/promoter/share" },
      { label: "Campaigns", to: "/promoter/campaigns" },
    ],
  },

    partner_pickup_center: {
    title: "Pickup Center Dashboard",
    subtitle: "Manage customer pickups",
    nav: [
      {
        label: "Dashboard",
        to: "/pickup/dashboard",
      },
      {
        label: "Incoming Orders",
        to: "/pickup/orders",
      },
      {
        label: "Ready For Pickup",
        to: "/pickup/ready",
      },
    ],
  },


      rider: {
    title: "Rider Dashboard",
    subtitle: "Deliver pickups",
    nav: [
      {
        label: "Dashboard",
        to: "/rider/dashboard",
      },
      {
        label: "Incoming Orders",
        to: "/rider/orders",
      },
      {
        label: "Ready For Pickup",
        to: "/pickup/ready",
      },
    ],
  },







   admin: {
    title: "Admin Dashboard",
    subtitle: "System administration",
    nav: [
      {
        label: "Dashboard",
        to: "/admin/dashboard",
      },
      {
        label: "Users",
        to: "/admin/users",
      },
      {
        label: "Reports",
        to: "/admin/reports",
      },
    ],
  },

};