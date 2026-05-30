

import { useEffect, useState } from "react";

import { getVendorStore } from "../../services/vendor/vendor.service";

import type { VendorStoreData } from "../../types/vendor.types";

export const useVendorStore = () => {
  const [data, setData] =
    useState<VendorStoreData | null>(
      null
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setIsLoading(true);

        const res =
          await getVendorStore();

        setData(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStore();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};