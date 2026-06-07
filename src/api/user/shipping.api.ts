


import apiClient from "../core/api.client";

export async function getVendorShippingRate(
  businessId: string,
  destinationState: string,
  weight: number
) {
  const { data } = await apiClient.get(
    `/business-shipping-rate/get-business-shipping-rate-all-states/${businessId}`
  );

  const stateConfig = data.find(
    (s: any) =>
      s.destinationState.toLowerCase() ===
      destinationState.toLowerCase()
  );

  if (!stateConfig) return 0;

  const range = stateConfig.weightRanges.find(
    (r: any) =>
      weight >= r.min &&
      (r.max === null || weight <= r.max)
  );

  return range?.price || 0;
}

export async function getAdminShippingRate(
  destinationState: string,
  weight: number
) {
  const { data } = await apiClient.get(
    `/admin-shipping-rate/${destinationState}`
  );

  const range = data.weightRanges.find(
    (r: any) =>
      weight >= r.min &&
      (r.max === null || weight <= r.max)
  );

  return range?.price || 0;
}