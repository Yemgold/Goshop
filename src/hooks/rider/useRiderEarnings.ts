

import { useEffect, useState } from "react";
import { getRiderEarnings } from "../../services/Rider/rider.service"; 
import type { RiderEarnings } from "../../types/rider.types";

export const useRiderEarnings = () => {
  const [data, setData] = useState<RiderEarnings | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getRiderEarnings();
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