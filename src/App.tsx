


import { useEffect, useState } from "react";
import { useAuthStore } from "./store/auth.store";
import AppRouter from "./app/router/AppRouter";

import Spinner from "./components/Spinner/Spinner";
import { useUIStore } from "./store/ui.store";

export default function App() {
  const rehydrateAuth = useAuthStore((s) => s.rehydrateAuth);
  const loading = useUIStore((s) => s.loading);

  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const init = async () => {
      await rehydrateAuth(); // 🔥 REAL LOGIN RESTORE
      setBooting(false);
    };

    init();
  }, [rehydrateAuth]);

  if (booting) {
    return <Spinner />;
  }

  return (
    <>
      <AppRouter />
      {loading && <Spinner />}
    </>
  );
}