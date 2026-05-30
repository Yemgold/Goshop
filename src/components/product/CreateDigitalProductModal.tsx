


import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "../ui/Button";
import { useCreateVendorProduct } from "../../hooks/vendor/useCreateVendorProduct";
import { useAuthStore } from "../../store/auth.store";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateDigitalProductModal({
  open,
  onClose,
}: Props) {
  const { mutate, isPending } = useCreateVendorProduct();

  // ✅ correct auth source
  const businessId = useAuthStore(
    (state) => state.user?.businessId
  );

  /* ================= STATES ================= */

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [previewName, setPreviewName] = useState("");

  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  if (!open) return null;

  /* ================= FILE HANDLER ================= */

  const handleFileUpload = (file: File | null) => {
    if (!file) return;

    setFile(file);
    setPreviewName(file.name);
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setTags("");
    setFile(null);
    setPreviewName("");
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!businessId) {
      toast.error("Business ID missing");
      return;
    }

    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!price) {
      toast.error("Price is required");
      return;
    }

    if (!file) {
      toast.error("Please upload a digital file");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", String(Number(price)));
      formData.append("category", category || "Digital");
      formData.append("type", "digital");

      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      formData.append("tags", JSON.stringify(tagsArray));

      formData.append("file", file);

      await new Promise((resolve, reject) => {
        mutate(
          {
            businessId,
            formData,
          },
          {
            onSuccess: resolve,
            onError: reject,
          }
        );
      });

      toast.success("Digital product created successfully");

      resetForm();
      onClose();
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to create digital product"
      );
    }
  };

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 space-y-4">

        {/* HEADER */}
        <div>
          <h2 className="text-lg font-semibold">
            Create Digital Product
          </h2>
          <p className="text-xs text-gray-500">
            Upload files like ebooks, videos, templates, software, etc.
          </p>
        </div>

        {/* NAME */}
        <input
          className="w-full h-10 border rounded-lg px-3 text-sm"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          className="w-full min-h-[80px] border rounded-lg p-3 text-sm"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* PRICE + CATEGORY */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            className="w-full h-10 border rounded-lg px-3 text-sm"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            className="w-full h-10 border rounded-lg px-3 text-sm"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* TAGS */}
        <input
          className="w-full h-10 border rounded-lg px-3 text-sm"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* FILE UPLOAD */}
        <div className="border border-dashed rounded-lg p-4 text-center">
          <input
            type="file"
            className="hidden"
            id="digital-file"
            onChange={(e) =>
              handleFileUpload(e.target.files?.[0] || null)
            }
          />

          <label
            htmlFor="digital-file"
            className="cursor-pointer text-sm text-gray-600"
          >
            Click to upload file (PDF, ZIP, MP4, etc.)
          </label>

          {previewName && (
            <p className="text-xs mt-2 text-green-600">
              Selected: {previewName}
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={onClose} className="!bg-gray-200 !text-gray-700">
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="!bg-blue-600 !text-white"
          >
            {isPending ? "Saving..." : "Create Product"}
          </Button>
        </div>
      </div>
    </div>
  );
}