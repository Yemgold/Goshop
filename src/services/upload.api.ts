


import { apiClient } from "../api/core/api.client";

export const uploadProductImages = async (files: File[]) => {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const { data } = await apiClient.post(
      "/upload/images",
      formData
    );

    console.log("UPLOAD SUCCESS:", data);

    return data.urls;
  } catch (err) {
    console.error("UPLOAD FAILED:", err);
    throw err;
  }
};