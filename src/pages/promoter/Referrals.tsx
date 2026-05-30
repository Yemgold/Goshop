

import { useMemo, useState } from "react";

import { useReferrals } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

import type { Referral } from "../../types/promoter.types";

type FilterType = "all" | "active" | "inactive";

export default function Referrals() {
  const { data, isLoading, isError } = useReferrals();
  const [filter, setFilter] = useState<FilterType>("all");

  /**
   * ================= SAFE DATA NORMALIZATION =================
   */
  const referrals: Referral[] = Array.isArray(data) ? data : [];

  /**
   * ================= DERIVED STATE (HOOKS ALWAYS RUN) =================
   */
  const filteredReferrals = useMemo(() => {
    if (filter === "all") return referrals;

    return referrals.filter((r) => {
      if (filter === "active") return r.totalOrders > 0;
      if (filter === "inactive") return r.totalOrders === 0;
      return true;
    });
  }, [filter, referrals]);

  const totalSpent = useMemo(() => {
    return referrals.reduce((sum, r) => sum + (r.totalSpent ?? 0), 0);
  }, [referrals]);

  const totalOrders = useMemo(() => {
    return referrals.reduce((sum, r) => sum + (r.totalOrders ?? 0), 0);
  }, [referrals]);

  /**
   * ================= UI STATES (AFTER HOOKS) =================
   */
  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading referrals...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load referrals
      </div>
    );
  }

  /**
   * ================= UI =================
   */
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="My Referrals 👥" />

      {/* FILTERS */}
      <div className="flex gap-2">
        {(["all", "active", "inactive"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full border text-sm ${
              filter === f ? "bg-black text-white" : "bg-white"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">Total Referrals</p>
          <h2 className="text-xl font-bold">{referrals.length}</h2>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="text-xl font-bold">{totalOrders}</h2>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm text-gray-500">Total Spent</p>
          <h2 className="text-xl font-bold">
            ₦{totalSpent.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* LIST */}
      <div className="border rounded-xl bg-white overflow-hidden">
        <div className="grid grid-cols-4 p-3 bg-gray-100 text-sm font-semibold">
          <span>Name</span>
          <span>Joined</span>
          <span>Orders</span>
          <span>Total Spent</span>
        </div>

        {filteredReferrals.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">
            No referrals found
          </div>
        ) : (
          filteredReferrals.map((r) => (
            <div
              key={r.id}
              className="grid grid-cols-4 p-3 text-sm border-t hover:bg-gray-50"
            >
              <span className="font-medium">{r.customerName}</span>
              <span>
                {new Date(r.joinedAt).toLocaleDateString()}
              </span>
              <span>{r.totalOrders}</span>
              <span>₦{r.totalSpent.toLocaleString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}