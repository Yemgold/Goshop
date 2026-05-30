

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "../ui/Button";
import { useAuthStore } from "../../store/auth.store";
import { useUpdateVendorProduct } from "../../hooks/vendor/useUpdateVendorProduct";

import type { Product } from "../../types/vendor.types";

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function UpdateModal({
  open,
  onClose,
  product,
}: Props) {
  const { mutate, isPending } = useUpdateVendorProduct();

  const queryClient = useQueryClient();

  const businessId = useAuthStore(
    (state) => state.user?.businessId
  );

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!product) return;

    setName(product.name ?? "");
    setDescription((product as any).description ?? "");
    setPrice(String(product.price ?? ""));
    setStock(String(product.stock ?? ""));
    setCategory(product.category ?? "");

    setTags(
      Array.isArray(product.tags)
        ? product.tags.join(", ")
        : ""
    );

    setPreviews(
      Array.isArray((product as any).media)
        ? (product as any).media.map((m: any) => m.url)
        : []
    );
  }, [product]);

  if (!open || !product) return null;

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!businessId) {
      toast.error("Please wait... loading account");
      return;
    }

    if (!product?._id) {
      toast.error("Invalid product ID");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", String(Number(price)));
      formData.append("stock", String(Number(stock)));
      formData.append(
        "category",
        category.trim() || "General"
      );

      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      formData.append(
        "tags",
        JSON.stringify(tagsArray)
      );

      images.forEach((file) => {
        formData.append("files", file);
      });

      await new Promise<void>((resolve, reject) => {
        mutate(
          {
            businessId,
            productId: product._id ?? "",
            formData,
          },
          {
            onSuccess: () => {
              resolve();

              // 🔥 REFRESH PRODUCTS LIST
              queryClient.invalidateQueries({
                queryKey: ["vendor-products"],
                exact: false,
              });
            },
            onError: reject,
          }
        );
      });

      toast.success("Product updated successfully");

      setImages([]);
      setPreviews([]);

      onClose();
    } 
    
    catch (err: any) {
  console.error(err);

  const status = err?.response?.status;

  if (status === 403) {
    toast.error(
      "You are not allowed to update this product"
    );

    return;
  }

  if (status === 404) {
    toast.error("Product not found");
    return;
  }

  toast.error(
    err?.response?.data?.message ||
      "Failed to update product"
  );
}
  };

  /* ================= IMAGE HANDLER ================= */
  const handleImageUpload = (
    files: FileList | null
  ) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const merged = [...images, ...newFiles].slice(
      0,
      3
    );

    setImages(merged);
    setPreviews(
      merged.map((file) =>
        URL.createObjectURL(file)
      )
    );
  };

  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
    setPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  
 
  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

        {/* LEFT */}
        <div className="w-full lg:w-[40%] bg-gray-50 border-r p-5">
          <h2 className="text-lg font-semibold">Update Images</h2>

          <label className="mt-3 border border-dashed border-gray-300 bg-white rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer">
            <p className="text-sm font-medium">Replace Images</p>
            <span className="text-xs text-gray-400">Max 3 images</span>

            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files)}
            />
          </label>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {previews.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg overflow-hidden border bg-white"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 text-xs bg-white rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[60%] p-5">
          <h2 className="text-lg font-semibold mb-4">Update Product</h2>

          <div className="space-y-3">
            <input
              className="w-full h-10 border rounded-lg px-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
            />

            <textarea
              className="w-full h-24 border rounded-lg p-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                className="w-full h-10 border rounded-lg px-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />

              <input
                className="w-full h-10 border rounded-lg px-3"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
              />
            </div>

            <input
              className="w-full h-10 border rounded-lg px-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />

            <input
              className="w-full h-10 border rounded-lg px-3"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={onClose}>Cancel</Button>

            <Button onClick={handleUpdate} disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}