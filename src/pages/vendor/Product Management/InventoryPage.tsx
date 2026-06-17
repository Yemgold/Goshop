


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

  /* ================= OFFLINE ================= */

if (!navigator.onLine) {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white border rounded-3xl p-12 text-center shadow-sm">
        <div className="text-6xl mb-4">📡</div>

        <h2 className="text-2xl font-bold text-gray-900">
          You're Offline
        </h2>

        <p className="mt-3 text-gray-500 max-w-md mx-auto">
          Please check your internet connection and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 rounded-xl bg-black text-white"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

/* ================= SERVER / NETWORK ERROR ================= */

if (isError) {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white border rounded-3xl p-12 text-center shadow-sm">
        <div className="text-6xl mb-4">⚠️</div>

        <h2 className="text-2xl font-bold text-gray-900">
          Unable to Load Inventory
        </h2>

        <p className="mt-3 text-gray-500 max-w-md mx-auto">
          We couldn't retrieve your inventory information.
          The server may be temporarily unavailable.
        </p>

        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-black text-white"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= EMPTY INVENTORY ================= */

if (
  !data ||
  !data.products ||
  data.products.length === 0
) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white border rounded-3xl p-12 text-center shadow-sm">
        <div className="text-6xl mb-4">📦</div>

        <h2 className="text-2xl font-bold text-gray-900">
          Inventory is Empty
        </h2>

        <p className="mt-3 text-gray-500 max-w-lg mx-auto">
          You don't have any products in your inventory yet.
          Once you add products, inventory tracking,
          stock monitoring, and sales statistics will appear here.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() =>
              window.location.assign("/vendor/products")
            }
            className="px-6 py-3 rounded-xl bg-black text-white"
          >
            Add Your First Product
          </button>
        </div>
      </div>
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
  {data.products.length > 0 ? (
    data.products.map((item) => (



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
             

                 ))
  ) : (
    <tr>
      <td
        colSpan={7}
        className="py-12 text-center text-gray-500"
      >
        No inventory records found.
      </td>
    </tr>
  )}
</tbody>



          </table>
        </div>
      </SectionCard>
    </div>
  );
}