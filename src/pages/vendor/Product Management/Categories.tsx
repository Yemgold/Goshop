

import { useState } from "react";

import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";

import { useVendorCategories } from "../../../hooks/vendor/useVendorCategories";
import { createCategory } from "../../../services/vendor/vendor.service";

export default function Categories() {
  const { data, isLoading, isError } =
    useVendorCategories();

  const [name, setName] = useState("");

  const [loadingCreate, setLoadingCreate] =
    useState(false);

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto space-y-4">
        <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded" />
        <div className="h-40 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load categories.
      </div>
    );
  }

  const handleCreate = async () => {
    if (!name) return;

    setLoadingCreate(true);

    await createCategory(name);

    setName("");

    setLoadingCreate(false);

    window.location.reload(); // simple refresh
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="Vendor Categories"
        subtitle="Manage product categories"
      />

      {/* CREATE CATEGORY */}
      <SectionCard title="Create Category">
        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Category name"
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleCreate}
            disabled={loadingCreate}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {loadingCreate
              ? "Creating..."
              : "Create"}
          </button>
        </div>
      </SectionCard>

      {/* LIST CATEGORIES */}
      <SectionCard title="All Categories">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="py-3">Name</th>
                <th className="py-3">
                  Products
                </th>
                <th className="py-3">Sales</th>
                <th className="py-3">
                  Created
                </th>
              </tr>
            </thead>

            <tbody>
              {data.categories.map(
                (cat) => (
                  <tr
                    key={cat.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {cat.name}
                    </td>

                    <td className="py-4">
                      {cat.productCount}
                    </td>

                    <td className="py-4">
                      ₦
                      {cat.totalSales.toLocaleString()}
                    </td>

                    <td className="py-4">
                      {cat.createdAt}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}