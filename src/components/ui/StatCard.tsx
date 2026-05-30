
// export function StatCard({
//   title,
//   value,
//   subtitle,
// }: {
//   title: string;
//   value: string | number;
//   subtitle?: string;
// }) {
//   return (
//     <div className="bg-white rounded-2xl shadow p-4">
//       <p className="text-sm text-gray-500">{title}</p>
//       <h2 className="text-2xl font-bold">{value}</h2>
//       {subtitle && (
//         <p className="text-xs text-gray-400">{subtitle}</p>
//       )}
//     </div>
//   );
// }



export function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden

        rounded-3xl
        border border-white/20

        bg-white/10
        backdrop-blur-xl

        p-5

        shadow-[0_8px_30px_rgba(0,0,0,0.08)]

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)]
      "
    >
      {/* TOP GLOW */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/20
          via-transparent
          to-transparent
          pointer-events-none
        "
      />

      {/* SHINE EFFECT */}
      <div
        className="
          absolute
          top-0
          left-[-120%]
          h-full
          w-[60%]
          rotate-12
          bg-white/10
          blur-2xl

          transition-all
          duration-1000

          group-hover:left-[120%]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">

        <p
          className="
            text-xs
            uppercase
            tracking-wider
            text-gray-500
            font-medium
          "
        >
          {title}
        </p>

        <h2
          className="
            mt-3
            text-3xl
            font-black
            tracking-tight
            text-gray-900
          "
        >
          {value}
        </h2>

        {subtitle && (
          <p
            className="
              mt-2
              text-sm
              text-gray-500
            "
          >
            {subtitle}
          </p>
        )}

      </div>
    </div>
  );
}