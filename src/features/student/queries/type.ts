import { Student } from "@/entities/student";
import { SwMileageTokenHistory } from "@/entities/history";

type useGetStudentByStudentIdRequest = {
  student_id: string;
};

type useGetStudentByStudentIdResponse = {
  student: Student | null;
  mileageHistory: SwMileageTokenHistory[];
};

type useMintSwMileageRequest = {
  studentId: string;
  rawTransaction: string;
};

type useMintSwMileageResponse = {
  message: string;
};

type useBurnSwMileageRequest = {
  studentId: string;
  rawTransaction: string;
};

type useBurnSwMileageResponse = {
  message: string;
};

export type {
  useGetStudentByStudentIdRequest,
  useGetStudentByStudentIdResponse,
  useMintSwMileageRequest,
  useMintSwMileageResponse,
  useBurnSwMileageRequest,
  useBurnSwMileageResponse,
};
