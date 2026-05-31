

import { useEffect, useState } from "react";

import { getVendorReturns } from "../../services/vendor/vendor.service";

import type{ VendorReturnsData } from "../../types/vendor/vendor.types";

export const useVendorReturns = () => {
  const [data, setData] =
    useState<VendorReturnsData | null>(
      null
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        setIsLoading(true);

        const res =
          await getVendorReturns();

        setData(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReturns();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};