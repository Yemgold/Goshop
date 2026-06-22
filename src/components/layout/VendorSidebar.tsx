

import { ProSidebar } from "./ProSidebar";

import {
  Home,
  ShoppingCart,
  PackageCheck,
  LayoutDashboard,
  Package,
  ClipboardList,
  ShoppingBag,
  BarChart3,
  Plus,
  Sparkles,
  Wallet,
  Truck,
  Users,
  Settings,
} from "lucide-react";

import type { PartnerRole } from "../../types/roles";

type Props = {
  onAddPhysical: () => void;
  onAddDigital: () => void;
  onAddPartner?: () => void;
  onOpenBusinessProfile?: () => void;
  roles?: PartnerRole[];
  hasBusinessProfile?: boolean;
};

export function VendorSidebar({
  onAddPhysical,
  onAddDigital,
  onAddPartner,
  onOpenBusinessProfile,
  roles = [],
  hasBusinessProfile = false,
}: Props) {


  // ================= PARTNER CHECK =================
const partnerRoles: PartnerRole[] = [
  "vendor",
  "promoter",
  "partner_pickup_center",
];

const hasAllRoles = partnerRoles.every((role) =>
  roles.includes(role)
);

const handleUpgradePartnership = () => {
  if (hasBusinessProfile) {
    onAddPartner?.();
  } else {
    onOpenBusinessProfile?.();
  }
};

  // ================= MENU =================
  const menu = [
    // ================= PERFORMANCE =================
    {
      label: "Performance",
      icon: <BarChart3 size={18} />,
      children: [
        {
          label: "Dashboard",
          path: "/vendor/dashboard",
          icon: <LayoutDashboard size={18} />,
        },
        {
          label: "Analytics",
          path: "/vendor/analytics",
          icon: <BarChart3 size={18} />,
        },
        {
          label: "Sales Overview",
          path: "/vendor/sales",
          icon: <ShoppingCart size={18} />,
        },
        {
          label: "Product Performance",
          path: "/vendor/product-performance",
          icon: <Package size={18} />,
        },
      ],
    },

    // ================= PRODUCTS =================
    {
      label: "Products",
      icon: <Package size={18} />,
      children: [
        {
          label: "All Products",
          path: "/vendor/products",
          icon: <Package size={18} />,
        },
        {
          label: "Inventory",
          path: "/vendor/inventory",
          icon: <PackageCheck size={18} />,
        },
        {
          label: "Categories",
          path: "/vendor/categories",
          icon: <Package size={18} />,
        },
        {
          label: "Discounts",
          path: "/vendor/discounts",
          icon: <Sparkles size={18} />,
        },
      ],
    },

    // ================= ORDERS =================
    {
      label: "Orders",
      icon: <ClipboardList size={18} />,
      children: [
        {
          label: "All Orders",
          path: "/vendor/orders",
          icon: <ShoppingCart size={18} />,
        },
        {
          label: "Pending Orders",
          path: "/vendor/orders/pending",
          icon: <ShoppingCart size={18} />,
        },
        {
          label: "Completed Orders",
          path: "/vendor/orders/completed",
          icon: <PackageCheck size={18} />,
        },
        {
          label: "Returns & Refunds",
          path: "/vendor/returns",
          icon: <PackageCheck size={18} />,
        },
      ],
    },

    // ================= FULFILLMENT =================
    {
      label: "Fulfillment",
      icon: <Truck size={18} />,
      children: [
        {
          label: "Shipping Settings",
          path: "/vendor/shipping",
          icon: <Truck size={18} />,
        },
        {
          label: "Delivery Rate",
          path: "/vendor/delivery-rate",
          icon: <Truck size={18} />,
        },
      ],
    },

    // ================= FINANCE =================
    {
      label: "Finance",
      icon: <Wallet size={18} />,
      children: [
        {
          label: "Revenue",
          path: "/vendor/revenue",
          icon: <Wallet size={18} />,
        },
        {
          label: "Payouts",
          path: "/vendor/payouts",
          icon: <Wallet size={18} />,
        },
        {
          label: "Transactions",
          path: "/vendor/transactions",
          icon: <Wallet size={18} />,
        },
        {
          label: "Taxes",
          path: "/vendor/taxes",
          icon: <Wallet size={18} />,
        },
      ],
    },

    // ================= CUSTOMERS =================
    {
      label: "Customers",
      icon: <Users size={18} />,
      children: [
        {
          label: "Customer List",
          path: "/vendor/customers",
          icon: <Users size={18} />,
        },
        {
          label: "Reviews",
          path: "/vendor/reviews",
          icon: <Sparkles size={18} />,
        },
      ],
    },

    // ================= MARKETPLACE (BUYER MODE) =================
    {
      label: "Market Place",
      icon: <ShoppingBag size={18} />,
      children: [
        {
          label: "Go Shopping",
          path: "/buyers/home",
          icon: <Home size={18} />,
        },
        {
          label: "Buy Goods",
          path: "/buyers/dashboard",
          icon: <ShoppingBag size={18} />,
        },
        {
          label: "My Cart",
          path: "/buyers/cart",
          icon: <ShoppingCart size={18} />,
        },
        {
          label: "My Orders",
          path: "/buyers/orders",
          icon: <PackageCheck size={18} />,
        },
      ],
    },

    // ================= SETTINGS =================
    {
      label: "Settings",
      icon: <Settings size={18} />,
      children: [
        {
          label: "Store Profile",
          path: "/vendor/store",
          icon: <Home size={18} />,
        },
        {
          label: "Store Settings",
          path: "/vendor/store/settings",
          icon: <Settings size={18} />,
        },
        {
          label: "Account Security",
          path: "/vendor/security",
          icon: <Settings size={18} />,
        },
        {
          label: "Payout Settings",
          path: "/vendor/payout-settings",
          icon: <Wallet size={18} />,
        },
      ],
    },
  ];

  return (
    <ProSidebar
      title="Vendor Hub"
      menu={menu}
      footer={
        <div className="p-3 space-y-3 border-t bg-white">
          <button
            onClick={onAddPhysical}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:opacity-90 transition"
          >
            <Plus size={16} />
            Add Physical Product
          </button>

          <button
            onClick={onAddDigital}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:opacity-90 transition"
          >
            <Plus size={16} />
            Add Digital Product
          </button>

          {!hasAllRoles && (
  <button
    onClick={handleUpgradePartnership}
    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium hover:bg-gray-100 transition"
  >
    <Sparkles size={16} />
    Upgrade Partnership
  </button>
)}


        </div>
      }
    />
  );
}