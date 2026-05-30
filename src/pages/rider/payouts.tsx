


// src/pages/rider/Payouts.tsx

// src/pages/rider/Payouts.tsx

import {
  Wallet,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { useRiderPayouts } from "../../hooks/rider/useRiderPayouts";

export default function RiderPayouts() {
  const { data, isLoading, isError } = useRiderPayouts();

  /* =========================
     LOADING
  ========================= */
  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <div className="h-10 w-64 bg-gray-100 rounded-xl animate-pulse" />
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-100 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */
  if (isError) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <div className="bg-white border rounded-3xl p-10">
          <h2 className="text-xl font-bold">
            Failed to load payouts
          </h2>
          <p className="text-gray-500 mt-2">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  const totalPaid =
    data?.reduce((sum, p) => (p.status === "completed" ? sum + p.amount : sum), 0) || 0;

  const pending =
    data?.filter((p) => p.status === "pending").length || 0;

  const failed =
    data?.filter((p) => p.status === "failed").length || 0;

  /* =========================
     UI
  ========================= */
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Payouts</h1>
        <p className="text-sm text-gray-500">
          Track your earnings withdrawals
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Paid</p>
              <h2 className="text-2xl font-bold">
                ₦{totalPaid.toLocaleString()}
              </h2>
            </div>
            <Wallet className="w-6 h-6 text-gray-600" />
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <h2 className="text-2xl font-bold">{pending}</h2>
            </div>
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Failed</p>
              <h2 className="text-2xl font-bold">{failed}</h2>
            </div>
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
        </div>

      </div>

      {/* LIST */}
      <div className="space-y-4">

        {!data || data.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No payouts found
          </div>
        ) : (
          data.map((payout) => (
            <div
              key={payout.id}
              className="bg-white border rounded-2xl p-5 shadow-sm"
            >

              <div className="flex items-start justify-between">

                <div>
                  <h2 className="font-semibold">
                    Payout #{payout.id}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {payout.date}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    payout.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : payout.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {payout.status}
                </span>

              </div>

              <div className="mt-3 text-lg font-bold">
                ₦{payout.amount.toLocaleString()}
              </div>

              {/* STATUS ICON INDICATOR */}
              <div className="mt-3 flex items-center gap-2 text-sm">

                {payout.status === "completed" && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    Completed
                  </div>
                )}

                {payout.status === "pending" && (
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Clock className="w-4 h-4" />
                    Processing
                  </div>
                )}

                {payout.status === "failed" && (
                  <div className="flex items-center gap-1 text-red-600">
                    <XCircle className="w-4 h-4" />
                    Failed
                  </div>
                )}

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}