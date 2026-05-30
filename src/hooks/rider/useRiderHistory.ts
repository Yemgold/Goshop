

import { useEffect, useState } from "react";
import { getRiderHistory } from "../../services/Rider/rider.service";
import type { RiderHistoryItem } from "../../types/rider.types";

export const useRiderHistory = () => {
  const [data, setData] = useState<RiderHistoryItem[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getRiderHistory();
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