


import { useEffect, useState } from "react";

import { getVendorSecurity } from "../../services/vendor/vendor.service";

import type { VendorSecurityData } from "../../types/vendor.types"; 

export const useVendorSecurity = () => {
  const [data, setData] =
    useState<VendorSecurityData | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        const res =
          await getVendorSecurity();

        setData(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};