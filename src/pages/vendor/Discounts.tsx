

import { useState } from "react";

import { PageHeader } from "../../components/ui/PageHeader";
import { SectionCard } from "../../components/ui/SectionCard";

import { useVendorDiscounts } from "../../hooks/vendor/useVendorDiscounts";
import {
  createDiscount,
  toggleDiscountStatus,
} from "../../services/vendor/vendor.service";

export default function Discounts() {
  const { data, isLoading, isError } =
    useVendorDiscounts();

  const [form, setForm] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: 0,
    usageLimit: 0,
    expiresAt: "",
  });

  const [loadingCreate, setLoadingCreate] =
    useState(false);

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded" />
        <div className="h-60 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load discounts.
      </div>
    );
  }

  const handleCreate = async () => {
    setLoadingCreate(true);

    await createDiscount(form);

    setLoadingCreate(false);

    window.location.reload();
  };

  const handleToggle = async (id: string) => {
    await toggleDiscountStatus(id);
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="Vendor Discounts"
        subtitle="Manage coupons and promotional offers"
      />

      {/* CREATE DISCOUNT */}
      <SectionCard title="Create Discount">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            placeholder="Code (e.g SAVE10)"
            className="border p-2 rounded"
            value={form.code}
            onChange={(e) =>
              setForm({
                ...form,
                code: e.target.value,
              })
            }
          />

          <select
            className="border p-2 rounded"
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value as any,
              })
            }
          >
            <option value="percentage">
              Percentage
            </option>
            <option value="fixed">
              Fixed Amount
            </option>
          </select>

          <input
            type="number"
            placeholder="Value"
            className="border p-2 rounded"
            value={form.value}
            onChange={(e) =>
              setForm({
                ...form,
                value: Number(e.target.value),
              })
            }
          />

          <input
            type="number"
            placeholder="Usage Limit"
            className="border p-2 rounded"
            value={form.usageLimit}
            onChange={(e) =>
              setForm({
                ...form,
                usageLimit: Number(
                  e.target.value
                ),
              })
            }
          />

          <input
            type="date"
            className="border p-2 rounded"
            value={form.expiresAt}
            onChange={(e) =>
              setForm({
                ...form,
                expiresAt: e.target.value,
              })
            }
          />

          <button
            onClick={handleCreate}
            disabled={loadingCreate}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {loadingCreate
              ? "Creating..."
              : "Create Discount"}
          </button>
        </div>
      </SectionCard>

      {/* LIST DISCOUNTS */}
      <SectionCard title="All Discounts">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="py-3">Code</th>
                <th className="py-3">Type</th>
                <th className="py-3">Value</th>
                <th className="py-3">Usage</th>
                <th className="py-3">Status</th>
                <th className="py-3">Expires</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.discounts.map((d) => (
                <tr
                  key={d.id}
                  className="border-b"
                >
                  <td className="py-4 font-medium">
                    {d.code}
                  </td>

                  <td className="py-4 capitalize">
                    {d.type}
                  </td>

                  <td className="py-4">
                    {d.type === "percentage"
                      ? `${d.value}%`
                      : `₦${d.value}`}
                  </td>

                  <td className="py-4">
                    {d.used}/{d.usageLimit}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        d.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {d.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="py-4">
                    {d.expiresAt}
                  </td>

                  <td className="py-4">
                    <button
                      onClick={() =>
                        handleToggle(d.id)
                      }
                      className="text-sm px-3 py-1 border rounded"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}