import {
  useGetStudentByStudentIdRequest,
  useGetStudentByStudentIdResponse,
  useMintSwMileageRequest,
  useMintSwMileageResponse,
  useBurnSwMileageRequest,
  useBurnSwMileageResponse,
} from "./type";
import {
  getStudentByStudentIdAPI,
  mintSwMileageAPI,
  burnSwMileageAPI,
} from "../api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Query } from "@/features/_core/api";
import { getSwMileageTokenHistoriesAPI } from "@/features/history/api";
import { Mutation } from "@/features/_core/api";

const useGetStudentInfo: Query<
  useGetStudentByStudentIdRequest,
  useGetStudentByStudentIdResponse
> = (args) => {
  return useQuery({
    queryKey: ["get-student-info"],
    queryFn: async () => {
      try {
        const student = await getStudentByStudentIdAPI(args);
        const mileageHistory = await getSwMileageTokenHistoriesAPI({
          isCount: 1,
          studentId: args.student_id,
          type: [
            "DOC_APPROVED",
            "DIRECT_MINT",
            "DIRECT_BURN",
            "ACCOUNT_CHANGE",
          ],
        });
        return {
          student: student,
          mileageHistory: mileageHistory.list,
        };
      } catch (error) {
        return null;
      }
    },
    enabled: false,
    retry: false,
  });
};

const useMintSwMileage: Mutation<
  useMintSwMileageRequest,
  useMintSwMileageResponse
> = (args) => {
  const { onSuccess, onError } = args;
  return useMutation({
    mutationFn: async (data) => await mintSwMileageAPI(data),
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useBurnSwMileage: Mutation<
  useBurnSwMileageRequest,
  useBurnSwMileageResponse
> = (args) => {
  const { onSuccess, onError } = args;
  return useMutation({
    mutationFn: async (data) => await burnSwMileageAPI(data),
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

export { useGetStudentInfo, useMintSwMileage, useBurnSwMileage };
