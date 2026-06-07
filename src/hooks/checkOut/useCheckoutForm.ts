import { useState } from "react";

export type Step = 1 | 2 | 3 | 4;

export type DeliveryMode =
  | "pickUpFromOurNearestOffice"
  | "homeDelivery"
  | null;

/* ================= FORM HOOK ================= */

export function useCheckoutForm() {
  const [step, setStep] = useState<Step>(1);

  const [deliveryMode, setDeliveryMode] =
    useState<DeliveryMode>(null);

  /* ================= HOME DELIVERY ================= */

  const [selectedState, setSelectedState] =
    useState<string>("");

  const [selectedTown, setSelectedTown] =
    useState<string>("");

  const [address, setAddress] =
    useState<string>("");

  const [nearestBusStop, setNearestBusStop] =
    useState<string>("");

  /* ================= PICKUP ================= */

  const [pickupCenterId, setPickupCenterId] =
    useState<string>("");

  const [pickupCenterName, setPickupCenterName] =
    useState<string>("");

  /* ================= COMMON ================= */

  const [phone, setPhone] =
    useState<string>("");

  /* ================= NAVIGATION ================= */

  const next = () =>
    setStep((s) => (s < 4 ? ((s + 1) as Step) : s));

  const back = () =>
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  /* ================= RESET HELPERS (IMPORTANT) ================= */

  const resetHomeDelivery = () => {
    setSelectedState("");
    setSelectedTown("");
    setAddress("");
    setNearestBusStop("");
  };

  const resetPickup = () => {
    setPickupCenterId("");
    setPickupCenterName("");
  };

  const resetAll = () => {
    setStep(1);
    setDeliveryMode(null);

    resetHomeDelivery();
    resetPickup();

    setPhone("");
  };

  return {
    /* STEP */
    step,
    setStep,
    next,
    back,

    /* DELIVERY */
    deliveryMode,
    setDeliveryMode,

    /* HOME DELIVERY */
    selectedState,
    setSelectedState,

    selectedTown,
    setSelectedTown,

    address,
    setAddress,

    nearestBusStop,
    setNearestBusStop,

    /* PICKUP */
    pickupCenterId,
    setPickupCenterId,

    pickupCenterName,
    setPickupCenterName,

    /* COMMON */
    phone,
    setPhone,

    /* RESET (VERY USEFUL FOR CHECKOUT FLOW) */
    resetAll,
    resetHomeDelivery,
    resetPickup,
  };
}