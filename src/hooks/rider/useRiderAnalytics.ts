


import { useEffect, useState } from "react";

import { getRiderAnalytics } from "../../services/Rider/rider.service"; 

import type{ RiderAnalytics } from "../../types/rider.types"; 

export const useRiderAnalytics = () => {
  const [data, setData] =
    useState<RiderAnalytics | null>(null);

  const [isLoading, setLoading] =
    useState(true);

  const [isError, setError] =
    useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const res =
          await getRiderAnalytics();

        setData(res);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { data, isLoading, isError };
};