




import React from "react";
import { toast } from "react-toastify";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";

import { useVendorProducts } from "../../hooks/vendor/useVendorProducts";
import { useDeleteVendorProduct } from "../../hooks/vendor/useDeleteVendorProduct";

import type { Product } from "../../types/vendor.types"; 

const VendorProducts: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVendorProducts();

  const { mutate: deleteProduct, isPending } =
    useDeleteVendorProduct();

  const handleDelete = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => toast.success("Product deleted"),
      onError: () => toast.error("Failed to delete product"),
    });
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !data) return <div className="p-6">Error loading products</div>;

  // FLATTEN ALL PAGES
  const products: Product[] = data.pages.flatMap((page) => page.items);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <PageHeader title="Vendor Products" />

      <div className="flex justify-end">
        <Button>Add Product</Button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-sm text-gray-500">
                  Stock: {product.stock}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  ₦{product.price.toLocaleString()}
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    product.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Button>Edit</Button>

              <Button
                variant="danger"
                disabled={isPending}
                onClick={() => handleDelete(product.id)}
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* PAGINATION BUTTON */}
      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default VendorProducts;






