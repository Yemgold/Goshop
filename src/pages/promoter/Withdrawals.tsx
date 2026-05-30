


import { useState } from "react";
import { toast } from "react-toastify";

import {
  usePayouts,
  useWithdrawal,
} from "../../hooks/promoter/promoter.hooks";

import { PageHeader } from "../../components/ui/PageHeader";

type WithdrawalMethod = "bank" | "wallet";

export default function Withdrawals() {
  const { data: payouts, isLoading, isError } = usePayouts();
  const withdrawalMutation = useWithdrawal();

  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<WithdrawalMethod>("bank");

  const handleWithdraw = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      await withdrawalMutation.mutateAsync({
        amount,
        bankName: "",
        accountNumber: "",
        accountName: "",
      });

      toast.success("Withdrawal request submitted");
      setAmount(0);
    } catch {
      toast.error("Failed to request withdrawal");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Withdrawals" />

      {/* ================= REQUEST FORM ================= */}
      <div className="border rounded-xl p-4 space-y-4">
        <h2 className="font-semibold">Request Withdrawal</h2>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border p-3 rounded-lg"
        />

        {/* METHOD SELECT */}
        <div className="flex gap-2">
          <button
            onClick={() => setMethod("bank")}
            className={`px-3 py-2 rounded-lg border ${
              method === "bank" ? "bg-black text-white" : ""
            }`}
          >
            Bank Transfer
          </button>

          <button
            onClick={() => setMethod("wallet")}
            className={`px-3 py-2 rounded-lg border ${
              method === "wallet" ? "bg-black text-white" : ""
            }`}
          >
            Wallet
          </button>
        </div>

        <button
          onClick={handleWithdraw}
          disabled={withdrawalMutation.isPending}
          className={`w-full py-3 rounded-lg text-white ${
            withdrawalMutation.isPending ? "bg-gray-400" : "bg-black"
          }`}
        >
          {withdrawalMutation.isPending
            ? "Processing..."
            : "Request Withdrawal"}
        </button>
      </div>

      {/* ================= HISTORY ================= */}
      <div className="border rounded-xl p-4">
        <h2 className="font-semibold mb-3">Withdrawal History</h2>

        {isLoading ? (
          <p className="text-gray-500">Loading payouts...</p>
        ) : isError || !payouts ? (
          <p className="text-red-500">Failed to load payouts</p>
        ) : payouts.length === 0 ? (
          <p className="text-gray-500">No withdrawals yet</p>
        ) : (
          <div className="space-y-3">
            {payouts.map((payout: any) => (
              <div
                key={payout.id}
                className="flex justify-between border-b py-2"
              >
                <div>
                  <p className="text-sm font-medium">
                    {payout.method?.toUpperCase() ?? "BANK"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {payout.createdAt
                      ? new Date(payout.createdAt).toLocaleDateString()
                      : "—"}
                  </p>
                </div>

                <div
                  className={`font-semibold ${
                    payout.status === "completed"
                      ? "text-green-600"
                      : payout.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  ₦{(payout.amount ?? 0).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}