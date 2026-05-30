




















import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "../ui/Button";
import { useCreateVendorProduct } from "../../hooks/vendor/useCreateVendorProduct";
import { useAuthStore } from "../../store/auth.store";

import { useQueryClient } from "@tanstack/react-query";

interface Props {
  open: boolean;
  onClose: () => void;
}





export default function CreateProductModal({
  open,
  onClose,
}: Props) {
  const { mutate, isPending } =
    useCreateVendorProduct();

  const businessId = useAuthStore(
    (state) => state.user?.businessId
  );

  /* ================= STATES ================= */

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<
    string[]
  >([]);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const queryClient = useQueryClient();

  const [category, setCategory] =
    useState("");

  const [tags, setTags] = useState("");

   const [weight, setWeight] = useState("");
 

  // ///////////////////////////////////////////////////////////////////////////////

 

  if (!open) return null;

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = (
    files: FileList | null
  ) => {
    if (!files) return;

    const selectedFiles = Array.from(files);

    const mergedImages = [
      ...images,
      ...selectedFiles,
    ].slice(0, 3);

    setImages(mergedImages);

    setPreviews(
      mergedImages.map((file) =>
        URL.createObjectURL(file)
      )
    );
  };

  /* ================= REMOVE IMAGE ================= */

  const removeImage = (index: number) => {
    const updatedImages = images.filter(
      (_, i) => i !== index
    );

    const updatedPreviews = previews.filter(
      (_, i) => i !== index
    );

    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };



  

  /* ================= RESET ================= */

  const resetForm = () => {
    setImages([]);
    setPreviews([]);

    setName("");
    setDescription("");

    setPrice("");
    setStock("");

    setCategory("");
    setTags("");

    setWeight("");



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

    if (!weight) {
      toast.error("Product Weight is required");
      return;
    }

    if (images.length === 0) {
      toast.error(
        "Upload at least 1 product image"
      );

      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name.trim());

      formData.append(
        "description",
        description.trim()
      );

      formData.append(
        "price",
        String(Number(price))
      );

      formData.append(
        "stock",
        String(Number(stock || 0))
      );

      formData.append(
        "category",
        category.trim() || "General"
      );

      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

       formData.append(
        "weight",
        String(Number(weight))
      );


      formData.append(
        "tags",
        JSON.stringify(tagsArray)
      );






      images.forEach((file) => {
        formData.append("files", file);
      });


    await new Promise((resolve, reject) => {
  mutate(
    {
      businessId,
      formData,
    },
    {
      onSuccess: (data) => {
        resolve(data);

        // 🔥 REFRESH PRODUCTS LIST
        queryClient.invalidateQueries({
          queryKey: ["vendor-products"],
        });
      },
      onError: reject,
    }
  );
});

      toast.success(
        "Product created successfully"
      );

      resetForm();

      onClose();
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to create product"
      );




    }
  };



return (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

  <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col lg:flex-row max-h-[90vh]">
      
      {/* ================= LEFT ================= */}
<div className="w-full lg:w-[40%] bg-gray-50 border-r border-gray-100 p-5 overflow-y-auto">  

        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Product Images
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Upload up to 3 views of the same product
          </p>
        </div>

        {/* UPLOAD BOX */}
        <label className="group relative border border-dashed border-gray-300 hover:border-blue-500 bg-white rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer transition">

          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
            +
          </div>

          <p className="mt-3 text-sm font-medium text-gray-800">
            Upload Images
          </p>

          <span className="text-xs text-gray-400">
            Front • Side • Back
          </span>

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              handleImageUpload(e.target.files)
            }
          />
        </label>

        {/* IMAGE GRID */}
        <div className="grid grid-cols-3 gap-2 mt-4">

          {previews.map((img, index) => {
            const labels = ["Front", "Side", "Back"];

            return (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden border bg-white"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                />

                {/* LABEL */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  <span className="bg-black/70 text-white text-[9px] px-2 py-0.5 rounded-md">
                    {labels[index] || "View"}
                  </span>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white text-black text-[10px] shadow"
                >
                  ✕
                </button>
              </div>
            );
          })}

        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="w-full lg:w-[60%] p-5 flex flex-col overflow-y-auto">

        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Product Details
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Create a single product listing
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-3 flex-1">

          <input
            className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="w-full min-h-[80px] rounded-lg border border-gray-200 p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">

            <input
              className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

          </div>

          <input
            className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

             <div className="relative">
  <input
    className="w-full h-10 rounded-lg border border-gray-200 px-3 pr-12 text-sm outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Product Weight"
    type="number"
    min="0"
    value={weight}
    onChange={(e) =>
      setWeight(e.target.value)
    }
  />

  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
    kg
  </span>
</div>

        </div>


       








        {/* FOOTER */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">

          <span className="text-xs text-gray-500">
            {images.length}/3 images
          </span>

          <div className="flex gap-2">

            <Button
              onClick={onClose}
              className="!bg-gray-100 !text-gray-700 !rounded-lg px-4 h-9 text-sm"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="!bg-blue-600 hover:!bg-blue-700 !text-white !rounded-lg px-4 h-9 text-sm"
            >
              {isPending ? "Saving..." : "Save"}
            </Button>

          </div>
        </div>

      </div>
    </div>
  </div>
);

}

