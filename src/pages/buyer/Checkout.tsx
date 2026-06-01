
import { useQuery } from "@tanstack/react-query";
import { buyerService } from "../../services/buyer.api.service";
import { useCartStore } from "../../store/cart.store";
import { useAuthStore } from "../../store/auth.store";
import { useCheckout } from "../../hooks/buyer/useCheckout";

import { useCheckoutForm } from "../../hooks/buyer/useCheckoutForm";
import { useMultiCartSummary } from "../../hooks/vendor/useMultiCartSummary";
import { useMultiVendorShipping } from "../../hooks/vendor/useMultiVendorShipping";

export default function Checkout() {
  const user = useAuthStore((s) => s.user);
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  /* PRODUCTS */
  const { data: productsRaw = [] } = useQuery({
    queryKey: ["products"],
    queryFn: buyerService.getProducts,
  });

  const products = Array.isArray(productsRaw)
    ? productsRaw
    : (productsRaw as any)?.data ?? [];

  /* FORM */
  const form = useCheckoutForm();

  /* MULTI VENDOR CART */
  const cart = useMultiCartSummary(items, products);

  // const shippingDoc = await getVendorShipping(
  // vendor.businessId,
  // customerState

// );

// function calculateShipping(weight: number, ranges: any[]) {
//   const match = ranges.find(
//     (r) => weight >= r.min && (r.max === null || weight <= r.max)
//   );

//   return match?.price || 0;
// }


// const shippingFee = vendor.items.reduce((sum, item) => {
//   return sum + calculateShipping(item.weight, shippingDoc.weightRanges);
// }, 0);

  /* SHIPPING PER VENDOR */
  const vendorsWithShipping = useMultiVendorShipping(
    cart.vendors,
    form.selectedState
  );

  /* GRAND TOTAL */
  const grandTotal = vendorsWithShipping.reduce(
    (sum: number, v: any) =>
      sum + v.subtotal + (v.shippingFee || 0),
    0
  );

  const subtotal = cart.total;

  /* CHECKOUT HOOK */
  const { placeOrder, isPending } = useCheckout();

  /* PLACE ORDER */
  const handlePlaceOrder = async () => {
    if (!items.length) return;

    const payload = {
      buyerId: user?.id!,
      deliveryMode: form.deliveryMode,
      address: form.address,
      city: form.selectedTown,
      contactPhone: form.phone,

      vendors: vendorsWithShipping.map((v: any) => ({
        businessId: v.businessId,
        items: v.items,
        subtotal: v.subtotal,
        shippingFee: v.shippingFee || 0,
        total: v.subtotal + (v.shippingFee || 0),
      })),

      grandTotal,
    };

    await placeOrder(payload);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold">
        Multi-Vendor Checkout
      </h1>

      {/* SUMMARY */}
      <div className="mt-4 space-y-2">
        <p>Subtotal: ₦{subtotal.toLocaleString()}</p>
        <p>
          Shipping: ₦
          {(grandTotal - subtotal).toLocaleString()}
        </p>
        <p className="font-bold">
          Grand Total: ₦{grandTotal.toLocaleString()}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex gap-3">
        <button onClick={form.back}>
          Back
        </button>

        <button onClick={form.next}>
          Next
        </button>

        <button
          onClick={handlePlaceOrder}
          disabled={isPending}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {isPending ? "Processing..." : "Place Order"}
        </button>
      </div>

      {/* VENDOR BREAKDOWN */}
      <div className="mt-8 space-y-6">
        {vendorsWithShipping.map((vendor: any) => (
          <div
            key={vendor.businessId}
            className="border rounded-lg p-4 bg-white"
          >
            <h3 className="font-bold mb-2">
              Vendor: {vendor.businessId}
            </h3>

            {vendor.items.map((item: any) => (
              <div
                key={item.productId}
                className="flex justify-between py-1"
              >
                <p>{item.productId}</p>

                <button
                  onClick={() =>
                    removeFromCart(item.productId)
                  }
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-3 text-sm space-y-1">
              <p>
                Subtotal: ₦
                {vendor.subtotal.toLocaleString()}
              </p>

              <p>
                Shipping: ₦
                {(vendor.shippingFee || 0).toLocaleString()}
              </p>

              <p className="font-bold">
                Total: ₦
                {(
                  vendor.subtotal +
                  (vendor.shippingFee || 0)
                ).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}































































// import { useState, useMemo, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";

// import { buyerService } from "../../services/buyer.api.service";
// import { useCartStore } from "../../store/cart.store";
// import { useAuthStore } from "../../store/auth.store";
// import { useCheckout } from "../../hooks/buyer/useCheckout";
// import { getBuyerProductByIdAPI } from "../../api/user/buyer.api";

// import { states } from "../../data/states";
// import { townsByState } from "../../data/towns";



// type DeliveryMode = "office" | "home" | null;
// type Step = 1 | 2 | 3 | 4;

// type PickupCenter = {
//   _id: string;
//   name: string;
//   state: string;
//   town: string;
//   address: string;
//   phone: string;
//   isActive: boolean;
//   isMainHub: boolean;
// };

// export default function Checkout() {
//   const user = useAuthStore((s) => s.user);
//   const items = useCartStore((s) => s.items);

//   const removeFromCart = useCartStore(
//     (s) => s.removeFromCart
//   );

//   const { data: productsRaw = [] } = useQuery({
//     queryKey: ["products"],
//     queryFn: buyerService.getProducts,
//   });

//   const products = Array.isArray(productsRaw)
//     ? productsRaw
//     : (productsRaw as any)?.data ?? [];

//   const [step, setStep] = useState<Step>(1);

//   const [deliveryMode, setDeliveryMode] =
//     useState<DeliveryMode>(null);

//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");

//   const [selectedState, setSelectedState] =
//     useState("");

//   const [selectedTown, setSelectedTown] =
//     useState("");

//   const [vendorInfo, setVendorInfo] =
//     useState<{
//       state: string;
//       town: string;
//     } | null>(null);

//   /* PICKUP CENTERS */
//   const [pickupCenters, setPickupCenters] =
//     useState<PickupCenter[]>([]);

//   const [
//     selectedPickupCenter,
//     setSelectedPickupCenter,
//   ] = useState<PickupCenter | null>(null);

//   /* FEES */
//   const [pickupFee, setPickupFee] =
//     useState(0);

//   /* AUTO FILL PHONE */
//   useEffect(() => {
//     if (user?.phone) {
//       setPhone(user.phone);
//     }
//   }, [user]);

//   /* FETCH VENDOR */
//   useEffect(() => {
//     const fetchVendor = async () => {
//       if (!items.length) return;

//       try {
//         const firstItem = items[0] as any;

//         const product =
//           await getBuyerProductByIdAPI(
//             firstItem.productId
//           );

//         const business = product?.businessId;

//         setVendorInfo({
//           state:
//             business?.businessAddress?.state ??
//             "Unknown State",

//           town:
//             business?.businessAddress?.town ??
//             "Unknown Town",
//         });

//         /* PICKUP DELIVERY FEE */
//         if (
//           selectedState &&
//           Array.isArray(product?.deliveryRules)
//         ) {
//           const matchedRule =
//             product.deliveryRules.find(
//               (rule: any) =>
//                 rule.state
//                   ?.toLowerCase()
//                   .trim() ===
//                 selectedState
//                   ?.toLowerCase()
//                   .trim()
//             );

//           setPickupFee(
//             matchedRule?.price || 0
//           );
//         }
//       } catch {
//         setVendorInfo({
//           state: "Unknown State",
//           town: "Unknown Town",
//         });

//         setPickupFee(0);
//       }
//     };

//     fetchVendor();
//   }, [items, selectedState]);

//   /* FETCH PICKUP CENTERS */
//   useEffect(() => {
//     const fetchPickupCenters =
//       async () => {
//         if (!selectedState) {
//           setPickupCenters([]);
//           return;
//         }

//         try {
//           const response = await fetch(
//             `/pickup-center/get-state-pickup-centers/${selectedState.toLowerCase()}`
//           );

//           const data = await response.json();

//           if (data?.success) {
//             setPickupCenters(data.data || []);
//           }
//         } catch (error) {
//           console.log(error);
//           setPickupCenters([]);
//         }
//       };

//     fetchPickupCenters();
//   }, [selectedState]);

//   /* CHECKOUT */
//   const { placeOrder, isPending } =
//     useCheckout({
//       address,
//       city: selectedTown,
//       contactPhone: phone,
//       deliveryMode,
//     });

//   /* ENRICH ITEMS */
//   const enrichedItems = useMemo(() => {
//     if (
//       !Array.isArray(items) ||
//       !Array.isArray(products)
//     )
//       return [];

//     return items.map((cartItem) => {
//       const product = products.find(
//         (p: any) =>
//           (p._id || p.id) ===
//           cartItem.productId
//       );

//       return {
//         productId: cartItem.productId,
//         quantity: cartItem.quantity,
//         name: product?.name ?? "Product",
//         price: product?.price ?? 0,
//         image:
//           product?.media?.[0]?.url ??
//           "/placeholder.png",
//       };
//     });
//   }, [items, products]);

//   /* TOTAL */
//   const total = useMemo(() => {
//     return enrichedItems.reduce(
//       (sum, item) =>
//         sum +
//         item.price * item.quantity,
//       0
//     );
//   }, [enrichedItems]);

//   /* HOME DELIVERY FEE */
//   const homeDeliveryFee = useMemo(() => {
//     if (deliveryMode !== "home")
//       return 0;

//     if (!selectedState) return 0;

//     if (!vendorInfo) return 0;

//     /* SAME STATE */
//     if (
//       selectedState.toLowerCase() ===
//       vendorInfo.state.toLowerCase()
//     ) {
//       return 2000;
//     }

//     /* DIFFERENT STATE */
//     return 4000;
//   }, [
//     deliveryMode,
//     selectedState,
//     vendorInfo,
//   ]);

//   /* FINAL DELIVERY FEE */
//   const deliveryFee = useMemo(() => {
//     if (deliveryMode === "home") {
//       return homeDeliveryFee;
//     }

//     if (deliveryMode === "office") {
//       return pickupFee;
//     }

//     return 0;
//   }, [
//     deliveryMode,
//     homeDeliveryFee,
//     pickupFee,
//   ]);

//   const grandTotal =
//     total + deliveryFee;

//   /* VALIDATION */
//   const canGoNextStep = () => {
//     if (step === 1)
//       return !!deliveryMode;

//     if (step === 2) {
//       /* PICKUP CENTER */
//       if (deliveryMode === "office") {
//         return (
//           selectedState.length > 1 &&
//           selectedPickupCenter !==
//             null &&
//           phone.length >= 8
//         );
//       }

//       /* HOME DELIVERY */
//       if (deliveryMode === "home") {
//         return (
//           address.length > 4 &&
//           selectedState.length > 1 &&
//           selectedTown.length > 1 &&
//           phone.length >= 8
//         );
//       }
//     }

//     return true;
//   };

//   const next = () => {
//     if (!canGoNextStep()) return;

//     setStep((s) =>
//       s < 4
//         ? ((s + 1) as Step)
//         : s
//     );
//   };

//   const back = () => {
//     setStep((s) =>
//       s > 1
//         ? ((s - 1) as Step)
//         : s
//     );
//   };

//   const handlePlaceOrder =
//     async () => {
//       if (!items.length) return;

//       await placeOrder();
//     };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* LEFT */}
//         <div className="lg:col-span-2 space-y-6">

//           {/* HEADER */}
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               Checkout
//             </h1>

//             <p className="text-sm text-gray-500 mt-1">
//               Complete your order
//               securely
//             </p>
//           </div>

//           {/* STEPS */}
//           <div className="flex items-center gap-3 overflow-x-auto pb-1">

//             {[
//               "Delivery",
//               "Address",
//               "Summary",
//               "Payment",
//             ].map((label, index) => {
//               const current =
//                 index + 1;

//               return (
//                 <div
//                   key={label}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm whitespace-nowrap transition-all ${
//                     step === current
//                       ? "bg-black text-white border-black"
//                       : "bg-white text-gray-500"
//                   }`}
//                 >
//                   <div
//                     className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
//                       step === current
//                         ? "bg-white text-black"
//                         : "bg-gray-100 text-gray-500"
//                     }`}
//                   >
//                     {current}
//                   </div>

//                   <span>{label}</span>
//                 </div>
//               );
//             })}
//           </div>

//           {/* CARD */}
//           <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 md:p-8">

//             {/* STEP 1 */}
//             {step === 1 && (
//               <div className="space-y-6">

//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     Choose Delivery
//                     Method
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   {/* PICKUP */}
//                   <button
//                     onClick={() =>
//                       setDeliveryMode(
//                         "office"
//                       )
//                     }
//                     className={`border rounded-2xl p-5 text-left transition-all ${
//                       deliveryMode ===
//                       "office"
//                         ? "border-black bg-black text-white"
//                         : "bg-white hover:border-gray-400"
//                     }`}
//                   >
//                     <h3 className="font-semibold text-base">
//                       Pickup Center
//                     </h3>

//                     <p className="text-sm opacity-70 mt-2">
//                       Collect your
//                       package from a
//                       pickup center
//                     </p>
//                   </button>

//                   {/* HOME */}
//                   <button
//                     onClick={() =>
//                       setDeliveryMode(
//                         "home"
//                       )
//                     }
//                     className={`border rounded-2xl p-5 text-left transition-all ${
//                       deliveryMode ===
//                       "home"
//                         ? "border-black bg-black text-white"
//                         : "bg-white hover:border-gray-400"
//                     }`}
//                   >
//                     <h3 className="font-semibold text-base">
//                       Home Delivery
//                     </h3>

//                     <p className="text-sm opacity-70 mt-2">
//                       Delivered to
//                       your address
//                     </p>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 2 */}
//             {step === 2 && (
//               <div className="space-y-6">

//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-900">
//                     Delivery Details
//                   </h2>
//                 </div>

//                 <div className="space-y-5">

//                   {/* STATE */}
//                   <div>
//                     <label className="text-sm font-medium text-gray-700 mb-2 block">
//                       State
//                     </label>

//                     <select
//                       value={
//                         selectedState
//                       }
//                       onChange={(e) => {
//                         setSelectedState(
//                           e.target.value
//                         );

//                         setSelectedTown(
//                           ""
//                         );

//                         setSelectedPickupCenter(
//                           null
//                         );
//                       }}
//                       className="border border-gray-200 rounded-xl p-3 w-full"
//                     >
//                       <option value="">
//                         Select State
//                       </option>

//                       {states.map(
//                         (state) => (
//                           <option
//                             key={
//                               state.id
//                             }
//                             value={
//                               state.name
//                             }
//                           >
//                             {
//                               state.name
//                             }
//                           </option>
//                         )
//                       )}
//                     </select>
//                   </div>

//                   {/* PICKUP CENTER */}
//                   {deliveryMode ===
//                     "office" && (
//                     <div>
//                       <label className="text-sm font-medium text-gray-700 mb-2 block">
//                         Pickup Center
//                       </label>

//                       <select
//                         value={
//                           selectedPickupCenter?._id ||
//                           ""
//                         }
//                         onChange={(
//                           e
//                         ) => {
//                           const center =
//                             pickupCenters.find(
//                               (
//                                 c
//                               ) =>
//                                 c._id ===
//                                 e
//                                   .target
//                                   .value
//                             );

//                           setSelectedPickupCenter(
//                             center ||
//                               null
//                           );
//                         }}
//                         className="border border-gray-200 rounded-xl p-3 w-full"
//                       >
//                         <option value="">
//                           Select Pickup
//                           Center
//                         </option>

//                         {pickupCenters.map(
//                           (
//                             center
//                           ) => (
//                             <option
//                               key={
//                                 center._id
//                               }
//                               value={
//                                 center._id
//                               }
//                             >
//                               {
//                                 center.name
//                               }{" "}
//                               -{" "}
//                               {
//                                 center.town
//                               }
//                             </option>
//                           )
//                         )}
//                       </select>

//                       {selectedPickupCenter && (
//                         <div className="mt-3 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm">
//                           <p>
//                             <strong>
//                               Address:
//                             </strong>{" "}
//                             {
//                               selectedPickupCenter.address
//                             }
//                           </p>

//                           <p className="mt-1">
//                             <strong>
//                               Phone:
//                             </strong>{" "}
//                             {
//                               selectedPickupCenter.phone
//                             }
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* HOME DELIVERY */}
//                   {deliveryMode ===
//                     "home" && (
//                     <>
//                       {/* TOWN */}
//                       <div>
//                         <label className="text-sm font-medium text-gray-700 mb-2 block">
//                           Town
//                         </label>

//                         <select
//                           value={
//                             selectedTown
//                           }
//                           onChange={(
//                             e
//                           ) =>
//                             setSelectedTown(
//                               e
//                                 .target
//                                 .value
//                             )
//                           }
//                           disabled={
//                             !selectedState
//                           }
//                           className="border border-gray-200 rounded-xl p-3 w-full"
//                         >
//                           <option value="">
//                             Select Town
//                           </option>

//                           {townsByState[
//                             selectedState
//                           ]?.map(
//                             (
//                               town
//                             ) => (
//                               <option
//                                 key={
//                                   town
//                                 }
//                                 value={
//                                   town
//                                 }
//                               >
//                                 {
//                                   town
//                                 }
//                               </option>
//                             )
//                           )}
//                         </select>
//                       </div>

//                       {/* ADDRESS */}
//                       <div>
//                         <label className="text-sm font-medium text-gray-700 mb-2 block">
//                           Delivery
//                           Address
//                         </label>

//                         <input
//                           className="border border-gray-200 rounded-xl p-3 w-full"
//                           value={
//                             address
//                           }
//                           onChange={(
//                             e
//                           ) =>
//                             setAddress(
//                               e
//                                 .target
//                                 .value
//                             )
//                           }
//                           placeholder="Enter full address"
//                         />
//                       </div>
//                     </>
//                   )}

//                   {/* PHONE */}
//                   <div>
//                     <label className="text-sm font-medium text-gray-700 mb-2 block">
//                       Phone Number
//                     </label>

//                     <input
//                       className="border border-gray-200 rounded-xl p-3 w-full"
//                       value={phone}
//                       onChange={(e) =>
//                         setPhone(
//                           e.target.value
//                         )
//                       }
//                       placeholder="08012345678"
//                     />
//                   </div>

//                 </div>
//               </div>
//             )}

//             {/* STEP 3 */}
//             {step === 3 && (
//               <div className="space-y-4">

//                 <h2 className="text-xl font-semibold">
//                   Order Summary
//                 </h2>

//                 {enrichedItems.map(
//                   (item) => (
//                     <div
//                       key={
//                         item.productId
//                       }
//                       className="flex items-center justify-between border rounded-2xl p-4"
//                     >
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={
//                             item.image
//                           }
//                           className="w-16 h-16 rounded-xl object-cover border"
//                         />

//                         <div>
//                           <p className="font-medium">
//                             {
//                               item.name
//                             }
//                           </p>

//                           <p className="text-sm text-gray-500">
//                             Qty:{" "}
//                             {
//                               item.quantity
//                             }
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-end gap-2">
//                         <p className="font-semibold text-sm">
//                           ₦
//                           {(
//                             item.price *
//                             item.quantity
//                           ).toLocaleString()}
//                         </p>

//                         <button
//                           onClick={() =>
//                             removeFromCart(
//                               item.productId
//                             )
//                           }
//                           className="text-xs text-red-500"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//             )}

//             {/* STEP 4 */}
//             {step === 4 && (
//               <div className="space-y-6">

//                 <h2 className="text-xl font-semibold">
//                   Confirm Order
//                 </h2>

//                 <button
//                   onClick={
//                     handlePlaceOrder
//                   }
//                   disabled={isPending}
//                   className="w-full bg-black text-white py-4 rounded-2xl"
//                 >
//                   {isPending
//                     ? "Processing..."
//                     : "Place Order"}
//                 </button>
//               </div>
//             )}

//             {/* NAVIGATION */}
//             <div className="flex items-center justify-between pt-6 mt-8 border-t">

//               <button
//                 onClick={back}
//                 disabled={step === 1}
//                 className="px-5 py-2.5 border rounded-xl"
//               >
//                 Back
//               </button>

//               {step < 4 && (
//                 <button
//                   onClick={next}
//                   disabled={
//                     !canGoNextStep()
//                   }
//                   className="px-6 py-2.5 bg-black text-white rounded-xl"
//                 >
//                   Continue
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="hidden lg:block">

//           <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-6">

//             <h2 className="font-semibold text-xl text-gray-900 mb-6">
//               Order Summary
//             </h2>

//             <div className="space-y-4">

//               {enrichedItems.map(
//                 (item) => (
//                   <div
//                     key={
//                       item.productId
//                     }
//                     className="flex items-center justify-between gap-3"
//                   >
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={
//                           item.image
//                         }
//                         className="w-14 h-14 rounded-xl object-cover border"
//                       />

//                       <div>
//                         <p className="text-sm font-medium">
//                           {
//                             item.name
//                           }
//                         </p>

//                         <p className="text-xs text-gray-500 mt-1">
//                           Qty:{" "}
//                           {
//                             item.quantity
//                           }
//                         </p>
//                       </div>
//                     </div>

//                     <p className="font-semibold text-sm">
//                       ₦
//                       {(
//                         item.price *
//                         item.quantity
//                       ).toLocaleString()}
//                     </p>
//                   </div>
//                 )
//               )}
//             </div>

//             {/* TOTALS */}
//             <div className="space-y-3 mt-6 pt-6 border-t border-gray-100">

//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">
//                   Subtotal
//                 </span>

//                 <span className="font-medium">
//                   ₦
//                   {total.toLocaleString()}
//                 </span>
//               </div>

//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">
//                   Delivery Fee
//                 </span>

//                 <span className="font-medium">
//                   ₦
//                   {deliveryFee.toLocaleString()}
//                 </span>
//               </div>

//               <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-100">
//                 <span>Total</span>

//                 <span>
//                   ₦
//                   {grandTotal.toLocaleString()}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
