import {
  useGetStudentByStudentIdRequest,
  useGetStudentByStudentIdResponse,
} from "./type";
import { getStudentByStudentIdAPI } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Query } from "@/features/_core/api";
import { getSwMileageTokenHistoriesAPI } from "@/features/history/api";

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
          isCount: 0,
          studentId: args.student_id,
        });
        return {
          student: student,
          mileageHistory: mileageHistory,
        };
      } catch (error) {
        return null;
      }
    },
    enabled: false,
    retry: false,
  });
};

const useGetStudentByStudentId: Query<
  useGetStudentByStudentIdRequest,
  useGetStudentByStudentIdResponse
> = (args) => {
  return useQuery({
    queryKey: ["get-student-by-student-id", args.student_id],
    queryFn: async () => await getStudentByStudentIdAPI(args),
    enabled: false,
  });
};

export { useGetStudentInfo };
