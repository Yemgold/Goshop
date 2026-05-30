


import { PageHeader } from "../../../components/ui/PageHeader"; 
import { StatCard } from "../../../components/ui/StatCard"; 
import { SectionCard } from "../../../components/ui/SectionCard"; 

import { useVendorInventory } from "../../../hooks/vendor/useVendorInventory"; 

export default function Inventory() {
  const { data, isLoading, isError } =
    useVendorInventory();

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !data) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load inventory data.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <PageHeader
        title="Vendor Inventory"
        subtitle="Manage stock levels, product availability, and inventory health."
      />

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={data.summary.totalProducts}
        />

        <StatCard
          title="Stock Value"
          value={`₦${data.summary.totalStockValue.toLocaleString()}`}
        />

        <StatCard
          title="Low Stock"
          value={data.summary.lowStockItems}
        />

        <StatCard
          title="Out of Stock"
          value={data.summary.outOfStockItems}
        />
      </div>

      {/* INVENTORY TABLE */}
      <SectionCard title="Product Inventory">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b text-sm text-gray-500">
                <th className="py-3">Product</th>
                <th className="py-3">SKU</th>
                <th className="py-3">Price</th>
                <th className="py-3">Stock</th>
                <th className="py-3">Sold</th>
                <th className="py-3">Status</th>
                <th className="py-3">Updated</th>
              </tr>
            </thead>

            <tbody>
              {data.products.map((item) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="py-4 font-medium">
                    {item.name}
                  </td>

                  <td className="py-4">
                    {item.sku}
                  </td>

                  <td className="py-4">
                    ₦{item.price.toLocaleString()}
                  </td>

                  <td className="py-4">
                    {item.stock}
                  </td>

                  <td className="py-4">
                    {item.sold}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium
                      ${
                        item.status ===
                        "in_stock"
                          ? "bg-green-100 text-green-700"
                          : item.status ===
                            "low_stock"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4">
                    {item.updatedAt}
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