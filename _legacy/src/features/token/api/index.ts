import { API, SwMileageTokenServer } from "@/features/_core/api";
import {
  createTokenAPIRequest,
  createTokenAPIResponse,
  getSWMileageTokenAPIRequest,
  getSWMileageTokenAPIResponse,
  activateTokenAPIRequest,
  activateTokenAPIResponse,
  registerAdminAPIRequest,
  registerAdminAPIResponse,
} from "./type";

const createTokenAPI: API<
  createTokenAPIRequest,
  createTokenAPIResponse
> = async (request) => {
  const {
    swMileageTokenName,
    symbol,
    description,
    imageUrl,
    rawTransaction,
  } = request;

  try {
    const result = await SwMileageTokenServer.post("", {
      json: {
        swMileageTokenName,
        symbol,
        description,
        imageUrl,
        rawTransaction,
      },
    }).json();
    return result as createTokenAPIResponse;
  } catch (e) {
    throw e;
  }
};

const getSWMileageTokenAPI: API<
  getSWMileageTokenAPIRequest,
  getSWMileageTokenAPIResponse
> = async () => {
  try {
    const result = await SwMileageTokenServer.get("").json();
    return result as getSWMileageTokenAPIResponse;
  } catch (e) {
    throw e;
  }
};

const activateSwMileageTokenAPI: API<
  activateTokenAPIRequest,
  activateTokenAPIResponse
> = async (request) => {
  const { swMileageTokenId, rawTransaction } = request;
  try {
    const result = await SwMileageTokenServer.post(
      `${swMileageTokenId}/activate`,
      { json: { rawTransaction } }
    ).json();
    return result as activateTokenAPIResponse;
  } catch (e) {
    throw e;
  }
};

const registerAdminAPI: API<
  registerAdminAPIRequest,
  registerAdminAPIResponse
> = async (request) => {
  const { swMileageTokenId, rawTransaction } = request;
  try {
    const result = await SwMileageTokenServer.post(
      `${swMileageTokenId}/add-admin`,
      { json: { rawTransaction } }
    ).json();
    return result as registerAdminAPIResponse;
  } catch (e) {
    throw e;
  }
};

export {
  createTokenAPI,
  getSWMileageTokenAPI,
  activateSwMileageTokenAPI,
  registerAdminAPI,
};
