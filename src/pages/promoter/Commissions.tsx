
import { useMemo } from "react";
import { useCommissions } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

/* ================= TYPES ================= */
type Commission = {
  id: string;
  productTitle?: string;
  orderId: string;
  amount: number;
  status: "pending" | "paid";
  createdAt?: string;
};

export default function Commissions() {
  const { data, isLoading, isError } = useCommissions();

  const commissions: Commission[] = Array.isArray(data) ? data : [];

  /* ================= DERIVED DATA ================= */
  const summary = useMemo(() => {
    const pending = commissions.filter((c) => c.status === "pending").length;
    const paid = commissions.filter((c) => c.status === "paid").length;

    return {
      total: commissions.length,
      pending,
      paid,
    };
  }, [commissions]);

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading commissions...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load commissions</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Commissions" />

      {/* ================= SUMMARY ================= */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Commissions</p>
          <h2 className="text-2xl font-bold">{summary.total}</h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">
            {summary.pending}
          </h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Paid</p>
          <h2 className="text-2xl font-bold text-green-600">
            {summary.paid}
          </h2>
        </div>
      </div>

      {/* ================= LIST ================= */}
      <div className="border rounded-xl p-4">
        <h2 className="font-semibold mb-4">Commission History</h2>

        {commissions.length === 0 ? (
          <p className="text-sm text-gray-500">No commissions found</p>
        ) : (
          <div className="space-y-3">
            {commissions.map((c) => (
              <div
                key={c.id}
                className="flex justify-between items-center border-b py-3"
              >
                {/* LEFT */}
                <div>
                  <p className="text-sm font-medium">
                    {c.productTitle ?? "Product Sale"}
                  </p>

                  <p className="text-xs text-gray-500">
                    Order ID: {c.orderId}
                  </p>

                  <p className="text-xs text-gray-400">
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleString()
                      : "—"}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    +₦{(c.amount ?? 0).toLocaleString()}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      c.status === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {c.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}