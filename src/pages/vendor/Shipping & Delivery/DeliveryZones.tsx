

import { useState } from "react";

import { PageHeader } from "../../../components/ui/PageHeader"; 

import { SectionCard } from "../../../components/ui/SectionCard"; 

import { StatCard } from "../../../components/ui/StatCard";

import { useVendorDeliveryZones } from "../../../hooks/vendor/useVendorDeliveryZones"; 

import { createDeliveryZone, toggleDeliveryZone, } from "../../../services/vendor/vendor.service"; 

export default function DeliveryZones() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorDeliveryZones();

  const [creating, setCreating] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    states: "",
    deliveryFee: 0,
    estimatedDays: "",
  });

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="h-80 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load delivery zones.
      </div>
    );
  }

  /* ================= SUMMARY ================= */

  const activeZones =
    data.zones.filter(
      (z) => z.isActive
    ).length;

  const inactiveZones =
    data.zones.filter(
      (z) => !z.isActive
    ).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Delivery Zones"
        subtitle="Manage delivery coverage and shipping regions"
      />

      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Zones"
          value={data.zones.length}
        />

        <StatCard
          title="Active Zones"
          value={activeZones}
        />

        <StatCard
          title="Inactive Zones"
          value={inactiveZones}
        />
      </div>

      {/* CREATE ZONE */}

      <SectionCard title="Create Delivery Zone">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Zone Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="border rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Areas (comma separated)"
            value={form.states}
            onChange={(e) =>
              setForm({
                ...form,
                states: e.target.value,
              })
            }
            className="border rounded px-3 py-2"
          />

          <input
            type="number"
            placeholder="Delivery Fee"
            value={form.deliveryFee}
            onChange={(e) =>
              setForm({
                ...form,
                deliveryFee: Number(
                  e.target.value
                ),
              })
            }
            className="border rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Estimated Delivery"
            value={form.estimatedDays}
            onChange={(e) =>
              setForm({
                ...form,
                estimatedDays:
                  e.target.value,
              })
            }
            className="border rounded px-3 py-2"
          />
        </div>

        <button
          onClick={async () => {
            setCreating(true);

            await createDeliveryZone({
              name: form.name,
              states:
                form.states.split(","),
              deliveryFee:
                form.deliveryFee,
              estimatedDays:
                form.estimatedDays,
            });

            setCreating(false);

            window.location.reload();
          }}
          disabled={creating}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          {creating
            ? "Creating..."
            : "Create Zone"}
        </button>
      </SectionCard>

      {/* ZONES TABLE */}

      <SectionCard title="Delivery Zones">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Zone
                </th>

                <th className="py-3">
                  Areas
                </th>

                <th className="py-3">
                  Delivery Fee
                </th>

                <th className="py-3">
                  ETA
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  Created
                </th>

                <th className="py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data.zones.map((zone) => (
                <tr
                  key={zone.id}
                  className="border-b"
                >
                  <td className="py-4 font-medium">
                    {zone.name}
                  </td>

                  <td className="py-4">
                    {zone.states.join(
                      ", "
                    )}
                  </td>

                  <td className="py-4">
                    ₦
                    {zone.deliveryFee.toLocaleString()}
                  </td>

                  <td className="py-4">
                    {
                      zone.estimatedDays
                    }
                  </td>

                  {/* STATUS */}

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        zone.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {zone.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="py-4">
                    {zone.createdAt}
                  </td>

                  {/* ACTION */}

                  <td className="py-4">
                    <button
                      onClick={async () => {
                        await toggleDeliveryZone(
                          zone.id
                        );

                        window.location.reload();
                      }}
                      className="border px-3 py-1 rounded text-sm"
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