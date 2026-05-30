

import { useEffect, useState } from "react";
import { getRiderPayouts } from "../../services/Rider/rider.service"; 
import type{ RiderPayout } from "../../types/rider.types";

export const useRiderPayouts = () => {
  const [data, setData] = useState<RiderPayout[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getRiderPayouts();
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