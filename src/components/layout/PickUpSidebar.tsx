


import { ProSidebar } from "./ProSidebar";

import {
  Package,
  PackageCheck,
  ClipboardList,
  Wallet,
  ShoppingBag,
  Home,
  ShoppingCart,
  Users,
  Bell,
  Settings,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  BarChart3,
} from "lucide-react";

import type { PartnerRole } from "../../types/roles";

type Props = {
  roles: PartnerRole[];
  onAddPartner?: () => void;
  onOpenBusinessProfile?: () => void;
  hasBusinessProfile?: boolean;
};

export function PickUpSidebar({
  roles,
  onAddPartner,
  onOpenBusinessProfile,
  hasBusinessProfile = false,
}: Props) {
  // ================= CHECK IF USER CAN STILL UPGRADE =================
  const canUpgrade = roles.length < 4;

  // ================= UPGRADE FLOW =================
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
          path: "/pickup/dashboard",
          icon: <BarChart3 size={18} />,
        },
      ],
    },

        // ================= RIDERS =================
    {
      label: "Riders",
      icon: <ClipboardList size={18} />,
      children: [
        {
          label: "Rider Management",
          path: "/pickup/riders/management",
          icon: <Package size={18} />,
        },
        {
          label: "Rider Invitations",
          path: "/pickup/riders/invite",
          icon: <PackageCheck size={18} />,
        },
        {
          label: "Rider Performance",
          path: "/pickup/rider/preformance",
          icon: <CheckCircle2 size={18} />,
        },
      ],
    },

    // ================= PICKUP ORDERS =================
    {
      label: "Orders",
      icon: <ClipboardList size={18} />,
      children: [
        {
          label: "Incoming Orders",
          path: "/pickup/orders",
          icon: <Package size={18} />,
        },
        {
          label: "Ready for Pickup",
          path: "/pickup/ready",
          icon: <PackageCheck size={18} />,
        },
        {
          label: "Collected Orders",
          path: "/pickup/collected",
          icon: <CheckCircle2 size={18} />,
        },
        {
          label: "Order History",
          path: "/pickup/history",
          icon: <Clock size={18} />,
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
          path: "/pickup/customers",
          icon: <Users size={18} />,
        },
      ],
    },

    // ================= FINANCE =================
    {
      label: "Finance",
      icon: <Wallet size={18} />,
      children: [
        {
          label: "Commissions",
          path: "/pickup/earnings",
          icon: <Wallet size={18} />,
        },
        {
          label: "Payouts",
          path: "/pickup/payouts",
          icon: <Wallet size={18} />,
        },
        {
          label: "Transactions",
          path: "/pickup/transactions",
          icon: <Wallet size={18} />,
        },
      ],
    },

    // ================= MARKET PLACE =================
    {
      label: "Market Place",
      icon: <ShoppingBag size={18} />,
      children: [
        {
          label: "Go Shopping",
          path: "/buyer/home",
          icon: <Home size={18} />,
        },
        {
          label: "Buy Goods",
          path: "/buyers/dashboard",
          icon: <ShoppingBag size={18} />,
        },
        {
          label: "My Cart",
          path: "/buyer/cart",
          icon: <ShoppingCart size={18} />,
        },
        {
          label: "My Orders",
          path: "/buyer/orders",
          icon: <PackageCheck size={18} />,
        },
      ],
    },

    // ================= PICKUP LOCATION =================
    {
      label: "Pickup Center",
      icon: <MapPin size={18} />,
      children: [
        {
          label: "Pickup Location",
          path: "/pickup/location",
          icon: <MapPin size={18} />,
        },
        {
          label: "Operating Hours",
          path: "/pickup/hours",
          icon: <Clock size={18} />,
        },
      ],
    },

    // ================= SUPPORT =================
    {
      label: "Support",
      icon: <Bell size={18} />,
      children: [
        {
          label: "Notifications",
          path: "/pickup/notifications",
          icon: <Bell size={18} />,
        },
        {
          label: "Help Center",
          path: "/pickup/support",
          icon: <Sparkles size={18} />,
        },
      ],
    },

    // ================= SETTINGS =================
    {
      label: "Settings",
      icon: <Settings size={18} />,
      children: [
        {
          label: "Profile Settings",
          path: "/pickup/settings",
          icon: <Settings size={18} />,
        },
        {
          label: "Pickup Center Settings",
          path: "/pickup/center-settings",
          icon: <MapPin size={18} />,
        },
        {
          label: "Payout Settings",
          path: "/pickup/payout-settings",
          icon: <Wallet size={18} />,
        },
      ],
    },
  ];

  // ================= RENDER =================
  return (
    <ProSidebar
      title="PickUp Hub"
      menu={menu}
      footer={
        <div className="p-3 space-y-3 border-t bg-white">
          {canUpgrade && (
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