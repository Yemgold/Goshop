
import { ProSidebar } from "./ProSidebar";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
} from "lucide-react";

export function VendorSidebar() {
  return (
    <ProSidebar
      title="Vendor Panel"
      menu={[
        {
          label: "Dashboard",
          path: "/vendor/dashboard",
          icon: <LayoutDashboard />,
        },
        {
          label: "Products",
          path: "/vendor/products",
          icon: <Package />,
        },
        {
          label: "Orders",
          path: "/vendor/orders",
          icon: <ShoppingCart />,
        },
        {
          label: "Analytics",
          path: "/vendor/analytics",
          icon: <BarChart3 />,
        },
      ]}
    />
  );
}