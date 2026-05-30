

import { usePayouts } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

export default function PromoterPayouts() {
  const { data, isLoading, isError } = usePayouts();

  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading payouts...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load payouts
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Payouts" />

      {/* ================= SUMMARY ================= */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Payouts</p>
          <h2 className="text-2xl font-bold">
            {data.length}
          </h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <h2 className="text-2xl font-bold text-green-600">
            {
              data.filter(
                (p: any) => p.status === "completed"
              ).length
            }
          </h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">
            {
              data.filter(
                (p: any) => p.status === "pending"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* ================= LIST ================= */}
      <div className="border rounded-xl p-4">
        <h2 className="font-semibold mb-4">
          Payout History
        </h2>

        {data.length === 0 ? (
          <p className="text-sm text-gray-500">
            No payouts available
          </p>
        ) : (
          <div className="space-y-3">
            {data.map((payout: any) => (
              <div
                key={payout.id}
                className="flex justify-between items-center border-b py-3"
              >
                {/* LEFT SIDE */}
                <div>
                  <p className="text-sm font-medium">
                    {payout.method?.toUpperCase() ||
                      "BANK TRANSFER"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {payout.accountName || "N/A"}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(
                      payout.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="text-right">
                  <p className="font-semibold">
                    ₦{payout.amount.toLocaleString()}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      payout.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : payout.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {payout.status?.toUpperCase()}
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