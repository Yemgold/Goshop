

import { useEffect, useState } from "react";

import { getVendorCustomers } from "../../services/vendor/vendor.service";

import type { VendorCustomersData } from "../../types/vendor.types"; 

export const useVendorCustomers = () => {
  const [data, setData] =
    useState<VendorCustomersData | null>(
      null
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);

        const res =
          await getVendorCustomers();

        setData(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};