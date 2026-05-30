

import { useEffect, useState } from "react";

import { getRiderJobs } from "../../services/Rider/rider.service";

import type { Order } from "../../types/rider.types";

export const useRiderJobs = () => {
  const [data, setData] = useState<Order[]>([]);

  const [isLoading, setLoading] =
    useState(true);

  const [isError, setError] =
    useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        setError(false);

        const res = await getRiderJobs();

        setData(res);
      } catch (error) {
        console.error(error);

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};