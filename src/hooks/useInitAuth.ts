import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export const useInitAuth = () => {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, []);
};