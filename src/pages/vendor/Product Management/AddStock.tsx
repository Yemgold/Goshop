

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, DollarSign } from "lucide-react";
import { toast } from "sonner";

import { useQuery } from "@tanstack/react-query";

import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";

import ProductSearch from "../../../components/inventory/ProductSearch";
import QuantityStepper from "../../../components/inventory/QuantityStepper";
import StockSummary from "../../../components/inventory/StockSummary";

import { useAddStock } from "../../../hooks/vendor/useAddStock";

import { getVendorProductsAPI } from "../../../api/user/vendor.api";

import type{ AddStockPayload } from "../../../types/vendor/inventory"; 


import type{ Product } from "../../../types";
import { useAuthStore } from "../../../store/auth.store";



export default function AddStock() {
  const navigate = useNavigate();

  /* =====================================================
     FETCH PRODUCTS
  ===================================================== */

 const businessId = useAuthStore((state) => state.user?.businessId);

const {
  data,
  isLoading,
  isError,
} = useQuery<Product[]>({
  queryKey: ["vendor-products", businessId],

  queryFn: async () => {
    if (!businessId) {
      throw new Error("Business ID is missing");
    }

    const result = await getVendorProductsAPI(businessId);

   console.log("FROM API:", result);
console.log("TYPE:", typeof result);
console.log("IS ARRAY:", Array.isArray(result));
console.log("RESULT:", JSON.stringify(result, null, 2));

    return result;
  },

  enabled: !!businessId,
});

const products = data ?? [];

console.log("PRODUCTS:", products);

  /* =====================================================
     ADD STOCK MUTATION
  ===================================================== */

  const addStockMutation = useAddStock();

  /* =====================================================
     FORM STATE
  ===================================================== */

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [quantity, setQuantity] = useState(1);

  const [unitCost, setUnitCost] = useState<number>(0);

  const [expiryDate, setExpiryDate] =
    useState("");

  /* =====================================================
     DERIVED VALUES
  ===================================================== */

  const totalCost = useMemo(() => {
    return quantity * unitCost;
  }, [quantity, unitCost]);

  const projectedStock = useMemo(() => {
    if (!selectedProduct) return 0;

    return selectedProduct?.stock ?? 0 + quantity;
  }, [selectedProduct, quantity]);

  /* =====================================================
     RESET FORM
  ===================================================== */

  const resetForm = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setUnitCost(0);
    setExpiryDate("");
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = () => {
    if (!selectedProduct) {
      toast.error("Please select a product.");
      return;
    }

    console.log("Selected Product:");
  console.log(selectedProduct);

  console.log("businessId:");
  console.log(selectedProduct.businessId);

  console.log("Selected Product:", selectedProduct);
console.log("Business ID value:", selectedProduct.businessId);
console.log("Type:", typeof selectedProduct.businessId);

    

 if (!selectedProduct.businessId) {
  toast.error("Business information is missing.");
  return;
}

const payload: AddStockPayload = {
  productId: selectedProduct._id,
  businessId: selectedProduct.businessId,
  quantity,
  unitCost: unitCost || undefined,
  expiryDate: expiryDate || undefined,
};


    addStockMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Stock added successfully.");

        resetForm();
      },
    });
  };

  /* =====================================================
     FORMAT CURRENCY
  ===================================================== */

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value);
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">

          <div className="h-10 w-64 rounded bg-gray-200" />

          <div className="h-96 rounded-3xl bg-gray-200" />

        </div>
      </div>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (isError) {
    return (
      <div className="p-10 text-center">

        <h2 className="text-2xl font-bold">
          Unable to load products
        </h2>

        <p className="text-gray-500 mt-2">
          Please refresh the page.
        </p>

      </div>
    );
  }

    /* =====================================================
     PAGE UI
  ===================================================== */

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between">

        <PageHeader
          title="Add Stock"
          subtitle="Increase inventory levels and keep products available."
        />

        <button
          onClick={() => navigate(-1)}
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            border
            bg-white
            hover:bg-gray-50
            transition
          "
        >
          <ArrowLeft size={18} />

          <span>Back</span>
        </button>

      </div>

      {/* =====================================================
          TWO COLUMN LAYOUT
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <div className="xl:col-span-2">

          <SectionCard title="Stock Information">

            <div className="space-y-8">

              {/* ==========================================
                  PRODUCT SEARCH
              ========================================== */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Product
                </label>

                <ProductSearch
                  products={products}
                  selected={selectedProduct}
                  onSelect={(product) => {
                    setSelectedProduct(product);
                  }}
                />

              </div>

              {/* ==========================================
                  PRODUCT QUICK PREVIEW
              ========================================== */}

              {selectedProduct && (

                <div
                  className="
                    rounded-2xl
                    border
                    bg-gradient-to-r
                    from-blue-50
                    to-indigo-50
                    p-5
                  "
                >

                  <div className="flex flex-col md:flex-row gap-5">

                    {/* IMAGE */}

                    <img
                      src={
                        selectedProduct.media?.[0]?.url ||
                        "/placeholder-product.png"
                      }
                      alt={selectedProduct.name}
                      className="
                        w-32
                        h-32
                        rounded-2xl
                        object-cover
                        border
                      "
                    />

                    {/* INFO */}

                    <div className="flex-1">

                      <h2 className="text-xl font-bold">
                        {selectedProduct.name}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        SKU: {selectedProduct.sku}
                      </p>

                      <div className="grid md:grid-cols-3 gap-4 mt-5">

                        <div>

                          <p className="text-xs text-gray-500">
                            Current Stock
                          </p>

                          <p className="font-bold text-lg">
                            {selectedProduct.stock}
                          </p>

                        </div>

                        <div>

                          <p className="text-xs text-gray-500">
                            Price
                          </p>

                          <p className="font-bold text-lg">
                            ₦
                            {selectedProduct.price.toLocaleString()}
                          </p>

                        </div>

                        <div>

                          <p className="text-xs text-gray-500">
                            Reserved
                          </p>

                          <p className="font-bold text-lg">
                            {
                              selectedProduct.reservedQuantity
                            }
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              )}

              {/* ==========================================
                  QUANTITY STEPPER
              ========================================== */}

              <div>

                <QuantityStepper
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={999999}
                />

              </div>

            </div>

          </SectionCard>

        </div>


                      {/* ==========================================
                  UNIT COST
              ========================================== */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Unit Cost (₦)
                </label>

                <div className="relative">

                  <DollarSign
                    size={18}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="number"
                    min={0}
                    value={unitCost || ""}
                    onChange={(e) =>
                      setUnitCost(Number(e.target.value))
                    }
                    placeholder="Enter purchase cost"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      pl-11
                      pr-4
                      py-3
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                </div>

                {unitCost > 0 && (

                  <p className="mt-2 text-sm text-slate-500">

                    Formatted:

                    <span className="ml-2 font-semibold text-green-600">

                      {formatCurrency(unitCost)}

                    </span>

                  </p>

                )}

              </div>

              {/* ==========================================
                  EXPIRY DATE
              ========================================== */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Expiry Date (Optional)
                </label>

                <div className="relative">

                  <Calendar
                    size={18}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) =>
                      setExpiryDate(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      pl-11
                      pr-4
                      py-3
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                </div>

              </div>

            </div>

         

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="space-y-6">

          {/* LIVE TOTALS */}

          <SectionCard title="Inventory Totals">

            <div className="space-y-5">

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Quantity
                </span>

                <span className="font-bold">

                  {quantity}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Unit Cost
                </span>

                <span className="font-bold">

                  {formatCurrency(unitCost)}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Inventory Cost
                </span>

                <span className="font-bold text-green-600">

                  {formatCurrency(totalCost)}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Projected Stock
                </span>

                <span className="font-bold text-blue-600">

                  {projectedStock}

                </span>

              </div>

              {expiryDate && (

                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Expiry
                  </span>

                  <span className="font-semibold">

                    {expiryDate}

                  </span>

                </div>

              )}

            </div>

          </SectionCard>

          {/* STOCK SUMMARY */}

          <StockSummary
            product={selectedProduct}
            quantity={quantity}
            unitCost={unitCost}
            expiryDate={expiryDate}
          />

      

          {/* ==========================================
              ACTIONS
          ========================================== */}

          

            <div className="space-y-6">

              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">

                <h3 className="font-semibold text-blue-900">
                  Stock Update Summary
                </h3>

                <div className="mt-4 space-y-3 text-sm">

                  <div className="flex justify-between">
                    <span>Product</span>

                    <span className="font-semibold">
                      {selectedProduct?.name || "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Quantity</span>

                    <span className="font-semibold">
                      +{quantity}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Current Stock</span>

                    <span className="font-semibold">
                      {selectedProduct?.stock ?? "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>New Stock</span>

                    <span className="font-semibold text-blue-600">
                      {projectedStock}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Total Cost</span>

                    <span className="font-bold text-green-600">
                      {formatCurrency(totalCost)}
                    </span>
                  </div>

                </div>

              </div>

              <button
                type="button"
                disabled={
                  !selectedProduct ||
                  quantity <= 0 ||
                  addStockMutation.isPending
                }
                onClick={handleSubmit}
                className="
                  w-full
                  rounded-2xl
                  py-4
                  text-white
                  font-semibold
                  transition-all
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  hover:from-blue-700
                  hover:to-indigo-700
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  shadow-lg
                "
              >
                {addStockMutation.isPending
                  ? "Adding Stock..."
                  : "Add Stock"}
              </button>

           

        </div>

      </div>

    </div>

  );
  
}