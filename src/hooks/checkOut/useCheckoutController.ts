
import { useMemo } from "react";

export function useCheckoutController(form: any, cart: any, isReady: boolean) {

  const step = form.step;

  /* ================= STEP VALIDATION ================= */

  const isStepValid = useMemo(() => {
    switch (step) {

      /* STEP 1: CART */
      case 1:
        return cart?.vendors?.length > 0;

      /* STEP 2: DELIVERY MODE */
      case 2:
        return !!form.deliveryMode;

      /* STEP 3: ADDRESS INFO */
      case 3:
        if (!form.selectedState) return false;

        if (form.deliveryMode === "homeDelivery") {
          return (
            !!form.selectedTown &&
            !!form.nearestBusStop &&
            !!form.address &&
            !!form.phone
          );
        }

        if (form.deliveryMode === "pickUpFromOurNearestOffice") {
          return (
            !!form.pickupCenterId &&
            !!form.phone
          );
        }

        return false;

      /* STEP 4: REVIEW */
      case 4:
        return isReady;

      default:
        return false;
    }
  }, [step, form, cart, isReady]);

  /* ================= NAVIGATION ================= */

  const next = () => {
    if (!isStepValid) return;

    form.setStep((prev: number) => Math.min(prev + 1, 4));
  };

  const back = () => {
    form.setStep((prev: number) => Math.max(prev - 1, 1));
  };

  /* ================= RULES ================= */

  const canGoNext = isStepValid && step < 4;
  const canGoBack = step > 1;
  const isLastStep = step === 4;

  return {
    step,
    next,
    back,
    isStepValid,
    canGoNext,
    canGoBack,
    isLastStep,
  };
}