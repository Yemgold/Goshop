

import { apiClient } from "../../api/core/api.client";

import type{ AddStockPayload, AddStockResponse, } from "../../types/vendor/inventory"; 

export const addStockAPI = async (
    payload: AddStockPayload
): Promise<AddStockResponse> => {

    const res = await apiClient.post(
        "/inventory/add-stock",
        payload
    );

    return res.data;
};