






// import React from "react";

// type Props = {
//   children: React.ReactNode;
//   onClick?: () => void;
//   variant?: "primary" | "danger" | "outline"| "ghost" | "secondary"
//   disabled?: boolean;
//   className?: string; // ✅ ADD THIS
// };

// export function Button({
//   children,
//   onClick,
//   variant = "primary",
//   disabled,
//   className = "",
// }: Props) {
//   const base =
//     "px-4 py-2 rounded font-medium transition text-sm";

//   const variants = {
//     primary: "bg-black text-white hover:bg-gray-800",
//     danger: "bg-red-600 text-white hover:bg-red-700",
//     outline: "border border-gray-300 text-black hover:bg-gray-100",
//     ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
//     secondary: "bg-transparent text-gray-700 hover:bg-gray-100"
    
//   };

  

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`${base} ${variants[variant]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// }




import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "primary"
    | "danger"
    | "outline"
    | "ghost"
    | "secondary";

  disabled?: boolean;
  className?: string;
};

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  className = "",
}: Props) {

  /* ================= BASE ================= */

  const base = `
    relative
    overflow-hidden
    px-5
    py-3
    rounded-2xl
    font-semibold
    text-sm
    transition-all
    duration-300
    active:scale-[0.98]
    hover:scale-[1.02]

    before:absolute
    before:inset-0
    before:bg-gradient-to-r
    before:from-transparent
    before:via-white/40
    before:to-transparent
    before:-translate-x-full
    hover:before:translate-x-full
    before:transition-transform
    before:duration-1000
  `;

  /* ================= VARIANTS ================= */

  const variants = {

    primary: `
      bg-black
      text-white
      hover:bg-gray-900
      shadow-lg
      shadow-black/20
    `,

    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
      shadow-lg
      shadow-red-500/20
    `,

    outline: `
      border
      border-gray-300
      bg-white
      text-black
      hover:bg-gray-50
    `,

    ghost: `
      bg-transparent
      text-gray-700
      hover:bg-gray-100
    `,

    secondary: `
      bg-gray-100
      text-gray-800
      hover:bg-gray-200
    `,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${base}
        ${variants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >

      {/* CONTENT */}
      <span className="relative z-10">
        {children}
      </span>

    </button>
  );
}