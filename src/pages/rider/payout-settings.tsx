

import { Wallet } from "lucide-react";

export default function RiderPayoutSettings() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">Payout Settings</h1>

      <div className="bg-white border rounded-2xl p-5 space-y-4">

        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          <p className="font-medium">Bank Account Details</p>
        </div>

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Bank Name"
        />

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Account Number"
        />

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Account Name"
        />

        <button className="w-full bg-black text-white py-3 rounded-xl">
          Save Payout Settings
        </button>

      </div>

    </div>
  );
}