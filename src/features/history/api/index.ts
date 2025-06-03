import { API, SwMileageTokenHistoryServer } from "@/features/_core/api";
import { makeQuery } from "@/features/_core/api/utils";
import {
  getSwMileageTokenHistoriesAPIRequest,
  getSwMileageTokenHistoriesAPIResponse,
} from "./type";

const getSwMileageTokenHistoriesAPI: API<
  getSwMileageTokenHistoriesAPIRequest,
  getSwMileageTokenHistoriesAPIResponse
> = async (request) => {
  try {
    const result = await SwMileageTokenHistoryServer.get(
      `${makeQuery(request)}`
    ).json();
    return result as getSwMileageTokenHistoriesAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { getSwMileageTokenHistoriesAPI };
