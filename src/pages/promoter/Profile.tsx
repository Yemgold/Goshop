

import { usePromoterProfile } from "../../hooks/promoter/promoter.hooks";

/* ================= TYPES ================= */
type PromoterProfile = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  referralCode: string;
  walletBalance: number;
  totalEarnings: number;
  totalReferrals: number;
};

export default function PromoterProfile() {
  const { data, isLoading, isError } = usePromoterProfile();

  const profile = data as PromoterProfile | undefined;

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading profile...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError || !profile) {
    return (
      <div className="p-6 text-red-500">
        Failed to load profile
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">My Profile</h1>

      {/* ================= PROFILE CARD ================= */}
      <div className="border rounded-xl p-6 bg-white flex gap-6 items-center">
        <img
          src={
            profile.avatar ||
            "https://via.placeholder.com/100"
          }
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div className="space-y-1">
          <h2 className="text-lg font-semibold">
            {profile.fullName}
          </h2>

          <p className="text-sm text-gray-500">
            {profile.email}
          </p>

          {profile.phone && (
            <p className="text-sm text-gray-500">
              {profile.phone}
            </p>
          )}

          <p className="text-sm text-gray-500">
            Referral Code:{" "}
            <span className="font-mono">
              {profile.referralCode}
            </span>
          </p>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">
            Wallet Balance
          </p>
          <h3 className="text-xl font-bold">
            ₦{profile.walletBalance.toLocaleString()}
          </h3>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">
            Total Earnings
          </p>
          <h3 className="text-xl font-bold">
            ₦{profile.totalEarnings.toLocaleString()}
          </h3>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">
            Total Referrals
          </p>
          <h3 className="text-xl font-bold">
            {profile.totalReferrals}
          </h3>
        </div>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded bg-black text-white">
          Edit Profile
        </button>

        <button className="px-4 py-2 rounded border">
          View Earnings
        </button>

        <button className="px-4 py-2 rounded border">
          Withdraw Funds
        </button>
      </div>
    </div>
  );
}