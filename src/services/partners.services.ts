



import { apiClient } from "../api/core/api.client";
import { authService } from "./auth.service";
import type { BecomePartnerPayload } from "../types/partners.types";

export const partnersService = {

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
};