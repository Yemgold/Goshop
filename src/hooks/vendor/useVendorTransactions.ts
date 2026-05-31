

import { useEffect, useState } from "react";

import { getVendorTransactions } from "../../services/vendor/vendor.service";

import type{ VendorTransactionsData } from "../../types/vendor/vendor.types"; 

export const useVendorTransactions =
  () => {
    const [data, setData] =
      useState<VendorTransactionsData | null>(
        null
      );

    const [isLoading, setIsLoading] =
      useState(true);

    const [isError, setIsError] =
      useState(false);

    useEffect(() => {
      const fetchTransactions =
        async () => {
          try {
            setIsLoading(true);

            const res =
              await getVendorTransactions();

            setData(res);
          } catch {
            setIsError(true);
          } finally {
            setIsLoading(false);
          }
        };

      fetchTransactions();
    }, []);

    return {
      data,
      isLoading,
      isError,
    };
  };