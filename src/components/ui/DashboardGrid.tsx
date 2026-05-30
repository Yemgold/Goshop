

// export function DashboardGrid({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {children}
//     </div>
//   );
// }



import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function DashboardGrid({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        relative
        
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        
        gap-5
        md:gap-6
        
        auto-rows-fr
        
        ${className}
      `}
    >
      {/* subtle background glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          bg-gradient-to-br
          from-white/5
          via-transparent
          to-black/5
          blur-3xl
        "
      />

      {children}
    </div>
  );
}