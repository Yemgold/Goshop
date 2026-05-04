

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type User = {
  role: string;
};

const getUser = (): User | null => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export function RoleRoute({
  role,
  children,
}: {
  role: string;
  children: ReactNode;
}) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <div style={{ padding: 20 }}>🚫 Unauthorized</div>;
  }

  return <>{children}</>;
}