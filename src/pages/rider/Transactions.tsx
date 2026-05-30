// src/pages/rider/Transactions.tsx


import { useRiderTransactions } from "../../hooks/rider/useRiderTransactions";
import { ArrowDownUp, Wallet, CreditCard } from "lucide-react";

export default function RiderTransactions() {
  const { data, isLoading, isError } = useRiderTransactions();

  /* =========================
     LOADING
  ========================= */
  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <div className="h-10 w-64 bg-gray-100 rounded-xl animate-pulse" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 rounded-2xl animate-pulse" />
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
          <h2 className="text-xl font-bold">Failed to load transactions</h2>
          <p className="text-gray-500 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const totalEarned =
    data?.reduce((sum, t) => (t.type === "earnings" ? sum + t.amount : sum), 0) || 0;

  const totalPayout =
    data?.reduce((sum, t) => (t.type === "payout" ? sum + t.amount : sum), 0) || 0;

  /* =========================
     UI
  ========================= */
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-sm text-gray-500">
          Track all your earnings and payouts
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Earned</p>
              <h2 className="text-2xl font-bold">
                ₦{totalEarned.toLocaleString()}
              </h2>
            </div>
            <Wallet className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Payouts</p>
              <h2 className="text-2xl font-bold">
                ₦{totalPayout.toLocaleString()}
              </h2>
            </div>
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Transactions</p>
              <h2 className="text-2xl font-bold">
                {data?.length || 0}
              </h2>
            </div>
            <ArrowDownUp className="w-6 h-6 text-gray-600" />
          </div>
        </div>

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {!data || data.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No transactions yet
          </div>
        ) : (
          data.map((tx) => (
            <div
              key={tx.id}
              className="bg-white border rounded-2xl p-5 shadow-sm flex items-center justify-between"
            >

              <div>
                <h2 className="font-semibold capitalize">
                  {tx.type}
                </h2>
                <p className="text-sm text-gray-500">
                  {tx.date}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-bold ${
                    tx.type === "earnings"
                      ? "text-green-600"
                      : tx.type === "payout"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  ₦{tx.amount.toLocaleString()}
                </p>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}