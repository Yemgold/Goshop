


import { useQuery } from "@tanstack/react-query";
import { vendorService } from "../../services/vendor/vendor.api.service";

export function useShippingDocument(
  businessId: string,
  buyerState: string
) {
  return useQuery({
    queryKey: ["shipping-document", businessId, buyerState],
    queryFn: () =>
      vendorService.getShippingDocumentByBuyerState(
        businessId,
        buyerState
      ),
    enabled: !!businessId && !!buyerState,
  });
}