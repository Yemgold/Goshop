


import { useState } from "react";

type Step = 1 | 2 | 3 | 4;
type DeliveryMode = "office" | "home" | null;

export function useCheckoutForm() {
  const [step, setStep] = useState<Step>(1);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>(null);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedState, setSelectedState] = useState("");
  const [selectedTown, setSelectedTown] = useState("");

  const next = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  return {
    step,
    deliveryMode,
    setDeliveryMode,

    address,
    setAddress,
    phone,
    setPhone,

    selectedState,
    setSelectedState,
    selectedTown,
    setSelectedTown,

    next,
    back,
  };
}