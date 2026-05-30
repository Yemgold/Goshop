

// export function SectionCard({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="bg-white rounded-2xl shadow p-4">
//       <h3 className="font-semibold mb-3">{title}</h3>
//       {children}
//     </div>
//   );
// }



import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  children,
  action,
  className = "",
}: Props) {
  return (
    <section
      className={`
        relative
        overflow-hidden
        rounded-3xl

        bg-white/10
        backdrop-blur-xl

        border border-white/20

        shadow-[0_8px_32px_rgba(0,0,0,0.12)]

        transition-all
        duration-300

        hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)]

        ${className}
      `}
    >
      {/* glow background */}
      <div
        className="
          absolute
          -top-20
          -right-20
          w-52
          h-52
          bg-white/10
          blur-3xl
          rounded-full
          pointer-events-none
        "
      />

      {/* glossy overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/15
          via-transparent
          to-transparent
          pointer-events-none
        "
      />

      {/* header */}
      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          px-6
          py-5
          border-b
          border-white/10
        "
      >
        <div className="flex items-center gap-3">

          {/* accent dot */}
          <div
            className="
              w-3
              h-3
              rounded-full
              bg-black
              shadow-[0_0_12px_rgba(0,0,0,0.4)]
            "
          />

          <h3
            className="
              text-lg
              font-bold
              tracking-tight
              text-gray-900
            "
          >
            {title}
          </h3>

        </div>

        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>

      {/* body */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </section>
  );
}