



import { apiClient } from "../api/core/api.client";
import { authService } from "./auth.service";
import type { BecomePartnerPayload, BusinessProfilePayload } from "../types/partners.types";

export const partnersService = {


  /* ================= BUSINESS PARTNER PROFILE ================= */

partnersBusinessProfile: async (
  businessId: string,
  data: BusinessProfilePayload
) => {
  const result = await apiClient.post(
    `/businesses/add-business-address/${businessId}`,
    data
  );

  return result.data;
},



  /* ================= PARTNER STATUS ================= */
  getPartnerStatus: async () => {
    const result = await apiClient.get("/partners/status");

    console.log("[partners/status] response:", result.data);

    return result.data;
  },

  /* ================= BECOME VENDOR ================= */
  partnersBecomeVendor: async (data: BecomePartnerPayload) => {
    const result = await apiClient.post(
      "/partners/become-vendor",
      data
    );

    console.log("[become-vendor] response:", result.data);

    // ✅ refresh user AFTER success
    const updatedUser = await authService.getMe();
    console.log("[auth/me refreshed]", updatedUser.data);

    return result.data;
  },

  /* ================= BECOME RIDER ================= */
  partnersBecomeRider: async (data: BecomePartnerPayload) => {
    const result = await apiClient.post(
      "/partners/become-rider",
      data
    );

    console.log("[become-rider] response:", result.data);

    const updatedUser = await authService.getMe();
    console.log("[auth/me refreshed]", updatedUser.data);

    return result.data;
  },

  /* ================= BECOME PROMOTER ================= */
  partnersBecomePromoter: async (data: BecomePartnerPayload) => {
    const result = await apiClient.post(
      "/partners/become-promoter",
      data
    );

    console.log("[become-promoter] response:", result.data);

    const updatedUser = await authService.getMe();
    console.log("[auth/me refreshed]", updatedUser.data);

    return result.data;
  },


 /* ================= BECOME PICKUP CENTER ================= */
  partnersBecomePickupCenter: async (data: BecomePartnerPayload) => {
    const result = await apiClient.post(
      "/partners/become-pickup-center",
      data
    );

    const updatedUser = await authService.getMe();
    console.log("[auth/me refreshed]", updatedUser.data);

    return result.data;
  },





};




 





