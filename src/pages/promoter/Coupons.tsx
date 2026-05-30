

import { useMemo } from "react";

import { useCoupons } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

import type { Coupon } from "../../types/promoter.types";

export default function Coupons() {
  const { data, isLoading, isError } = useCoupons();

  /**
   * SAFE DEFAULT
   */
  const coupons: Coupon[] = data ?? [];

  /**
   * MUST RUN BEFORE RETURNS
   */
  const stats = useMemo(() => {
    const now = Date.now();

    const activeCoupons = coupons.filter((c) =>
      new Date(c.expiresAt ?? 0).getTime() > now
    );

    const expiredCoupons = coupons.filter((c) =>
      new Date(c.expiresAt ?? 0).getTime() <= now
    );

    const totalUsage = coupons.reduce(
      (sum, c) => sum + (c.usageCount || 0),
      0
    );

    return {
      activeCount: activeCoupons.length,
      expiredCount: expiredCoupons.length,
      totalUsage,
    };
  }, [coupons]);

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading coupons...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load coupons
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Coupons 🎟️" />

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">Total Coupons</p>
          <h2 className="text-xl font-bold">{coupons.length}</h2>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">Active Coupons</p>
          <h2 className="text-xl font-bold text-green-600">
            {stats.activeCount}
          </h2>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">Total Usage</p>
          <h2 className="text-xl font-bold">
            {stats.totalUsage}
          </h2>
        </div>
      </div>

      {/* COUPON LIST */}
      <div className="border rounded-xl overflow-hidden bg-white">
        <div className="grid grid-cols-5 p-3 bg-gray-100 text-sm font-semibold">
          <span>Code</span>
          <span>Discount</span>
          <span>Usage</span>
          <span>Expiry</span>
          <span>Status</span>
        </div>

        {coupons.map((c: Coupon) => {
          const isExpired =
            new Date(c.expiresAt ?? 0).getTime() <= Date.now();

          return (
            <div
              key={c.id}
              className="grid grid-cols-5 p-3 text-sm border-t hover:bg-gray-50"
            >
              <span className="font-semibold">{c.code}</span>
              <span>{c.discount}%</span>
              <span>{c.usageCount}</span>
              <span>
                {c.expiresAt
                  ? new Date(c.expiresAt).toLocaleDateString()
                  : "N/A"}
              </span>

              <span
                className={`font-medium ${
                  isExpired ? "text-red-500" : "text-green-600"
                }`}
              >
                {isExpired ? "Expired" : "Active"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}