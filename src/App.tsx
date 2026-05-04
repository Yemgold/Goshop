
import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store";
import AppRouter from "./app/router/AppRouter";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <>
      <AppRouter />

      {/* GLOBAL TOAST SYSTEM */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}


