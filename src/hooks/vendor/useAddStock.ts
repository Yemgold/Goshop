


import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { addStockAPI } from "../../api/user/vendor.api";

export function useAddStock() {

    return useMutation({

        mutationFn: addStockAPI,

        onSuccess(data) {

            toast.success(data.message);

        },

        onError(error: any) {

            toast.error(

                error?.response?.data?.message ||

                "Unable to add stock."

            );

        },

    });

}