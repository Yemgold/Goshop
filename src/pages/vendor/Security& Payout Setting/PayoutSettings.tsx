

import { useState } from "react";

import { PageHeader } from "../../../components/ui/PageHeader"; 

import { SectionCard } from "../../../components/ui/SectionCard"; 
import { useVendorPayoutSettings } from "../../../hooks/vendor/useVendorPayoutSettings"; 

import { updateVendorPayoutSettings } from "../../../services/vendor/vendor.service";

export default function PayoutSettings() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorPayoutSettings();

  const [form, setForm] = useState<any>({});

  const [loading, setLoading] =
    useState(false);

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gray-200 animate-pulse rounded" />
        <div className="h-64 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load payout settings.
      </div>
    );
  }

  const settings = data.payoutSettings;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <PageHeader
        title="Payout Settings"
        subtitle="Configure withdrawal rules and bank details"
      />

      <SectionCard title="Bank Details">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border px-3 py-2 rounded"
            defaultValue={
              settings.defaultBank
            }
            onChange={(e) =>
              setForm({
                ...form,
                defaultBank:
                  e.target.value,
              })
            }
          />

          <input
            className="border px-3 py-2 rounded"
            defaultValue={
              settings.accountNumber
            }
            onChange={(e) =>
              setForm({
                ...form,
                accountNumber:
                  e.target.value,
              })
            }
          />
        </div>
      </SectionCard>

      <SectionCard title="Payout Rules">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="number"
            className="border px-3 py-2 rounded"
            defaultValue={
              settings.minPayoutAmount
            }
            onChange={(e) =>
              setForm({
                ...form,
                minPayoutAmount:
                  Number(
                    e.target.value
                  ),
              })
            }
          />

          <select
            className="border px-3 py-2 rounded"
            defaultValue={
              settings.payoutSchedule
            }
            onChange={(e) =>
              setForm({
                ...form,
                payoutSchedule:
                  e.target.value,
              })
            }
          >
            <option value="daily">
              Daily
            </option>
            <option value="weekly">
              Weekly
            </option>
            <option value="monthly">
              Monthly
            </option>
          </select>
        </div>

        <label className="flex items-center justify-between mt-4">
          <span>Require OTP for payout</span>

          <input
            type="checkbox"
            defaultChecked={
              settings.requireOtp
            }
            onChange={(e) =>
              setForm({
                ...form,
                requireOtp:
                  e.target.checked,
              })
            }
          />
        </label>
      </SectionCard>

      <button
        onClick={async () => {
          setLoading(true);

          await updateVendorPayoutSettings(
            form
          );

          setLoading(false);

          window.location.reload();
        }}
        className="bg-black text-white px-5 py-2 rounded"
      >
        {loading
          ? "Saving..."
          : "Save Settings"}
      </button>
    </div>
  );
}