


import {
  Package,
  Boxes,
  DollarSign,
  Barcode,
  TrendingUp,
  Calendar,
} from "lucide-react";

import type{ Product } from "../../types"; 

interface StockSummaryProps {
  product: Product | null;
  quantity: number;
  unitCost: number;
  expiryDate?: string;
}

export default function StockSummary({
  product,
  quantity,
  unitCost,
  expiryDate,
}: StockSummaryProps) {
  if (!product) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 backdrop-blur-xl p-12 text-center">
        <Package
          className="mx-auto text-slate-300"
          size={60}
        />

        <h3 className="mt-4 text-xl font-semibold text-slate-700">
          No Product Selected
        </h3>

        <p className="mt-2 text-slate-500">
          Search and select a product to preview the stock update.
        </p>
      </div>
    );
  }

  const currentStock = product.stock ?? 0;

  const newStock = currentStock + quantity;

  const totalCost = quantity * unitCost;

  const image =
    product.media?.[0]?.url ||
    "/placeholder-product.png";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/70 backdrop-blur-xl shadow-lg overflow-hidden">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">

        <h2 className="text-xl font-bold">
          Stock Summary
        </h2>

        <p className="text-blue-100 mt-1">
          Review before submitting.
        </p>

      </div>

      <div className="p-6">

        {/* PRODUCT */}

        <div className="flex flex-col md:flex-row gap-6">

          <img
            src={image}
            alt={product.name}
            className="w-40 h-40 rounded-2xl object-cover border"
          />

          <div className="flex-1 space-y-4">

            <h2 className="text-2xl font-bold">
              {product.name}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {/* SKU */}

              <div className="flex items-center gap-3">

                <Barcode
                  className="text-blue-600"
                  size={20}
                />

                <div>

                  <p className="text-xs text-slate-500">
                    SKU
                  </p>

                  <p className="font-semibold">
                    {product.sku}
                  </p>

                </div>

              </div>

              {/* PRICE */}

              <div className="flex items-center gap-3">

                <DollarSign
                  className="text-green-600"
                  size={20}
                />

                <div>

                  <p className="text-xs text-slate-500">
                    Selling Price
                  </p>

                  <p className="font-semibold">
                    ₦{product.price.toLocaleString()}
                  </p>

                </div>

              </div>

              {/* CURRENT STOCK */}

              <div className="flex items-center gap-3">

                <Boxes
                  className="text-orange-600"
                  size={20}
                />

                <div>

                  <p className="text-xs text-slate-500">
                    Current Stock
                  </p>

                  <p className="font-semibold">
                    {currentStock}
                  </p>

                </div>

              </div>

              {/* NEW STOCK */}

              <div className="flex items-center gap-3">

                <TrendingUp
                  className="text-blue-600"
                  size={20}
                />

                <div>

                  <p className="text-xs text-slate-500">
                    New Stock
                  </p>

                  <p className="font-bold text-blue-600">
                    {newStock}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SUMMARY GRID */}

        <div className="grid md:grid-cols-2 gap-5 mt-8">

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-slate-500 text-sm">
              Quantity Being Added
            </p>

            <p className="mt-2 text-3xl font-bold">
              +{quantity}
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-slate-500 text-sm">
              Unit Cost
            </p>

            <p className="mt-2 text-3xl font-bold">
              ₦{unitCost.toLocaleString()}
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-slate-500 text-sm">
              Total Inventory Cost
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              ₦{totalCost.toLocaleString()}
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <div className="flex items-center gap-2">

              <Calendar
                className="text-indigo-600"
                size={18}
              />

              <p className="text-slate-500 text-sm">
                Expiry Date
              </p>

            </div>

            <p className="mt-2 font-semibold">
              {expiryDate || "No Expiry"}
            </p>

          </div>

        </div>

        {/* STATUS */}

        <div className="mt-8 flex justify-between items-center rounded-2xl bg-blue-50 border border-blue-100 p-5">

          <div>

            <p className="text-sm text-slate-500">
              Inventory Status
            </p>

            <h3 className="text-lg font-bold">
              {newStock > 0
                ? "In Stock"
                : "Out of Stock"}
            </h3>

          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              newStock > 10
                ? "bg-green-100 text-green-700"
                : newStock > 0
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {newStock > 10
              ? "Healthy"
              : newStock > 0
              ? "Low Stock"
              : "Out of Stock"}
          </span>

        </div>

      </div>

    </div>
  );
}