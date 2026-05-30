
import { useEffect, useState } from "react";
import { getRiderVehicle } from "../../services/Rider/rider.service"; 
import type{ RiderVehicle } from "../../types/rider.types";

export const useRiderVehicle = () => {
  const [data, setData] = useState<RiderVehicle | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getRiderVehicle();
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