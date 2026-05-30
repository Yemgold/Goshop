
import { useEffect, useState } from "react";
import { getRiderSupportTickets } from "../../services/Rider/rider.service"; 
import type{ RiderSupportTicket } from "../../types/rider.types";

export const useRiderSupportTickets = () => {
  const [data, setData] = useState<RiderSupportTicket[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getRiderSupportTickets();
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