import { API, WalletServer } from "@/features/_core/api";
import {
  getWalletLostListAPIRequest,
  getWalletLostListAPIResponse,
  approveWalletLostAPIRequest,
  approveWalletLostAPIResponse,
} from "./type";

const getWalletLostListAPI: API<
  getWalletLostListAPIRequest,
  getWalletLostListAPIResponse
> = async () => {
  try {
    const result = await WalletServer.get("").json();
    return result as getWalletLostListAPIResponse;
  } catch (e) {
    throw e;
  }
};

const approveWalletLostAPI: API<
  approveWalletLostAPIRequest,
  approveWalletLostAPIResponse
> = async (request) => {
  try {
    const result = await WalletServer.post(`${request.walletHistoryId}/approve`, {
      json: {
        studentId: request.studentId,
        rawTransaction: request.rawTransaction,
      },
    }).json();
    return result as approveWalletLostAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { getWalletLostListAPI, approveWalletLostAPI };
