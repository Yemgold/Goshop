
import { apiClient } from "../api/core/api.client";


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