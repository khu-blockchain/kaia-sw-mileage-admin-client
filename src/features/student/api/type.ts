import { Student } from "@/entities/student";

type getStudentByStudentIdAPIRequest = {
  student_id: string;
};

type getStudentByStudentIdAPIResponse = Student;

export type {
  getStudentByStudentIdAPIRequest,
  getStudentByStudentIdAPIResponse,
};
