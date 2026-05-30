

import { useState } from "react";

import { PageHeader } from "../../../components/ui/PageHeader";

import { SectionCard } from "../../../components/ui/SectionCard";

import { useVendorStoreSettings } from "../../../hooks/vendor/useVendorStoreSettings";

import { updateVendorStoreSettings } from "../../../services/vendor/vendor.service";

export default function StoreSettings() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorStoreSettings();

  const [form, setForm] = useState<any>({});

  const [loading, setLoading] =
    useState(false);

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load store settings.
      </div>
    );
  }

  const settings = data.settings;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Store Settings"
        subtitle="Configure store rules and system behavior"
      />

      {/* SETTINGS FORM */}

      <SectionCard title="General Settings">
        <div className="grid md:grid-cols-2 gap-4">
          <select
            className="border px-3 py-2 rounded"
            defaultValue={
              settings.currency
            }
            onChange={(e) =>
              setForm({
                ...form,
                currency:
                  e.target.value,
              })
            }
          >
            <option value="NGN">
              NGN
            </option>
            <option value="USD">
              USD
            </option>
            <option value="EUR">
              EUR
            </option>
          </select>

          <input
            type="text"
            className="border px-3 py-2 rounded"
            defaultValue={
              settings.timezone
            }
            onChange={(e) =>
              setForm({
                ...form,
                timezone:
                  e.target.value,
              })
            }
          />
        </div>
      </SectionCard>

      {/* NOTIFICATIONS */}

      <SectionCard title="Notifications">
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span>
              Email Notifications
            </span>

            <input
              type="checkbox"
              defaultChecked={
                settings.emailNotifications
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  emailNotifications:
                    e.target.checked,
                })
              }
            />
          </label>

          <label className="flex items-center justify-between">
            <span>
              SMS Notifications
            </span>

            <input
              type="checkbox"
              defaultChecked={
                settings.smsNotifications
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  smsNotifications:
                    e.target.checked,
                })
              }
            />
          </label>
        </div>
      </SectionCard>

      {/* ORDER RULES */}

      <SectionCard title="Order Rules">
        <div className="grid md:grid-cols-2 gap-4">
          <label>
            Minimum Order Amount
            <input
              type="number"
              className="border px-3 py-2 rounded w-full"
              defaultValue={
                settings.minimumOrderAmount
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  minimumOrderAmount:
                    Number(
                      e.target.value
                    ),
                })
              }
            />
          </label>

          <label>
            Maximum Order Limit
            <input
              type="number"
              className="border px-3 py-2 rounded w-full"
              defaultValue={
                settings.maxOrderLimit
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  maxOrderLimit:
                    Number(
                      e.target.value
                    ),
                })
              }
            />
          </label>
        </div>
      </SectionCard>

      {/* AUTOMATION */}

      <SectionCard title="Automation">
        <label className="flex items-center justify-between">
          <span>Auto Accept Orders</span>

          <input
            type="checkbox"
            defaultChecked={
              settings.autoAcceptOrders
            }
            onChange={(e) =>
              setForm({
                ...form,
                autoAcceptOrders:
                  e.target.checked,
              })
            }
          />
        </label>
      </SectionCard>

      {/* SAVE BUTTON */}

      <button
        onClick={async () => {
          setLoading(true);

          await updateVendorStoreSettings(
            form
          );

          setLoading(false);

          window.location.reload();
        }}
        className="bg-black text-white px-5 py-2 rounded mt-4"
      >
        {loading
          ? "Saving..."
          : "Save Settings"}
      </button>
    </div>
  );
}