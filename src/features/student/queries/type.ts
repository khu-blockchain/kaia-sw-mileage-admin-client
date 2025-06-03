import { Student } from "@/entities/student";
import { SwMileageTokenHistory } from "@/entities/history";

type useGetStudentByStudentIdRequest = {
  student_id: string;
};

type useGetStudentByStudentIdResponse = {
  student: Student | null;
  mileageHistory: SwMileageTokenHistory[];
};

export type {
  useGetStudentByStudentIdRequest,
  useGetStudentByStudentIdResponse,
};
