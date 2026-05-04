

// import React from "react";

// export function Card({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <div
//       className={`bg-white rounded-lg shadow p-4 ${className}`}
//     >
//       {children}
//     </div>
//   );
// }



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
      className={`bg-white rounded-xl shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};