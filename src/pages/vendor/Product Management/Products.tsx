




import React, { useState } from "react";
import { toast } from "react-toastify";

import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { PageHeader } from "../../../components/ui/PageHeader";

import { useVendorProducts } from "../../../hooks/vendor/useVendorProducts";
import { useDeleteVendorProduct } from "../../../hooks/vendor/useDeleteVendorProduct";

import CreateProductModal from "../../../components/product/CreateProductModal";
import UpdateModal from "../../../components/product/UpdatePhysicalProductModal";

import { useAuthStore } from "../../../store/auth.store";

import type { Product } from "../../../types/vendor/vendor.types";

import { useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

const VendorProducts: React.FC = () => {
  /* ================= PAGINATION ================= */
  const [page, setPage] = useState(1);
  const limit = 10;


  const navigate = useNavigate();
  
  const queryClient = useQueryClient();
  /* ================= MODALS ================= */
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [openUpdateModal, setOpenUpdateModal] =
    useState(false);

  const [openCreateModal, setOpenCreateModal] =
    useState(false);

  /* ================= DATA ================= */
  const { data, isLoading, isError, error } =
    useVendorProducts(page, limit);

  const { mutate: deleteProduct, isPending } =
    useDeleteVendorProduct();

  /* ================= SAFE EXTRACTION ================= */
  const products: Product[] = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalCount = data?.totalCount ?? 0;

  /* ================= DELETE ================= */

const handleDelete = (productId?: string) => {
  const businessId =
    useAuthStore.getState().user?.businessId;

  if (!productId) {
    toast.error("Invalid product ID");
    return;
  }

  if (!businessId) {
    toast.error("Missing business ID");
    return;
  }

  deleteProduct(
    {
      businessId,
      productId,
    },
    {
      onSuccess: () => {
        toast.success(
          "Product deleted successfully"
        );

        // AUTO REFRESH PRODUCTS
        queryClient.invalidateQueries({
          queryKey: ["vendor-products"],
        });
      },

      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
          "Failed to delete product"
        );
      },
    }
  );
};


  /* ================= UPDATE ================= */
 const handleUpdate = (product: Product) => {
  if (!product?._id) {
    toast.error("Invalid product ID");
    return;
  }

  setSelectedProduct(product);
  setOpenUpdateModal(true);
};

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6">
        Loading products...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError) {
    return (
      <div className="p-6 text-red-500">
        {(error as Error)?.message ||
          "Error loading products"}
      </div>
    );
  }

  return (
    <>
      <div className="p-6 max-w-5xl mx-auto space-y-6">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between">
          <PageHeader title="Vendor Products" />

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">
              Total Products: {totalCount}
            </div>          

          </div>
        </div>

        {/* ================= EMPTY STATE ================= */}

{!products?.length ? (
  <div className="bg-white rounded-2xl border p-10 text-center space-y-4">
    <div className="text-5xl">📦</div>

    <h2 className="text-lg font-semibold">
      No Products Available
    </h2>

    <p className="text-gray-500">
      You haven’t added any products yet. Start by creating your first product.
    </p>

    <div className="flex justify-center gap-3">
      <Button onClick={() => setOpenCreateModal(true)}>
        Create Your First Product
      </Button>

      <Button
        variant="outline"
        onClick={() => navigate("/vendor/dashboard")}
      >
        Go to Dashboard
      </Button>
    </div>
  </div>



          
        ) : (
          <>
            {/* ================= PRODUCTS ================= */}
            <div className="grid gap-6">
              {products.map((product) => {
                const media =
                  product.media ?? [];

                return (
                  <Card
                    key={product._id}
                    className="overflow-hidden"
                  >

                    {/* ================= IMAGE SHOWCASE ================= */}
                    {media.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 p-2 bg-gradient-to-b from-gray-50 to-white rounded-2xl">

                        {/* MAIN IMAGE */}
                        <div className="col-span-2">
                          <div
                            className="
                              relative
                              h-[220px]
                              rounded-2xl
                              overflow-hidden
                              border
                              border-gray-200
                              bg-white
                              shadow-sm
                              transition-all
                              duration-300
                              hover:shadow-xl
                              hover:-translate-y-1
                              hover:border-black/20
                              group
                            "
                          >
                            <img
                              src={
                                media[0]?.url
                              }
                              alt={
                                product.name
                              }
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="
                                w-full
                                h-full
                                object-contain
                                p-2
                                transition-transform
                                duration-500
                                group-hover:scale-105
                                cursor-zoom-in
                              "
                            />

                            {/* OVERLAY */}
                            <div
                              className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/10
                                to-transparent
                                pointer-events-none
                              "
                            />

                            {/* SHINE EFFECT */}
                            <div
                              className="
                                absolute
                                inset-0
                                opacity-0
                                group-hover:opacity-100
                                transition
                                duration-700
                                bg-gradient-to-r
                                from-transparent
                                via-white/30
                                to-transparent
                                -translate-x-full
                                group-hover:translate-x-full
                              "
                            />

                            {/* LABEL */}
                            <span
                              className="
                                absolute
                                top-2
                                left-2
                                text-[10px]
                                text-white
                                px-2
                                py-1
                                rounded-full
                                bg-black/70
                                backdrop-blur-md
                                border
                                border-white/20
                              "
                            >
                              Front View
                            </span>

                            {/* ICON */}
                            <div
                              className="
                                absolute
                                top-2
                                right-2
                                w-8
                                h-8
                                rounded-full
                                bg-white/80
                                backdrop-blur-md
                                flex
                                items-center
                                justify-center
                                shadow-sm
                                text-sm
                              "
                            >
                              👁
                            </div>
                          </div>
                        </div>

                        {/* SIDE IMAGES */}
                        <div className="flex flex-col gap-2">

                          {/* SIDE */}
                          {media[1] && (
                            <div
                              className="
                                relative
                                h-[106px]
                                rounded-2xl
                                overflow-hidden
                                border
                                border-gray-200
                                bg-white
                                shadow-sm
                                transition-all
                                duration-300
                                hover:shadow-lg
                                hover:-translate-y-1
                                hover:border-black/20
                                group
                              "
                            >
                              <img
                                src={
                                  media[1]
                                    .url
                                }
                                alt="side"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="
                                  w-full
                                  h-full
                                  object-contain
                                  p-1
                                  transition-transform
                                  duration-500
                                  group-hover:scale-105
                                  cursor-zoom-in
                                "
                              />

                              <div
                                className="
                                  absolute
                                  inset-0
                                  bg-gradient-to-t
                                  from-black/10
                                  to-transparent
                                  pointer-events-none
                                "
                              />

                              <span
                                className="
                                  absolute
                                  top-1
                                  left-1
                                  text-[10px]
                                  text-white
                                  px-2
                                  py-1
                                  rounded-full
                                  bg-black/70
                                  backdrop-blur-md
                                  border
                                  border-white/20
                                "
                              >
                                Side View
                              </span>
                            </div>
                          )}

                          {/* BACK */}
                          {media[2] && (
                            <div
                              className="
                                relative
                                h-[106px]
                                rounded-2xl
                                overflow-hidden
                                border
                                border-gray-200
                                bg-white
                                shadow-sm
                                transition-all
                                duration-300
                                hover:shadow-lg
                                hover:-translate-y-1
                                hover:border-black/20
                                group
                              "
                            >
                              <img
                                src={
                                  media[2]
                                    .url
                                }
                                alt="back"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="
                                  w-full
                                  h-full
                                  object-contain
                                  p-1
                                  transition-transform
                                  duration-500
                                  group-hover:scale-105
                                  cursor-zoom-in
                                "
                              />

                              <div
                                className="
                                  absolute
                                  inset-0
                                  bg-gradient-to-t
                                  from-black/10
                                  to-transparent
                                  pointer-events-none
                                "
                              />

                              <span
                                className="
                                  absolute
                                  top-1
                                  left-1
                                  text-[10px]
                                  text-white
                                  px-2
                                  py-1
                                  rounded-full
                                  bg-black/70
                                  backdrop-blur-md
                                  border
                                  border-white/20
                                "
                              >
                                Back View
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ================= CONTENT ================= */}
                    <div className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h2 className="font-semibold text-lg">
                            {product.name}
                          </h2>

                          <p className="text-sm text-gray-500">
                            Type:{" "}
                            {product.type ||
                              "physical"}
                          </p>

                          <p className="text-sm text-gray-500">
                            Stock:{" "}
                            {product.stock ??
                              0}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-lg">
                            ₦
                            {Number(
                              product.price ||
                                0
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>



{/* ACTIONS */}
<div className="mt-4 flex items-center justify-between gap-3">
  
  {/* LEFT ACTIONS (primary) */}
  <div className="flex gap-2">
    
    <Button
      onClick={() => handleUpdate(product)}
      className="!bg-blue-600 !text-white px-3 h-9 text-xs rounded-lg"
    >
      Edit
    </Button>

    <Button
      onClick={() =>
        navigate(`/vendor/products/${product._id}`)
      }
      className="!bg-gray-100 !text-gray-700 px-3 h-9 text-xs rounded-lg"
    >
      View
    </Button>

    <Button
      onClick={() =>
        navigate(`/vendor/products/${product._id}/analytics`)
      }
      className="!bg-gray-100 !text-gray-700 px-3 h-9 text-xs rounded-lg"
    >
      Analytics
    </Button>

    <Button
      onClick={() =>
        navigate(`/vendor/products/${product._id}/viral`)
      }
      className="!bg-gray-100 !text-gray-700 px-3 h-9 text-xs rounded-lg"
    >
      Viral
    </Button>

  </div>

  {/* RIGHT ACTION (danger) */}
  <Button
    variant="danger"
    disabled={isPending}
    onClick={() => handleDelete(product._id)}
    className="px-3 h-9 text-xs rounded-lg"
  >
    Delete
  </Button>

</div>




                    </div>
                  </Card>
                );
              })}
            </div>

            {/* ================= PAGINATION ================= */}
            <div className="flex items-center justify-center gap-4 pt-6">
              <Button
                disabled={page === 1}
                onClick={() =>
                  setPage((p) =>
                    Math.max(p - 1, 1)
                  )
                }
              >
                Previous
              </Button>

              <div className="text-sm font-medium">
                Page {page} of{" "}
                {totalPages}
              </div>

              <Button
                disabled={
                  page >= totalPages
                }
                onClick={() =>
                  setPage((p) =>
                    Math.min(
                      p + 1,
                      totalPages
                    )
                  )
                }
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>

      {/* ================= CREATE MODAL ================= */}

      <CreateProductModal
        open={openCreateModal}
        onClose={() =>
          setOpenCreateModal(false)
        }
        
      />

      {/* ================= UPDATE MODAL ================= */}
      <UpdateModal
        open={openUpdateModal}
        onClose={() =>
          setOpenUpdateModal(false)
        }
        product={selectedProduct}
      />
    </>
  );
};

export default VendorProducts;