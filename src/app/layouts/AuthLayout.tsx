

import type { ReactNode } from "react";
import { theme } from "../../styles/theme";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${theme.background}`}
    >
      {/* 🌈 BACKGROUND ORB EFFECTS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full bottom-[-200px] right-[-200px]" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full top-[40%] left-[50%]" />
      </div>

      {/* 🧊 AUTH CARD */}
      <div
        className={`
          relative w-full max-w-md
          ${theme.glass}
          rounded-2xl
          shadow-2xl
          p-6
        `}
      >
        {children}
      </div>
    </div>
  );
}