

import { useEffect, useState } from "react";
import { getRiderZones } from "../../services/Rider/rider.service"; 
import type{ RiderZone } from "../../types/rider.types";

export const useRiderZones = () => {
  const [data, setData] = useState<RiderZone[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getRiderZones();
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