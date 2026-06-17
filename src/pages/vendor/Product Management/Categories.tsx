import { useState } from "react";

import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";

import { useVendorCategories } from "../../../hooks/vendor/useVendorCategories";
import { createCategory } from "../../../services/vendor/vendor.service";

export default function Categories() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useVendorCategories();

  const [name, setName] = useState("");

  const [loadingCreate, setLoadingCreate] =
    useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      setLoadingCreate(true);

      await createCategory(name);

      setName("");

      await refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCreate(false);
    }
  };

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />

        <div className="h-40 bg-gray-200 rounded-2xl animate-pulse" />

        <div className="h-72 bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white border rounded-2xl p-10 text-center">

          <div className="text-6xl mb-4">
            ⚠️
          </div>

          <h2 className="text-xl font-semibold mb-2">
            Unable to Load Categories
          </h2>

          <p className="text-gray-500 mb-6">
            The server is currently unavailable
            or your internet connection may
            be unstable.
          </p>

          <button
            onClick={() => refetch()}
            className="px-5 py-2 rounded-lg bg-black text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ================= FALLBACK ================= */

  if (!data) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white border rounded-2xl p-10 text-center">

          <div className="text-6xl mb-4">
            📡
          </div>

          <h2 className="text-xl font-semibold">
            No Data Available
          </h2>

          <p className="text-gray-500 mt-2">
            We could not retrieve category
            information at this time.
          </p>
        </div>
      </div>
    );
  }

  const categories = data.categories ?? [];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      <PageHeader
        title="Vendor Categories"
        subtitle="Manage product categories and organize your inventory."
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
            className="border p-3 rounded-lg w-full"
          />

          <button
            onClick={handleCreate}
            disabled={
              loadingCreate || !name.trim()
            }
            className="bg-black text-white px-5 py-3 rounded-lg disabled:opacity-50"
          >
            {loadingCreate
              ? "Creating..."
              : "Create"}
          </button>

        </div>
      </SectionCard>

      {/* EMPTY STATE */}

      {categories.length === 0 ? (
        <SectionCard title="Categories">

          <div className="py-16 text-center">

            <div className="text-6xl mb-4">
              🗂️
            </div>

            <h2 className="text-xl font-semibold">
              No Categories Yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Categories help customers find
              products faster and keep your
              store organized.
            </p>

            <div className="mt-6">
              <button
                onClick={() =>
                  document
                    .querySelector("input")
                    ?.focus()
                }
                className="bg-black text-white px-5 py-3 rounded-lg"
              >
                Create First Category
              </button>
            </div>

          </div>

        </SectionCard>
      ) : (
        <SectionCard
          title={`All Categories (${categories.length})`}
        >
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="py-3">
                    Name
                  </th>

                  <th className="py-3">
                    Products
                  </th>

                  <th className="py-3">
                    Sales
                  </th>

                  <th className="py-3">
                    Created
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-b hover:bg-gray-50"
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
                ))}
              </tbody>

            </table>

          </div>
        </SectionCard>
      )}
    </div>
  );
}