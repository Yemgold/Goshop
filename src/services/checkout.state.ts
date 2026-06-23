



export type CheckoutState = {
  buyerState: string;
  deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice";
  hydrated: boolean;
};

export const getCheckoutState = (form: any): CheckoutState => {
  const buyerState = form?.selectedState?.trim() ?? "";

  return {
    buyerState,
    deliveryMode: form?.deliveryMode || "homeDelivery",
    hydrated: Boolean(buyerState && form?.deliveryMode),
  };
};