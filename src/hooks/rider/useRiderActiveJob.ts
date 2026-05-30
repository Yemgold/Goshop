

import { useEffect, useState } from "react";
import { getRiderActiveJob } from "../../services/Rider/rider.service"; 
import type { RiderActiveJob } from "../../types/rider.types"; 

export const useRiderActiveJob = () => {
  const [data, setData] = useState<RiderActiveJob | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getRiderActiveJob();
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