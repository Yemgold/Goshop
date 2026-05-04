

import { ProSidebar } from "./ProSidebar";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";

export function BuyerSidebar() {
  return (
    <ProSidebar
      title="Buyer"
      menu={[
        { label: "Home", path: "/buyer/home", icon: <Home /> },
        {
          label: "Products",
          path: "/buyer/products",
          icon: <ShoppingBag />,
        },
        {
          label: "Cart",
          path: "/buyer/cart",
          icon: <ShoppingCart />,
        },
      ]}
    />
  );
}