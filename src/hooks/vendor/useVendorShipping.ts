

import { useEffect, useState } from "react";

import { getVendorShipping } from "../../services/vendor/vendor.service";

import type{ VendorShippingData } from "../../types/vendor/vendor.types"; 

export const useVendorShipping = () => {
  const [data, setData] =
    useState<VendorShippingData | null>(
      null
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        setIsLoading(true);

        const res =
          await getVendorShipping();

        setData(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShipping();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};