

// import { useMemo, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";

// import { buyerService } from "../../services/buyer.api.service";
// import { productService } from "../../services/product.service";

// import { useCheckout } from "../../hooks/checkOut/useCheckout";
// import { useCheckoutForm } from "../../hooks/checkOut/useCheckoutForm";
// import { useMultiCartSummary } from "../../hooks/cart/useMultiCartSummary";

// import { calculateShipping } from "../../services/shipping.engine";
// import { getCollectionFeeByStateAPI } from "../../services/shipping.engine";
    

// import { getAllPickupCentersAPI } from "../../api/user/buyer.api";
// import { getBusStopsByStateAPI } from "../../api/user/buyer.api";



// import { states } from "../../data/states";
// import { townsByState } from "../../data/towns";

// export default function Checkout() {
//   const form = useCheckoutForm();

//   const nextStep = () => form.next();
//   const prevStep = () => form.back();


//   /* ================= CART ================= */

//   const { data: cartData } = useQuery({
//     queryKey: ["cart"],
//     queryFn: buyerService.getCart,
//   });

//   const items = useMemo(() => {
//     return Array.isArray(cartData?.items) ? cartData.items : [];
//   }, [cartData]);

//   /* ================= PRODUCTS ================= */

//   const { data: productsRaw } = useQuery({
//   queryKey: ["products"],
//   queryFn: () => productService.getProducts(),
// });

//   const products = useMemo(() => {
//     if (!productsRaw) return [];
//     if (Array.isArray(productsRaw)) return productsRaw;
//     if (Array.isArray((productsRaw as any)?.data)) return (productsRaw as any).data;
//     if (Array.isArray((productsRaw as any)?.products)) return (productsRaw as any).products;
//     return [];
//   }, [productsRaw]);

//   /* ================= BUS STOPS (HOME DELIVERY FEES) ================= */

//   const { data } = useQuery({
//     queryKey: ["busStops", form.selectedState],
//     queryFn: () => getBusStopsByStateAPI(form.selectedState),
//     enabled: !!form.selectedState && form.deliveryMode === "homeDelivery",
//   });

//   const busStops = data?.data || [];
//   const deliveryRates = busStops;

  

//   /* ================= PICKUP CENTERS ================= */

//   const { data: pickupResponse } = useQuery({
//     queryKey: ["pickup-centers"],
//     queryFn: getAllPickupCentersAPI,
//   });

//   const allPickupCenters = Array.isArray(pickupResponse?.data)
//     ? pickupResponse.data
//     : [];

//   const pickupCenters = useMemo(() => {
//     if (!form.selectedState) return [];

//     return allPickupCenters.filter(
//       (center: any) =>
//         center.state?.toLowerCase() === form.selectedState.toLowerCase()
//     );
//   }, [allPickupCenters, form.selectedState]);

//   /* ================= COLLECTION FEE) ================= */

//  console.log("STATE SENT TO COLLECTION API:", form.selectedState);


//  const { data: collectionFeeResponse } = useQuery({
//   queryKey: ["collection-fee", form.selectedState],

//   queryFn: async () => {
//     const state = form.selectedState?.trim();

//     if (!state) throw new Error("State is required");

//     const res = await getCollectionFeeByStateAPI(state);

//     // ✅ return ONLY inner data
//     return res.data?.data;
//   },

//   enabled: !!form.selectedState?.trim(),
//   retry: false,
//   staleTime: 1000 * 60 * 10,
//   refetchOnWindowFocus: false,
// });



//   /* ================= CART SUMMARY ================= */

//   const isReady = items.length > 0 && products.length > 0;

//   const cart = useMultiCartSummary(
//     isReady ? items : [],
//     isReady ? products : []
//   );

//   /* ================= SHIPPING ENGINE ================= */

//   const cartItems = useMemo(() => {
//     return (cart.vendors || []).flatMap((v: any) => v.items || []);
//   }, [cart.vendors]);

//   const shipping = useMemo(() => {
//     if (!form.selectedState || !form.deliveryMode) {
//       return {
//         vendors: [],
//         shippingFeeSummation: 0,
//         deliveryFeeSummation: 0,
//         totalShipping: 0,
//         totalWeight: 0,
//       };
//     }

//     return calculateShipping(
//       cartItems,
//       products,
//       form.selectedState,
//       deliveryRates,
//       form.deliveryMode
//     );
//   }, [cartItems, products, form.selectedState, form.deliveryMode, deliveryRates]);

  
//   const vendorsWithShipping = useMemo(
//   () => shipping?.vendors || [],
//   [shipping]
// );





// const collectionFee = useMemo(() => {
//   if (!collectionFeeResponse) return 0;

//   const baseFee = collectionFeeResponse.baseFee || 0;
//   const additionalFee = collectionFeeResponse.additionalFee || 0;

//   const buyerState = form.selectedState?.trim().toLowerCase();

//   const interstateVendorCount = vendorsWithShipping.filter(
//     (vendor: any) =>
//       vendor.businessState?.trim().toLowerCase() !== buyerState
//   ).length;

//   if (interstateVendorCount === 0) {
//     return 0;
//   }

//   return (
//     baseFee +
//     Math.max(0, interstateVendorCount - 1) * additionalFee
//   );
// }, [
//   collectionFeeResponse,
//   vendorsWithShipping,
//   form.selectedState,
// ]);




//   /* ================= DEBUG ================= */

 
// useEffect(() => {
//   const res = collectionFeeResponse?.data;
//   const feeData = res?.data;

//   console.log("========== CHECKOUT DEBUG ==========");

//   console.log("PRODUCTS FINAL:", products);
//   console.log("CHECKOUT ITEMS:", items);

//   console.log("STATE SELECTED:", form.selectedState);

//   console.log("CENTERS:", allPickupCenters);

//   console.log("FINAL SHIPPING:", shipping);

//   console.log("COLLECTION RAW RESPONSE:", collectionFeeResponse);

//   console.log("COLLECTION RESPONSE SUCCESS:", res?.success);

//   console.log("COLLECTION FEE DATA:", feeData);

//   console.log(
//     "COLLECTION FEE VALUE:",
//     (feeData?.baseFee ?? 0) + (feeData?.additionalFee ?? 0)
//   );

//   console.log("VENDORS WITH SHIPPING:", vendorsWithShipping);

//   console.log("========== END DEBUG ==========");
// }, [
//   products,
//   items,
//   form.selectedState,
//   allPickupCenters,
//   vendorsWithShipping,
//   shipping,
//   collectionFeeResponse
// ]);






//   /* ================= PRICING ================= */

//   // const totalDeliveryFee = (shipping.deliveryFeeSummation || 0) + collectionFee;

//   const subtotal = cart.total || 0;

//   const grandTotal =
//   subtotal +
//   (shipping.shippingFeeSummation || 0) +
//   (shipping.deliveryFeeSummation || 0) +
//   (collectionFee || 0);

//   /* ================= CHECKOUT HOOK ================= */

//   const { placeOrder, isPending } = useCheckout();

//   /* ================= PLACE ORDER ================= */

// const handlePlaceOrder = async () => {
//   console.log("PLACE ORDER CLICKED");

//   if (!cart?.vendors?.length) {
//     toast.error("Cart not ready");
//     return;
//   }

//   const deliveryAddress = JSON.stringify({
//     street: form.address,
//     town: form.selectedTown,
//     state: form.selectedState,
//     country: "Nigeria",
//   });

//   await placeOrder({
//     cart,
//     cartData,
//     form,
//     vendorsWithShipping,
//     contactPhone: form.phone,
//     products,
//     shippingSummary: {
//       shippingFeeSummation: shipping.shippingFeeSummation ?? 0,
//       deliveryFeeSummation: shipping.deliveryFeeSummation ?? 0,
//     },

//     deliveryAddress,
//     collectionFee,
//   });



// };

// return (
//   <div className="min-h-screen bg-gray-50">
//     <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10 lg:grid lg:grid-cols-3 lg:gap-8">

//       {/* ================= LEFT CONTENT ================= */}
//       <div className="lg:col-span-2 space-y-6">

//         {/* HEADER */}
//         <div>
//           <h1 className="text-2xl lg:text-3xl font-bold">Checkout</h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Complete your order securely
//           </p>
//         </div>

//         {/* STEP INDICATOR (mobile scroll friendly) */}
//         <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//           {["Cart", "Delivery", "Details", "Review"].map((label, index) => (
//             <div
//               key={label}
//               className={`flex items-center gap-2 px-3 py-2 rounded-xl border whitespace-nowrap text-sm ${
//                 form.step === index + 1
//                   ? "bg-black text-white"
//                   : "bg-white"
//               }`}
//             >
//               <div className="w-5 h-5 rounded-full bg-gray-200 text-black text-xs flex items-center justify-center">
//                 {index + 1}
//               </div>
//               {label}
//             </div>
//           ))}
//         </div>

//         {/* ================= STEP BOX ================= */}
//         <div className="bg-white rounded-2xl border p-4 lg:p-6">

//           {/* STEP 1 */}
//           {form.step === 1 && (
//             <div className="space-y-4">
//               {cart.vendors.map((vendor: any) => (
//                 <div key={vendor.businessId} className="border rounded-xl p-4">
//                   <h3 className="font-semibold mb-3 text-sm">Vendor Order</h3>

//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
//                     <div>
//                       <p className="text-gray-500">Products</p>
//                       <p className="font-bold">{vendor.items.length}</p>
//                     </div>

//                     <div>
//                       <p className="text-gray-500">Weight</p>
//                       <p className="font-bold">{vendor.totalWeight}kg</p>
//                     </div>

//                     <div>
//                       <p className="text-gray-500">Subtotal</p>
//                       <p className="font-bold">
//                         ₦{vendor.subtotal.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* STEP 2 */}
//           {form.step === 2 && (
//             <div className="space-y-4">
//               <h2 className="text-lg font-semibold">Delivery Method</h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <button
//                   onClick={() =>
//                     form.setDeliveryMode("pickUpFromOurNearestOffice")
//                   }
//                   className={`p-4 rounded-xl border text-left ${
//                     form.deliveryMode === "pickUpFromOurNearestOffice"
//                       ? "bg-black text-white"
//                       : ""
//                   }`}
//                 >
//                   Pickup Center
//                 </button>

//                 <button
//                   onClick={() => form.setDeliveryMode("homeDelivery")}
//                   className={`p-4 rounded-xl border text-left ${
//                     form.deliveryMode === "homeDelivery"
//                       ? "bg-black text-white"
//                       : ""
//                   }`}
//                 >
//                   Home Delivery
//                 </button>
//               </div>
//             </div>
//           )}


// {/* STEP 3 */}
// {form.step === 3 && (
//   <div className="space-y-4">

//     {/* STATE */}
//     <select
//       value={form.selectedState?.trim()}
//       onChange={(e) => form.setSelectedState(e.target.value)}
//       className="w-full border rounded-xl p-3"
//     >
//       <option value="">Select State</option>
//       {states.map((s) => (
//         <option key={s.id} value={s.name}>
//           {s.name}
//         </option>
//       ))}
//     </select>

//     {/* PICKUP MODE */}
//     {form.deliveryMode === "pickUpFromOurNearestOffice" && (
//       <div className="space-y-3">

//         <select
//           value={form.pickupCenterId}
//           onChange={(e) => form.setPickupCenterId(e.target.value)}
//           className="w-full border rounded-xl p-3"
//         >
//           <option value="">Select Pickup Center</option>
//           {pickupCenters?.map((center: any) => (
//             <option key={center._id} value={center._id}>
//               {center.name}
//             </option>
//           ))}
//         </select>

//         {form.selectedState?.trim() && pickupCenters.length === 0 && (
//           <p className="text-sm text-red-500">
//             No pickup center available in this state
//           </p>
//         )}
//       </div>
//     )}

//     {/* HOME DELIVERY */}
//     {form.deliveryMode === "homeDelivery" && (
//       <div className="space-y-3">

//         <select
//           value={form.selectedTown}
//           onChange={(e) => form.setSelectedTown(e.target.value)}
//           className="w-full border rounded-xl p-3"
//         >
//           <option value="">Select Town</option>
//           {(townsByState[form.selectedState?.trim()] || []).map((t) => (
//             <option key={t} value={t}>
//               {t}
//             </option>
//           ))}
//         </select>

//         <select
//           value={form.nearestBusStop}
//           onChange={(e) => form.setNearestBusStop(e.target.value)}
//           className="w-full border rounded-xl p-3"
//         >
//           <option value="">Select Nearest Bus Stop</option>

//           {busStops?.map((stop: any) => (
//             <option key={stop._id} value={stop.nearestBusStop}>
//               {stop.nearestBusStop}
//             </option>
//           ))}
//         </select>

//         {/* Address (REQUIRED for checkout safety) */}
//         <input
//           value={form.address}
//           onChange={(e) => form.setAddress(e.target.value)}
//           placeholder="Enter Delivery Address"
//           className="w-full border rounded-xl p-3"
//         />

//         {form.selectedState?.trim() && (!busStops || busStops.length === 0) && (
//           <p className="text-sm text-red-500">
//             No bus stops available
//           </p>
//         )}
//       </div>
//     )}

//     {/* PHONE */}
//     <input
//       value={form.phone}
//       onChange={(e) => form.setPhone(e.target.value)}
//       placeholder="Phone Number"
//       className="w-full border rounded-xl p-3"
//     />
//   </div>
// )}


          

          
// {/* STEP 4 */}
// {form.step === 4 && (
//   <div className="space-y-3">
//     <h2 className="text-lg font-semibold">Review Order</h2>

//     <p className="text-sm text-gray-500">
//       Please confirm your order details before proceeding to payment.
//     </p>

//     <div className="p-4 border rounded-xl bg-gray-50 text-sm">
//       <p><strong>State:</strong> {form.selectedState?.trim()}</p>
//       <p><strong>Town:</strong> {form.selectedTown || "N/A"}</p>
//       <p><strong>Delivery Mode:</strong> {form.deliveryMode}</p>
//       <p><strong>Phone:</strong> {form.phone}</p>
//       <p>
//   <strong>Collection Fee:</strong> ₦
//   {collectionFee.toLocaleString()}
// </p>

//       {form.deliveryMode === "homeDelivery" && (
//         <>
//           <p><strong>Address:</strong> {form.address}</p>
//           <p><strong>Bus Stop:</strong> {form.nearestBusStop}</p>
//         </>
//       )}

//       {form.deliveryMode === "pickUpFromOurNearestOffice" && (
//         <p><strong>Pickup Center:</strong> {form.pickupCenterId}</p>
//       )}
//     </div>
//   </div>
// )}


//         </div>



        

//         {/* ================= FOOTER BUTTONS ================= */}
//         <div className="flex gap-3 justify-between pt-4">

//           <button
//             onClick={prevStep}
//             disabled={form.step === 1}
//             className="px-4 py-2 border rounded-xl disabled:opacity-40"
//           >
//             Back
//           </button>

//           {form.step < 4 && (
//             <button
//               onClick={nextStep}
//               disabled={
//                 (form.step === 2 && !form.deliveryMode) ||
//                 (form.step === 3 && !form.selectedState.trim())
//               }
//               className="px-4 py-2 bg-black text-white rounded-xl"
//             >
//               Continue
//             </button>
//           )}

//           {form.step === 4 && (
//             <button
//               onClick={handlePlaceOrder}
//               disabled={isPending || !isReady || !cart?.vendors?.length}
//               className="px-4 py-2 bg-black text-white rounded-xl"
//             >
//               {isPending ? "Processing..." : "Place Order"}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ================= RIGHT SUMMARY (DESKTOP ONLY) ================= */}
     

//          {/* ================= RIGHT SUMMARY (DESKTOP ONLY) ================= */}

// <div className="hidden lg:block lg:col-span-1">
//   <div className="bg-white rounded-2xl border p-6 sticky top-6">

//     <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

//     <div className="space-y-3 text-sm">

//       {/* SUBTOTAL */}
//       <div className="flex justify-between">
//         <span>Subtotal</span>
//         <span>₦{subtotal.toLocaleString()}</span>
//       </div>

//       {/* PRODUCT SHIPPING (Vendor → Office) */}
//       <div className="flex justify-between">
//         <span>Shipping (Vendor → Office)</span>
//         <span>
//           ₦{(shipping.shippingFeeSummation || 0).toLocaleString()}
//         </span>
//       </div>

//       {/* DELIVERY */}
//       <div className="flex justify-between">
//         <span>Delivery Fee</span>
//         <span>
//           ₦{(shipping.deliveryFeeSummation || 0).toLocaleString()}
//         </span>
//       </div>

//       {/* COLLECTION FEE */}
//       <div className="flex justify-between">
//         <span>Collection Fee</span>
//         <span>
//           ₦{collectionFee.toLocaleString()}
//         </span>
//       </div>

//       {/* TOTAL */}
//       <div className="border-t pt-3 flex justify-between font-bold text-lg">
//         <span>Total</span>
//         <span>
//           ₦{(
//             subtotal +
//             (shipping.shippingFeeSummation || 0) +
//             (shipping.deliveryFeeSummation || 0) +
//             collectionFee
//           ).toLocaleString()}
//         </span>
//       </div>
//     </div>

//     <p className="text-xs text-gray-400 mt-3">
//       Shipping confirmed before payment.
//     </p>
//   </div>
// </div>




//     </div>

//     {/* ================= MOBILE SUMMARY BAR ================= */}
//     <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-between lg:hidden">
//       <div className="text-sm">
//         <p className="text-gray-500">Total</p>
//         <p className="font-bold">₦{grandTotal.toLocaleString()}</p>
//       </div>

//       {form.step === 4 ? (
//         <button
//           onClick={handlePlaceOrder}
//           className="bg-black text-white px-4 py-2 rounded-xl"
//         >
//           Place Order
//         </button>
//       ) : (
//         <button
//           onClick={nextStep}
//           className="bg-black text-white px-4 py-2 rounded-xl"
//         >
//           Continue
//         </button>
//       )}
//     </div>
//   </div>
// );

// }












































import { useCheckout } from "../../hooks/checkOut/useCheckout";
import { useCheckoutForm } from "../../hooks/checkOut/useCheckoutForm";
import { useMultiCartSummary } from "../../hooks/cart/useMultiCartSummary";
import { useCheckoutData } from "../../hooks/checkOut/useCheckoutData";
import { useCheckoutPricing } from "../../hooks/checkOut/useCheckoutPricing";
import { useCheckoutController } from "../../hooks/checkOut/useCheckoutController";

import CheckoutSteps from "../../components/checkOut/CheckoutSteps";
import OrderSummary from "../../components/checkOut/OrderSummary";

import { states } from "../../data/states";
import { townsByState } from "../../data/towns";

import { toast } from "react-hot-toast";

export default function Checkout() {

  /* ================= FORM ================= */
  const form = useCheckoutForm();

  /* ================= DATA LAYER ================= */
  const {
    items,
    products,
    busStops,
    pickupCenters,
    collectionFeeResponse,
    cartData,
  } = useCheckoutData(form);
  

  /* ================= CART SUMMARY ================= */
 
  const isReady = items.length > 0 && products.length > 0;

const cartId = cartData?._id;

const isCartValid = Boolean(cartId);

const cart = useMultiCartSummary(
  isReady ? items : [],
  isReady ? products : [],
  isCartValid ? cartId : undefined
);

  /* ================= PRICING ================= */
  const {
    shipping,
    collectionFee,
    subtotal,
    grandTotal,
    vendorsWithShipping,
  } = useCheckoutPricing({
    cart,
    products,
    form,
    deliveryRates: busStops,
    collectionFeeResponse,
  });

  /* ================= CONTROLLER ================= */
  const controller = useCheckoutController(form, cart, isReady);

  /* ================= CHECKOUT ACTION ================= */
  const { placeOrder, isPending } = useCheckout();

  const handlePlaceOrder = async () => {
    if (!cart?.vendors?.length) {
      toast.error("Cart not ready");
      return;
    }

    const deliveryAddress = JSON.stringify({
      street: form.address,
      town: form.selectedTown,
      state: form.selectedState,
      country: "Nigeria",
    });

await placeOrder({
  cart,
  cartId: cart.cartId,
  form,
  vendorsWithShipping,
  contactPhone: form.phone,
  products,

  shippingSummary: {
    shippingFeeSummation: shipping.shippingFeeSummation ?? 0,
    deliveryFeeSummation: shipping.deliveryFeeSummation ?? 0,
  },

  deliveryAddress,
  collectionFee,
});


  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10 lg:grid lg:grid-cols-3 lg:gap-8">

        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* HEADER */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Checkout</h1>
            <p className="text-gray-500 text-sm mt-1">
              Complete your order securely
            </p>
          </div>

          {/* STEP INDICATOR */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["Cart", "Delivery", "Details", "Review"].map((label, index) => (
              <div
                key={label}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border whitespace-nowrap text-sm ${
                  controller.step === index + 1
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-gray-200 text-black text-xs flex items-center justify-center">
                  {index + 1}
                </div>
                {label}
              </div>
            ))}
          </div>

          {/* STEPS */}
          <CheckoutSteps
            step={controller.step}
            form={form}
            cart={cart}
            pickupCenters={pickupCenters}
            busStops={busStops}
            states={states}
            townsByState={townsByState}
          />

          {/* FOOTER BUTTONS */}
          <div className="flex gap-3 justify-between pt-4">

            <button
              onClick={controller.back}
              disabled={!controller.canGoBack}
              className="px-4 py-2 border rounded-xl disabled:opacity-40"
            >
              Back
            </button>

            {controller.step < 4 && (
              <button
                onClick={controller.next}
                disabled={!controller.canGoNext}
                className="px-4 py-2 bg-black text-white rounded-xl"
              >
                Continue
              </button>
            )}

            {controller.step === 4 && (
              <button
                onClick={handlePlaceOrder}
                disabled={isPending || !isReady}
                className="px-4 py-2 bg-black text-white rounded-xl"
              >
                {isPending ? "Processing..." : "Place Order"}
              </button>
            )}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="hidden lg:block lg:col-span-1">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            collectionFee={collectionFee}
            grandTotal={grandTotal}
          />
        </div>
      </div>

      {/* MOBILE FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-between lg:hidden">
        <div className="text-sm">
          <p className="text-gray-500">Total</p>
          <p className="font-bold">₦{grandTotal.toLocaleString()}</p>
        </div>

        {controller.step === 4 ? (
          <button
            onClick={handlePlaceOrder}
            className="bg-black text-white px-4 py-2 rounded-xl"
          >
            Place Order
          </button>
        ) : (
          <button
            onClick={controller.next}
            className="bg-black text-white px-4 py-2 rounded-xl"
          >
            Continue
          </button>
        )}
      </div>

    </div>
  );
}