import { Student } from "@/entities/student";

type getStudentByStudentIdAPIRequest = {
  student_id: string;
};

type getStudentByStudentIdAPIResponse = Student;

type mintSwMileageAPIRequest = {
  studentId: string;
  rawTransaction: string;
};

type mintSwMileageAPIResponse = {
  message: string;
};

type burnSwMileageAPIRequest = {
  studentId: string;
  rawTransaction: string;
};

type burnSwMileageAPIResponse = {
  message: string;
};

export type {
  getStudentByStudentIdAPIRequest,
  getStudentByStudentIdAPIResponse,
  mintSwMileageAPIRequest,
  mintSwMileageAPIResponse,
  burnSwMileageAPIRequest,
  burnSwMileageAPIResponse,
};
