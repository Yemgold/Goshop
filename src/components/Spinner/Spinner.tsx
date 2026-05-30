
import { useEffect, useState } from "react";

export default function Spinner() {
  const messages = [
    "Loading your experience...",
    "Preparing your dashboard...",
    "Syncing data...",
    "Almost ready...",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

      <div className="relative flex flex-col items-center">

        {/* ROTATING RING */}
        <div className="w-32 h-32 rounded-full border-4 border-transparent 
                        border-t-blue-500 border-r-purple-500 
                        animate-spin shadow-[0_0_40px_rgba(99,102,241,0.6)]">
        </div>

        {/* LOGO CENTER */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/images/logo.png"
            alt="GoShopping"
            className="w-16 h-16 object-contain drop-shadow-2xl animate-pulse"
          />
        </div>

        {/* TEXT */}
        <p className="mt-6 text-white/80 text-sm tracking-widest animate-pulse transition-all duration-300">
          {messages[index]}
        </p>

        {/* DOTS ANIMATION */}
        <div className="flex gap-1 mt-2">
          <span className="w-1 h-1 bg-white/60 rounded-full animate-bounce" />
          <span className="w-1 h-1 bg-white/60 rounded-full animate-bounce delay-150" />
          <span className="w-1 h-1 bg-white/60 rounded-full animate-bounce delay-300" />
        </div>

      </div>
    </div>
  );
}


// export default function Spinner() {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

//       <div className="relative flex flex-col items-center">

//         {/* ROTATING RING */}
//         <div className="w-32 h-32 rounded-full border-4 border-transparent 
//                         border-t-blue-500 border-r-purple-500 
//                         animate-spin shadow-[0_0_40px_rgba(99,102,241,0.6)]">
//         </div>

//         {/* LOGO CENTER (FIXED) */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <img
//             src="/images/logo.png"
//             alt="GoShopping"
//             className="w-16 h-16 object-contain drop-shadow-2xl"
//           />
//         </div>

//         {/* TEXT */}
//         <p className="mt-6 text-white/80 text-sm tracking-widest animate-pulse">
//           Loading...
//         </p>

//       </div>
//     </div>
//   );
// }