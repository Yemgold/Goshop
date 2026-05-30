


export const calculateDeliveryFee = (
  buyer: { state: string; town: string },
  vendor: { state: string; town: string }
) => {
  const bState = buyer.state.toLowerCase();
  const bTown = buyer.town.toLowerCase();
  const vState = vendor.state.toLowerCase();
  const vTown = vendor.town.toLowerCase();

  // SAME TOWN (cheapest)
  if (bState === vState && bTown === vTown) {
    return 1500;
  }

  // SAME STATE (medium)
  if (bState === vState) {
    return 3000;
  }

  // DIFFERENT STATE (expensive)
  return 6000;
};