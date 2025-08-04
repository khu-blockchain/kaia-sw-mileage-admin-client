import { Mutation, SuspenseQuery } from "@/features/_core/api";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  useGetWalletLostListRequest,
  useGetWalletLostListResponse,
  useApproveWalletLostRequest,
  useApproveWalletLostResponse,
} from "./type";
import { approveWalletLostAPI, getWalletLostListAPI } from "../api";

const useGetWalletLostList: SuspenseQuery<
  useGetWalletLostListRequest,
  useGetWalletLostListResponse
> = () => {
  return useSuspenseQuery({
    queryKey: ["get-wallet-lost-list"],
    queryFn: async () => await getWalletLostListAPI(),
  });
};

const useApproveWalletLost: Mutation<
  useApproveWalletLostRequest,
  useApproveWalletLostResponse
> = (args) => {
  const { onSuccess, onError } = args;
  return useMutation({
    mutationFn: async (data) => await approveWalletLostAPI(data),
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

export { useGetWalletLostList, useApproveWalletLost };
