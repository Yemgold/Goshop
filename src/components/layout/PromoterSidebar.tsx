

import { ProSidebar, type MenuItem } from "./ProSidebar";

import {
  Home,
  Megaphone,
  BarChart3,
  Wallet,
  Share2,
  ShoppingBag,
  ShoppingCart,
  PackageCheck,
  Sparkles,
} from "lucide-react";

import type { PartnerRole } from "../../types/roles";

type Props = {
  roles: PartnerRole[];
  onAddPartner?: () => void;
  onOpenBusinessProfile?: () => void;
  hasBusinessProfile?: boolean;
};

export function PromoterSidebar({
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
  const menu: MenuItem[] = [
    // ================= PERFORMANCE =================
    {
      label: "Performance",
      icon: <BarChart3 size={18} />,
      children: [
        {
          label: "Dashboard",
          path: "/promoter/dashboard",
          icon: <Home size={18} />,
        },
        {
          label: "Analytics",
          path: "/promoter/analytics",
          icon: <BarChart3 size={18} />,
        },
        {
          label: "Campaigns",
          path: "/promoter/campaigns",
          icon: <Megaphone size={18} />,
        },
        {
          label: "Leaderboard",
          path: "/promoter/leaderboard",
          icon: <BarChart3 size={18} />,
        },
        {
          label: "Product Performance",
          path: "/promoter/product-performance",
          icon: <ShoppingBag size={18} />,
        },
      ],
    },

    // ================= TOOLS =================
    {
      label: "Tools",
      icon: <Share2 size={18} />,
      children: [
        {
          label: "Share Products",
          path: "/promoter/share",
          icon: <Share2 size={18} />,
        },
        {
          label: "Referral Links",
          path: "/promoter/referrals",
          icon: <Share2 size={18} />,
        },
        {
          label: "Referral Analytics",
          path: "/promoter/referral-stats",
          icon: <BarChart3 size={18} />,
        },
        {
          label: "Coupons",
          path: "/promoter/coupons",
          icon: <Sparkles size={18} />,
        },
        {
          label: "Training",
          path: "/promoter/training",
          icon: <Sparkles size={18} />,
        },
        {
          label: "Badges & Rewards",
          path: "/promoter/rewards",
          icon: <Sparkles size={18} />,
        },
      ],
    },

    // ================= FINANCE =================
    {
      label: "Finance",
      icon: <Wallet size={18} />,
      children: [
        {
          label: "Earnings",
          path: "/promoter/earnings",
          icon: <Wallet size={18} />,
        },
        {
          label: "Earnings History",
          path: "/promoter/earnings-history",
          icon: <Wallet size={18} />,
        },
        {
          label: "Withdrawals",
          path: "/promoter/withdrawals",
          icon: <Wallet size={18} />,
        },
        {
          label: "Payout Requests",
          path: "/promoter/payouts",
          icon: <Wallet size={18} />,
        },
        {
          label: "Transactions",
          path: "/promoter/transactions",
          icon: <Wallet size={18} />,
        },
        {
          label: "Commission Breakdown",
          path: "/promoter/commissions",
          icon: <BarChart3 size={18} />,
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

    // ================= SUPPORT =================
    {
      label: "Support",
      icon: <Megaphone size={18} />,
      children: [
        {
          label: "Notifications Center",
          path: "/promoter/notifications",
          icon: <Megaphone size={18} />,
        },
        {
          label: "Help & Support",
          path: "/promoter/support",
          icon: <Megaphone size={18} />,
        },
        {
          label: "Support Tickets",
          path: "/promoter/tickets",
          icon: <Megaphone size={18} />,
        },
      ],
    },

    // ================= SETTINGS =================
    {
      label: "Settings",
      icon: <Home size={18} />,
      children: [
        {
          label: "Profile Settings",
          path: "/promoter/settings",
          icon: <Home size={18} />,
        },
        {
          label: "Affiliate Profile",
          path: "/promoter/profile",
          icon: <Home size={18} />,
        },
      ],
    },
  ];

  // ================= RENDER =================
  return (
    <ProSidebar
      title="Promoter Hub"
      menu={menu}
      footer={
        <div className="p-3 border-t bg-white space-y-3">
          {canUpgrade && (
            <button
              onClick={handleUpgradePartnership}
              className="
                w-full flex items-center justify-center gap-2
                px-3 py-2.5 rounded-xl
                border border-gray-200
                bg-gray-50 text-gray-800
                text-sm font-medium
                hover:bg-gray-100
                transition
              "
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