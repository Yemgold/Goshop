


import { useEffect, useState } from "react";

import { getVendorPayoutSettings } from "../../services/vendor/vendor.service";

import type { VendorPayoutSettingsData } from "../../types/vendor/vendor.types";

export const useVendorPayoutSettings = () => {
  const [data, setData] =
    useState<VendorPayoutSettingsData | null>(
      null
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        const res =
          await getVendorPayoutSettings();

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