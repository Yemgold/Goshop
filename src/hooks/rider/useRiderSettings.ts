
import { useEffect, useState } from "react";
import { getRiderSettings } from "../../services/Rider/rider.service"; 
import type{ RiderSettings } from "../../types/rider.types";

export const useRiderSettings = () => {
  const [data, setData] = useState<RiderSettings | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getRiderSettings();
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