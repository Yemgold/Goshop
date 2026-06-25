
import { apiClient } from "../core/api.client";

import type {
  DashboardData,
  CreateRiderInvitePayload
  
} from "../../types/pickup/pickup.types";


/* ================= DASHBOARD ================= */

export const getPickupDashboardAPI = async (): Promise<DashboardData> => {
  const res = await apiClient.get("/dashboard/pickup");
  return res.data;
};


export const createRiderInvite = async (
  payload: CreateRiderInvitePayload
) => {
  const res = await apiClient.post(
    "/rider-invites/create-invite",
    payload
  );

  return res.data;
};





export const getStatePickupCentersAPI =
  async (state: string) => {
    const res = await apiClient.get(
      `/pickup-center/get-state-pickup-centers/${state}`
    );

    return res.data.data;
  };

export const getMainPickupCenterAPI =
  async (state: string) => {
    const res = await apiClient.get(
      `/pickup-center/get-state-main-pickup-center/${state}`
    );

    return res.data.data;
  };