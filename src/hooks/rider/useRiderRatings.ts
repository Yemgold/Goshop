

import { useEffect, useState } from "react";
import { getRiderRatings } from "../../services/Rider/rider.service"; 
import type{ RiderRatings } from "../../types/rider.types";

export const useRiderRatings = () => {
  const [data, setData] = useState<RiderRatings | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getRiderRatings();
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