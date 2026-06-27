
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
    busStops,
    pickupCenters,
    collectionFeeResponse,
    cartData,
  } = useCheckoutData(form);
  

  /* ================= CART SUMMARY ================= */
 
 const isReady = items.length > 0;

const cartId = cartData?._id;

const isCartValid = Boolean(cartId);

const cart = useMultiCartSummary(
  isReady ? items : [],
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
    form,
    deliveryRates: busStops,
    collectionFeeResponse,
  });




const validateCheckout = () => {
  /* ================= COMMON ================= */

  if (!form.phone?.trim()) {
    toast.error("Phone number is required");
    return false;
  }

  if (!form.deliveryMode) {
    toast.error("Please select a delivery method");
    return false;
  }

  /* ================= HOME DELIVERY ================= */

  if (form.deliveryMode === "homeDelivery") {
    if (!form.selectedState?.trim()) {
      toast.error("Please select a state");
      return false;
    }

    if (!form.selectedTown?.trim()) {
      toast.error("Please select a town");
      return false;
    }

    if (!form.address?.trim()) {
      toast.error("Please enter your delivery address");
      return false;
    }

    if (!form.nearestBusStop?.trim()) {
      toast.error("Please enter your nearest bus stop");
      return false;
    }
  }

  /* ================= PICKUP ================= */

  if (
    form.deliveryMode ===
    "pickUpFromOurNearestOffice"
  ) {
    if (!form.pickupCenterId?.trim()) {
      toast.error("Please select a pickup center");
      return false;
    }
  }

  /* ================= CART ================= */

  if (!cart?.vendors?.length) {
    toast.error("Cart is empty");
    return false;
  }

  return true;
};




  const canPlaceOrder =
  
  !!form.phone?.trim() &&
  !!form.deliveryMode &&
  cart?.vendors?.length > 0 &&
  (
    form.deliveryMode === "homeDelivery"
      ? !!form.selectedState?.trim() &&
        !!form.selectedTown?.trim() &&
        !!form.address?.trim() &&
        !!form.nearestBusStop?.trim()
      : !!form.pickupCenterId?.trim()
  );


  /* ================= CONTROLLER ================= */
  const controller = useCheckoutController(form, cart, isReady);

  /* ================= CHECKOUT ACTION ================= */
  const { placeOrder, isPending } = useCheckout();

 const handlePlaceOrder = async () => {
  if (!validateCheckout()) {


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

    shippingSummary: {
      shippingFeeSummation:
        shipping.shippingFeeSummation ?? 0,

      deliveryFeeSummation:
        shipping.deliveryFeeSummation ?? 0,
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
                disabled={isPending || !canPlaceOrder}
                className="px-4 py-2 bg-black text-white rounded-xl"
              >
               
 


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
  disabled={isPending || !canPlaceOrder}
  className={`
    flex items-center justify-center gap-2
    px-6 py-3 rounded-xl font-semibold transition-all duration-300
    ${
      isPending
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-black hover:bg-gray-800"
    }
    text-white disabled:opacity-70
  `}
>
  {isPending ? (
    <>
      <svg
        className="w-5 h-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      Processing Order...
    </>
  ) : (
    "Place Order"
  )}
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

