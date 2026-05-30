


import { useEffect, useState } from "react";
import { getRiderTransactions } from "../../services/Rider/rider.service"; 
import type{ RiderTransaction } from "../../types/rider.types";

export const useRiderTransactions = () => {
  const [data, setData] = useState<RiderTransaction[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getRiderTransactions();
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