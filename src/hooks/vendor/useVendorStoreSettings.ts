

import { useEffect, useState } from "react";

import { getVendorStoreSettings } from "../../services/vendor/vendor.service";

import type{ VendorStoreSettingsData } from "../../types/vendor.types";

export const useVendorStoreSettings =
  () => {
    const [data, setData] =
      useState<VendorStoreSettingsData | null>(
        null
      );

    const [isLoading, setIsLoading] =
      useState(true);

    const [isError, setIsError] =
      useState(false);

    useEffect(() => {
      const fetchSettings = async () => {
        try {
          setIsLoading(true);

          const res =
            await getVendorStoreSettings();

          setData(res);
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSettings();
    }, []);

    return {
      data,
      isLoading,
      isError,
    };
  };