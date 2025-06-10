import { API, StudentServer } from "@/features/_core/api";
import {
  getStudentByStudentIdAPIRequest,
  getStudentByStudentIdAPIResponse,
  mintSwMileageAPIRequest,
  mintSwMileageAPIResponse,
  burnSwMileageAPIRequest,
  burnSwMileageAPIResponse,
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

const mintSwMileageAPI: API<
  mintSwMileageAPIRequest,
  mintSwMileageAPIResponse
> = async (request) => {
  const { studentId, rawTransaction } = request;
  try {
    const result = await StudentServer.post(`${studentId}/mint`, {
      json: {
        rawTransaction,
      },
    }).json();
    return result as mintSwMileageAPIResponse;
  } catch (e) {
    throw e;
  }
};

const burnSwMileageAPI: API<
  burnSwMileageAPIRequest,
  burnSwMileageAPIResponse
> = async (request) => {
  const { studentId, rawTransaction } = request;
  try {
    const result = await StudentServer.post(`${studentId}/burn`, {
      json: {
        rawTransaction,
      },
    }).json();
    return result as burnSwMileageAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { getStudentByStudentIdAPI, mintSwMileageAPI, burnSwMileageAPI };
