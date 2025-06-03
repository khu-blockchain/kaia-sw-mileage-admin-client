import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  getSwMileageListAPI,
  getSwMileageByIdAPI,
  updateSwMileageStatusAPI,
  approveSwMileageAPI,
  rejectSwMileageAPI,
} from "../api";
import { Mutation, SuspenseQuery } from "@/features/_core/api";
import {
  useGetSwMileageListRequest,
  useGetSwMileageListResponse,
  useGetSwMileageByIdRequest,
  useGetSwMileageByIdResponse,
  useUpdateSwMileageStatusRequest,
  useUpdateSwMileageStatusResponse,
  useApproveSwMileageRequest,
  useApproveSwMileageResponse,
  useRejectSwMileageRequest,
  useRejectSwMileageResponse,
} from "./type";
import { getActivityFieldListAPI } from "@/features/academicField";

const useGetSwMileageList: SuspenseQuery<
  useGetSwMileageListRequest,
  useGetSwMileageListResponse
> = (args) => {
  return useSuspenseQuery({
    queryKey: ["get-sw-mileage-list"],
    queryFn: async () => await getSwMileageListAPI(args),
  });
};

const useGetSwMileageById: SuspenseQuery<
  useGetSwMileageByIdRequest,
  useGetSwMileageByIdResponse
> = (args) => {
  return useSuspenseQuery({
    queryKey: ["get-sw-mileage-by-id", args.swMileageId],
    queryFn: async () => {
      const swMileageDetail = await getSwMileageByIdAPI(args);
      const activityFieldList = await getActivityFieldListAPI();
      return { swMileageDetail, activityFieldList };
    },
  });
};

const useUpdateSwMileageStatus: Mutation<
  useUpdateSwMileageStatusRequest,
  useUpdateSwMileageStatusResponse
> = (args) => {
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => await updateSwMileageStatusAPI(data),
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useApproveSwMileage: Mutation<
  useApproveSwMileageRequest,
  useApproveSwMileageResponse
> = (args) => {
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => await approveSwMileageAPI(data),
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useRejectSwMileage: Mutation<
  useRejectSwMileageRequest,
  useRejectSwMileageResponse
> = (args) => {
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => await rejectSwMileageAPI(data),
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

export {
  useGetSwMileageList,
  useGetSwMileageById,
  useUpdateSwMileageStatus,
  useApproveSwMileage,
  useRejectSwMileage,
};
