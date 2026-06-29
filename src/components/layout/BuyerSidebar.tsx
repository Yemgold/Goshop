




// import { ProSidebar } from "./ProSidebar";

// import {
//   LayoutDashboard,
//   ShoppingCart,
//   ShoppingBag,
//   Plus,
//   Heart,
//   PackageCheck,
//   Store,
//   Search,
//   Gift,
//   CreditCard,
//   Ticket,
  
//   Star,
//   User,
//   Settings,
// } from "lucide-react";

// import type { PartnerRole } from "../../types/roles";

// type Props = {
//   onAddPartner: () => void;
//   roles: PartnerRole[];
// };

// export function BuyerSidebar({
//   onAddPartner,
//   roles,
// }: Props) {
//   // ================= CHECK IF USER CAN STILL UPGRADE =================
//   const canUpgrade = roles.length < 4;

//   return (
//     <ProSidebar
//       title="User Hub"
//       menu={[
//         // ================= SHOPPING =================
//         {
//           label: "Shopping",
//           icon: <ShoppingBag size={18} />,
//           children: [
//             {
//               label: "Home",
//               path: "/buyers/home",
//               icon: <LayoutDashboard size={18} />,
//             },
//             {
//               label: "Browse Products",
//               path: "/buyers/products",
//               icon: <Search size={18} />,
//             },
//             {
//               label: "Categories",
//               path: "/buyers/categories",
//               icon: <ShoppingBag size={18} />,
//             },
//             {
//               label: "Deals & Discounts",
//               path: "/buyers/deals",
//               icon: <Star size={18} />,
//             },
//           ],
//         },

//         // ================= ORDERS =================
//         {
//           label: "Orders",
//           icon: <PackageCheck size={18} />,
//           children: [
//             {
//               label: "My Orders",
//               path: "/buyers/orders",
//               icon: <PackageCheck size={18} />,
//             },
//             {
//               label: "Order Tracking",
//               path: "/buyers/orders/tracking",
//               icon: <Search size={18} />,
//             },
//             {
//               label: "Returns & Refunds",
//               path: "/buyers/returns",
//               icon: <PackageCheck size={18} />,
//             },
//           ],
//         },

//         // ================= CART =================
//         {
//           label: "Cart & Wishlist",
//           icon: <ShoppingCart size={18} />,
//           children: [
//             {
//               label: "My Cart",
//               path: "/buyers/cart",
//               icon: <ShoppingCart size={18} />,
//             },
//             {
//               label: "Wishlist",
//               path: "/buyers/wishlist",
//               icon: <Heart size={18} />,
//             },
//           ],
//         },

//         // ================= ACCOUNT =================
//         {
//           label: "Account",
//           icon: <User size={18} />,
//           children: [
//             {
//               label: "Profile",
//               path: "/buyers/profile",
//               icon: <User size={18} />,
//             },
//             {
//               label: "Settings",
//               path: "/buyers/settings",
//               icon: <Settings size={18} />,
//             },
//           ],
//         },
//         // ================= GIFT CARD =================
        

//         {
//   label: "Gift Card",
//   icon: <Gift size={18} />,
//   children: [
//     {
//       label: "Redeem Card",
//       path: "/buyers/redeem/card",
//       icon: <CreditCard size={18} />,
//     },
//     {
//       label: "Activate Card",
//       path: "/buyers/activate/card",
//       icon: <Ticket size={18} />,
//     },
//     {
//       label: "GiftCard Store",
//       path: "/buyers/giftcard/store",
//       icon: <Store size={18} />,
//     },
//   ],
// }
//       ]}


      





//       footer={

       

//         canUpgrade ? (
//           <div className="p-2 border-t">


//             <button
//               onClick={onAddPartner}
//               className="
//                 w-full
//                 flex
//                 items-center
//                 justify-center
//                 gap-2
//                 px-3
//                 py-2
//                 rounded-lg
//                 bg-black
//                 text-white
//                 text-sm
//                 hover:opacity-90
//                 transition
//               "
//             >
//               <Plus size={16} />
//               Become Partner
//             </button>

//           </div>

//         ) : null
//       }   
//     />

    
//   );
// }












import { ProSidebar } from "./ProSidebar";

import {
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  Plus,
  Heart,
  PackageCheck,
  Store,
 
  Gift,
  Ticket,
  Star,
  User,
  Settings,
  Bike,
} from "lucide-react";

import type { PartnerRole } from "../../types/roles";

type Props = {
  onAddPartner: () => void;
  onBecomeRider: () => void;
  roles: PartnerRole[];
};

export function BuyerSidebar({
  onAddPartner,
  onBecomeRider,
  roles,
}: Props) {
  const canUpgrade = roles.length < 4;

  return (
    <ProSidebar
      title="User Hub"
      menu={[
        {
          label: "Shopping",
          icon: <ShoppingBag size={18} />,
          children: [
            {
              label: "Home",
              path: "/buyers/dashboard",
              icon: <LayoutDashboard size={18} />,
            },

        
            
            {
              label: "Categories",
              path: "/buyers/categories",
              icon: <ShoppingBag size={18} />,
            },
            {
              label: "Deals & Discounts",
              path: "/buyers/deals",
              icon: <Star size={18} />,
            },
          ],
        },

        {
          label: "Orders",
          icon: <PackageCheck size={18} />,
          children: [
            {
              label: "My Orders",
              path: "/buyers/orders",
              icon: <PackageCheck size={18} />,
            },
           
            {
              label: "Returns & Refunds",
              path: "/buyers/returns",
              icon: <PackageCheck size={18} />,
            },
          ],
        },

        {
          label: "Cart & Wishlist",
          icon: <ShoppingCart size={18} />,
          children: [
            {
              label: "My Cart",
              path: "/buyers/cart",
              icon: <ShoppingCart size={18} />,
            },
            {
              label: "Wishlist",
              path: "/buyers/wishlist",
              icon: <Heart size={18} />,
            },
          ],
        },

        {
          label: "Account",
          icon: <User size={18} />,
          children: [
            {
              label: "Profile",
              path: "/buyers/profile",
              icon: <User size={18} />,
            },
            {
              label: "Settings",
              path: "/buyers/settings",
              icon: <Settings size={18} />,
            },
          ],
        },

        {
          label: "Gift Card",
          icon: <Gift size={18} />,
          children: [
          
            {
              label: "Activate Card",
              path: "/buyers/activate/card",
              icon: <Ticket size={18} />,
            },
            {
              label: "GiftCard Store",
              path: "/buyers/giftcard/store",
              icon: <Store size={18} />,
            },
          ],
        },
      ]}
      footer={
        <div className="p-3 border-t space-y-3">
          {/* Become Rider */}
          <button
            onClick={onBecomeRider}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              px-3
              py-2
              rounded-lg
              bg-green-600
              text-white
              text-sm
              hover:bg-green-700
              transition
            "
          >
            <Bike size={16} />
            Become a Rider
          </button>

          {/* Become Partner */}
          {canUpgrade && (
            <button
              onClick={onAddPartner}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                px-3
                py-2
                rounded-lg
                bg-black
                text-white
                text-sm
                hover:opacity-90
                transition
              "
            >
              <Plus size={16} />
              Become Partner
            </button>
          )}
        </div>
      }
    />
  );
}