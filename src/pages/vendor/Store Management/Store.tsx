

import { useState } from "react";

import { PageHeader } from "../../../components/ui/PageHeader"; 

import { StatCard } from "../../../components/ui/StatCard"; 

import { SectionCard } from "../../../components/ui/SectionCard"; 
import { useVendorStore } from "../../../hooks/vendor/useVendorStore"; 

import { updateVendorStore } from "../../../services/vendor/vendor.service";

export default function Store() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorStore();

  const [form, setForm] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] =
    useState(false);

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>

        <div className="h-80 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load store data.
      </div>
    );
  }

  const { store, stats } = data;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Store Settings"
        subtitle="Manage your store profile and branding"
      />

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Sales"
          value={`₦${stats.totalSales.toLocaleString()}`}
        />

        <StatCard
          title="Orders"
          value={stats.totalOrders}
        />

        <StatCard
          title="Rating"
          value={stats.rating}
        />

        <StatCard
          title="Followers"
          value={stats.followers}
        />
      </div>

      {/* STORE FORM */}

      <SectionCard title="Store Information">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border px-3 py-2 rounded"
            placeholder="Store Name"
            defaultValue={store.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="border px-3 py-2 rounded"
            placeholder="Email"
            defaultValue={store.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            className="border px-3 py-2 rounded"
            placeholder="Phone"
            defaultValue={store.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <input
            className="border px-3 py-2 rounded"
            placeholder="Address"
            defaultValue={store.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
          />

          <textarea
            className="border px-3 py-2 rounded md:col-span-2"
            placeholder="Description"
            defaultValue={store.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={async () => {
            setLoading(true);

            await updateVendorStore(form);

            setLoading(false);

            window.location.reload();
          }}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          {loading
            ? "Saving..."
            : "Update Store"}
        </button>
      </SectionCard>

      {/* STORE STATUS */}

      <SectionCard title="Store Status">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Current status:
            <span
              className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                store.status ===
                "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {store.status}
            </span>
          </p>

          <button className="px-4 py-2 border rounded">
            Toggle Status
          </button>
        </div>
      </SectionCard>
    </div>
  );
}