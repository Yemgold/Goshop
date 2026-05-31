

import { useEffect, useState } from "react";

import { getVendorTaxes } from "../../services/vendor/vendor.service";

import type { VendorTaxesData } from "../../types/vendor/vendor.types"; 
export const useVendorTaxes = () => {
  const [data, setData] =
    useState<VendorTaxesData | null>(
      null
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        setIsLoading(true);

        const res =
          await getVendorTaxes();

        setData(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaxes();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};