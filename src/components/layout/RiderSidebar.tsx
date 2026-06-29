


import { ProSidebar } from "./ProSidebar";

import {
  Truck,
  MapPin,
  Wallet,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  PackageCheck,
  ClipboardList,
  Navigation,
  Clock,
  Star,
  Settings,
  BarChart3,
} from "lucide-react";

import type { PartnerRole } from "../../types/roles";

type Props = {
  roles: PartnerRole[];
  onAddPartner?: () => void;
  onOpenBusinessProfile?: () => void;
  hasBusinessProfile?: boolean;
};

export function RiderSidebar({
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
          path: "/rider/dashboard",
          icon: <Truck size={18} />,
        },
        {
          label: "Analytics",
          path: "/rider/analytics",
          icon: <BarChart3 size={18} />,
        },
        {
          label: "Ratings & Reviews",
          path: "/rider/ratings",
          icon: <Star size={18} />,
        },
      ],
    },

    // ================= JOBS =================
    {
      label: "Jobs",
      icon: <ClipboardList size={18} />,
      children: [
        {
          label: "Available Jobs",
          path: "/rider/jobs",
          icon: <MapPin size={18} />,
        },
        {
          label: "Active Deliveries",
          path: "/rider/active",
          icon: <Navigation size={18} />,
        },
        {
          label: "Job History",
          path: "/rider/history",
          icon: <Clock size={18} />,
        },
      ],
    },

    // ================= EARNINGS =================
    {
      label: "Finance",
      icon: <Wallet size={18} />,
      children: [
        {
          label: "Earnings",
          path: "/rider/earnings",
          icon: <Wallet size={18} />,
        },
        {
          label: "Payouts",
          path: "/rider/payouts",
          icon: <Wallet size={18} />,
        },
        {
          label: "Transactions",
          path: "/rider/transactions",
          icon: <Wallet size={18} />,
        },
      ],
    },

    // ================= LOCATION & ROUTES =================
    {
      label: "Navigation",
      icon: <MapPin size={18} />,
      children: [
        {
          label: "Live Map",
          path: "/rider/map",
          icon: <Navigation size={18} />,
        },
        {
          label: "Delivery Zones",
          path: "/rider/zones",
          icon: <MapPin size={18} />,
        },
      ],
    },

    // ================= MARKET PLACE =================
    {
      label: "Market Place",
      icon: <ShoppingBag size={18} />,
      children: [
       
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

    // ================= SUPPORT =================
    {
      label: "Support",
      icon: <Sparkles size={18} />,
      children: [
        {
          label: "Notifications",
          path: "/rider/notifications",
          icon: <Sparkles size={18} />,
        },
        {
          label: "Help Center",
          path: "/rider/support",
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
          path: "/rider/settings",
          icon: <Settings size={18} />,
        },
        {
          label: "Vehicle Info",
          path: "/rider/vehicle",
          icon: <Truck size={18} />,
        },
        {
          label: "Payout Settings",
          path: "/rider/payout-settings",
          icon: <Wallet size={18} />,
        },
      ],
    },
  ];

  // ================= RENDER =================
  return (
    <ProSidebar
      title="Rider Hub"
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