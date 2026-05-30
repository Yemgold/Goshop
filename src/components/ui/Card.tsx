

import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Card: React.FC<Props> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl

        bg-white/10
        backdrop-blur-2xl

        border border-white/10

        shadow-[0_8px_32px_rgba(0,0,0,0.18)]

        transition-all
        duration-500

        hover:-translate-y-1
        hover:scale-[1.01]

        hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]

        ${className}
      `}
    >
      {/* gradient glow */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-white/10
          via-transparent
          to-transparent
          pointer-events-none
        "
      />

      {/* animated shine */}
      <div
        className="
          absolute
          inset-y-0
          -left-[120%]
          w-[40%]
          skew-x-12
          bg-white/10
          blur-2xl

          group-hover:left-[140%]

          transition-all
          duration-1000
        "
      />

      {/* subtle glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition
          duration-500

          bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_70%)]
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};