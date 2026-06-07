




import {
  nearbyRoutes,
  neighboringStates,
} from "../data/deliveryRoutes";

type Location = {
  state: string;
  town: string;
};

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "");
}

export function getDeliveryFee(
  buyer: Location,
  vendor: Location
) {
  const buyerState = normalize(buyer.state);
  const buyerTown = normalize(buyer.town);

  const vendorState = normalize(vendor.state);
  const vendorTown = normalize(vendor.town);

  // SAME TOWN
  if (
    buyerState === vendorState &&
    buyerTown === vendorTown
  ) {
    return 1500;
  }

  // NEARBY TOWNS
  const nearby = nearbyRoutes[vendorTown] || [];

  if (
    buyerState === vendorState &&
    nearby.includes(buyerTown)
  ) {
    return 2000;
  }

  // SAME STATE
  if (buyerState === vendorState) {
    return 3000;
  }

  // NEIGHBORING STATES
  const neighboring =
    neighboringStates[vendorState] || [];

  if (neighboring.includes(buyerState)) {
    return 4500;
  }

  // FAR STATES
  return 7000;
}




type PickupRule = {
  state: string;
  price: number;
};

export function getPickupFee(
  rules: PickupRule[],
  buyerState: string
) {
  const normalize = (value: string) =>
    value.trim().toLowerCase();

  const match = rules.find(
    (rule) =>
      normalize(rule.state) === normalize(buyerState)
  );

  return match?.price ?? 0;
}