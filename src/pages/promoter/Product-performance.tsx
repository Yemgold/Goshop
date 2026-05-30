


import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "../../components/ui/PageHeader";
import { useProductPerformance } from "../../hooks/promoter/promoter.hooks";

import type { PromoterProductPerformance } from "../../types/promoter.types";

export default function PromoterProductPerformance() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProductPerformance();

  /**
   * ================= SAFE DATA =================
   */
  const performanceData: PromoterProductPerformance[] = Array.isArray(data)
    ? data
    : [];

  /**
   * ================= DERIVED STATE =================
   */
  const sortedPerformance = useMemo(() => {
    return [...performanceData].sort((a, b) => {
      return (b.sales ?? 0) - (a.sales ?? 0);
    });
  }, [performanceData]);

  /**
   * ================= UI STATES (AFTER HOOKS) =================
   */
  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading product performance...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load product performance
      </div>
    );
  }

  /**
   * ================= UI =================
   */
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Product Performance 📈" />

      <div className="border rounded-xl overflow-hidden bg-white">
        <div className="grid grid-cols-4 p-3 bg-gray-100 font-semibold text-sm">
          <span>Product</span>
          <span>Sales</span>
          <span>Revenue</span>
          <span>Commission</span>
        </div>

        {sortedPerformance.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No product performance data available
          </div>
        ) : (
          sortedPerformance.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 p-3 border-t text-sm hover:bg-gray-50"
            >
              <span className="font-medium">{item.productTitle}</span>
              <span>{item.sales ?? 0}</span>
              <span>₦{(item.revenue ?? 0).toLocaleString()}</span>
              <span className="font-semibold text-green-600">
                ₦{(item.commissionEarned ?? 0).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => navigate("/promoter/dashboard")}
        className="px-4 py-2 rounded-lg bg-black text-white"
      >
        Back
      </button>
    </div>
  );
}