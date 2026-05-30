

// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../hooks/useCart";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { totalItems } = useCart();

//   return (
//     <div className="flex justify-between items-center p-4 border-b">

//       {/* LOGO */}
//       <h1
//         className="font-bold cursor-pointer"
//         onClick={() => navigate("/buyer/home")}
//       >
//         ShopX
//       </h1>

//       {/* NAV ACTIONS */}
//       <div className="flex items-center gap-4">

//         {/* CART ICON */}
//         <button
//           onClick={() => navigate("/buyer/cart")}
//           className="relative"
//         >
//           🛒

//           {/* BADGE */}
//           {totalItems > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
//               {totalItems}
//             </span>
//           )}
//         </button>

//       </div>
//     </div>
//   );
// }