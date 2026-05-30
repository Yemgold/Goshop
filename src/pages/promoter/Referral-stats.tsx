


import { useMemo } from "react";

import { useReferralStats } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

import type { Referral } from "../../types/promoter.types";

type ReferralStatsResponse = {
  referrals: Referral[];
  totalReferrals: number;
  activeReferrals: number;
  totalReferralRevenue?: number;
  totalEarnings?: number;
  conversionRate?: number;
  clicks?: number;
};

export default function ReferralStats() {
  const { data, isLoading, isError } = useReferralStats();

  // ✅ ALWAYS SAFE FALLBACK (NO CONDITIONAL LOGIC AROUND HOOKS)
  const statsData = (data as ReferralStatsResponse) ?? {
    referrals: [],
    totalReferrals: 0,
    activeReferrals: 0,
    totalReferralRevenue: 0,
    totalEarnings: 0,
    conversionRate: 0,
    clicks: 0,
  };

  const referrals = statsData.referrals;

  // ================= ALL HOOKS FIRST =================

  const stats = useMemo(() => {
    const totalSpent = referrals.reduce(
      (sum, r) => sum + (r.totalSpent ?? 0),
      0
    );

    const totalOrders = referrals.reduce(
      (sum, r) => sum + (r.totalOrders ?? 0),
      0
    );

    return {
      totalSpent,
      totalOrders,
      avgSpentPerReferral:
        referrals.length ? totalSpent / referrals.length : 0,
      avgOrdersPerReferral:
        referrals.length ? totalOrders / referrals.length : 0,
    };
  }, [referrals]);

  const topReferrals = useMemo(() => {
    return [...referrals]
      .sort((a, b) => (b.totalSpent ?? 0) - (a.totalSpent ?? 0))
      .slice(0, 5);
  }, [referrals]);

  // ================= EARLY RETURNS LAST =================

  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading referral stats...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load referral statistics
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Referral Analytics 📊" />

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Referrals</p>
          <h2 className="text-2xl font-bold">
            {statsData.totalReferrals ?? referrals.length}
          </h2>
        </div>

        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <h2 className="text-2xl font-bold">
            ₦{Number(statsData.totalEarnings).toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Conversion Rate</p>
          <h2 className="text-2xl font-bold">
            {statsData.conversionRate}%
          </h2>
        </div>

        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Clicks</p>
          <h2 className="text-2xl font-bold">
            {statsData.clicks}
          </h2>
        </div>
      </div>

      {/* SECONDARY METRICS */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <h3 className="font-semibold mb-2">
            Avg Spent per Referral
          </h3>

          <p className="text-xl font-bold">
            ₦{stats.avgSpentPerReferral.toLocaleString()}
          </p>
        </div>

        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <h3 className="font-semibold mb-2">
            Avg Orders per Referral
          </h3>

          <p className="text-xl font-bold">
            {stats.avgOrdersPerReferral.toFixed(2)}
          </p>
        </div>
      </div>

      {/* TOP REFERRALS */}
      <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
        <div className="p-4 font-semibold bg-gray-100">
          Top Performing Referrals 🏆
        </div>

        <div className="divide-y">
          {topReferrals.length > 0 ? (
            topReferrals.map((r) => (
              <div
                key={r.id}
                className="p-4 flex justify-between text-sm hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">
                    {r.customerName}
                  </p>

                  <p className="text-gray-500 text-xs">
                    Joined{" "}
                    {r.joinedAt
                      ? new Date(r.joinedAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="text-right">
                  <p>Orders: {r.totalOrders ?? 0}</p>
                  <p className="font-semibold">
                    ₦{Number(r.totalSpent ?? 0).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No referrals available
            </div>
          )}
        </div>
      </div>

      {/* INSIGHT */}
      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <h3 className="font-semibold mb-2">Insight 💡</h3>

        <p className="text-sm text-gray-600 leading-6">
          Your highest-performing referrals generate the biggest spending
          customers. Focus on channels and audiences similar to your best
          converters.
        </p>
      </div>
    </div>
  );
}