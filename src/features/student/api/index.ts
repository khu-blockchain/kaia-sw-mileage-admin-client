import { API, StudentServer } from "@/features/_core/api";
import {
  getStudentByStudentIdAPIRequest,
  getStudentByStudentIdAPIResponse,
} from "./type";

const getStudentByStudentIdAPI: API<
  getStudentByStudentIdAPIRequest,
  getStudentByStudentIdAPIResponse
> = async (request) => {
  try {
    const result = await StudentServer.get(`${request.student_id}`).json();
    return result as getStudentByStudentIdAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { getStudentByStudentIdAPI };
