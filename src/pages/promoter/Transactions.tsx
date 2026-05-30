

import { useMemo } from "react";
import { useTransactions } from "../../hooks/promoter/promoter.hooks";
import { PageHeader } from "../../components/ui/PageHeader";

type Transaction = {
  id: string;
  description?: string;
  createdAt?: string;
  amount?: number;
  type?: "credit" | "debit";
};

export default function PrormoterTransactions() {
  const { data, isLoading, isError } = useTransactions();

  const transactions: Transaction[] = Array.isArray(data)
    ? data
    : [];

  /* ================= DERIVED STATS ================= */
  const stats = useMemo(() => {
    const credits = transactions.filter(
      (t) => t.type === "credit"
    ).length;

    const debits = transactions.filter(
      (t) => t.type === "debit"
    ).length;

    return {
      credits,
      debits,
      total: transactions.length,
    };
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading transactions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load transactions
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Transactions" />

      {/* ================= SUMMARY ================= */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Total Transactions
          </p>
          <h2 className="text-2xl font-bold">
            {stats.total}
          </h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Credits
          </p>
          <h2 className="text-2xl font-bold text-green-600">
            {stats.credits}
          </h2>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Debits
          </p>
          <h2 className="text-2xl font-bold text-red-500">
            {stats.debits}
          </h2>
        </div>
      </div>

      {/* ================= LIST ================= */}
      <div className="border rounded-xl p-4">
        <h2 className="font-semibold mb-4">
          Transaction History
        </h2>

        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">
            No transactions found
          </p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center border-b py-3"
              >
                {/* LEFT */}
                <div>
                  <p className="text-sm font-medium">
                    {tx.description ?? "Transaction"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {tx.createdAt
                      ? new Date(
                          tx.createdAt
                        ).toLocaleString()
                      : "No date"}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      tx.type === "credit"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "-"}
                    ₦
                    {Number(
                      tx.amount ?? 0
                    ).toLocaleString()}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      tx.type === "credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {(tx.type ?? "debit").toUpperCase()}
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