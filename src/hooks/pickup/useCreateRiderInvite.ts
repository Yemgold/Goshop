import { useMutation } from "@tanstack/react-query";
import { createRiderInvite } from "../../api/user/pickup.api";


export const useCreateRiderInvite = () => {
  return useMutation({
    mutationFn: createRiderInvite,
  });
};