import { WalletLost } from "@/entities/walletLost";

type getWalletLostListAPIRequest = void;

type getWalletLostListAPIResponse = {
  total: number;
  list: Array<WalletLost>;
};

type approveWalletLostAPIRequest = {
  walletHistoryId: number;
  studentId: string;
  rawTransaction: string;
};
type approveWalletLostAPIResponse = WalletLost;

export type {
  getWalletLostListAPIRequest,
  getWalletLostListAPIResponse,
  approveWalletLostAPIRequest,
  approveWalletLostAPIResponse,
};
