import { SuspenseQuery } from "@/features/_core/api";
import { getSwMileageTokenHistoriesAPI } from "../api";
import {
  useGetSwMileageTokenHistoriesRequest,
  useGetSwMileageTokenHistoriesResponse,
} from "./type";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetMintHistories: SuspenseQuery<
  useGetSwMileageTokenHistoriesRequest,
  useGetSwMileageTokenHistoriesResponse
> = (args) => {
  return useSuspenseQuery({
    queryKey: ["get-mint-histories"],
    queryFn: async () => await getSwMileageTokenHistoriesAPI(args),
  });
};

const useGetBurnHistories: SuspenseQuery<
  useGetSwMileageTokenHistoriesRequest,
  useGetSwMileageTokenHistoriesResponse
> = (args) => {
  return useSuspenseQuery({
    queryKey: ["get-burn-histories"],
    queryFn: async () => await getSwMileageTokenHistoriesAPI(args),
  });
};

export { useGetMintHistories, useGetBurnHistories };
