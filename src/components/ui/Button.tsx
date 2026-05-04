import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "danger" | "outline"| "ghost" | "secondary"
  disabled?: boolean;
  className?: string; // ✅ ADD THIS
};

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  className = "",
}: Props) {
  const base =
    "px-4 py-2 rounded font-medium transition text-sm";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-black hover:bg-gray-100",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    secondary: "bg-transparent text-gray-700 hover:bg-gray-100"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}