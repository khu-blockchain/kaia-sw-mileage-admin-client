import { API, makeQuery, SwMileageServer } from "@/features/_core/api";
import {
  getSWMileageListAPIRequest,
  getSWMileageListAPIResponse,
  getSwMileageByIdAPIRequest,
  getSwMileageByIdAPIResponse,
  approveSwMileageAPIRequest,
  approveSwMileageAPIResponse,
  updateSwMileageStatusAPIRequest,
  updateSwMileageStatusAPIResponse,
  rejectSwMileageAPIRequest,
  rejectSwMileageAPIResponse,
} from "./type";

const getSwMileageListAPI: API<
  getSWMileageListAPIRequest,
  getSWMileageListAPIResponse
> = async (request) => {
  try {
    const result = await SwMileageServer.get(`${makeQuery(request)}`).json();
    return result as getSWMileageListAPIResponse;
  } catch (e) {
    throw e;
  }
};

const getSwMileageByIdAPI: API<
  getSwMileageByIdAPIRequest,
  getSwMileageByIdAPIResponse
> = async (request) => {
  try {
    const result = await SwMileageServer.get(`${request.swMileageId}`).json();
    return result as getSwMileageByIdAPIResponse;
  } catch (e) {
    throw e;
  }
};

const approveSwMileageAPI: API<
  approveSwMileageAPIRequest,
  approveSwMileageAPIResponse
> = async (request) => {
  const { swMileageId, rawTransaction } = request;
  try {
    const result = await SwMileageServer.post(
      `${swMileageId}/approve`,
      { json: { rawTransaction } }
    ).json();
    return result as approveSwMileageAPIResponse;
  } catch (e) {
    throw e;
  }
};

const rejectSwMileageAPI: API<
  rejectSwMileageAPIRequest,
  rejectSwMileageAPIResponse
> = async (request) => {
  const { swMileageId, rawTransaction, comment } = request;
  try {
    const result = await SwMileageServer.post(
      `${swMileageId}/reject`,
      { json: { rawTransaction, comment } }
    ).json();
    return result as rejectSwMileageAPIResponse;
  } catch (e) {
    throw e;
  }
};



const updateSwMileageStatusAPI: API<
  updateSwMileageStatusAPIRequest,
  updateSwMileageStatusAPIResponse
> = async (request) => {
  try {
    const result = await SwMileageServer.patch(
      `${request.swMileageId}/status`,
      {
        json: {
          status: request.status,
          comment: request.comment,
        },
      }
    ).json();
    return result as updateSwMileageStatusAPIResponse;
  } catch (e) {
    throw e;
  }
};

export {
  getSwMileageListAPI,
  getSwMileageByIdAPI,
  updateSwMileageStatusAPI,
  approveSwMileageAPI,
  rejectSwMileageAPI,
};
