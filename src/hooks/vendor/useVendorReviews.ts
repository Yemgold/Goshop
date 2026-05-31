

import { useEffect, useState } from "react";

import { getVendorReviews } from "../../services/vendor/vendor.service";

import type { VendorReviewsData } from "../../types/vendor/vendor.types"; 

export const useVendorReviews = () => {
  const [data, setData] =
    useState<VendorReviewsData | null>(
      null
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);

        const res =
          await getVendorReviews();

        setData(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};