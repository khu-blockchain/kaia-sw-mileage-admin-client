import { WalletLost } from "@/entities/walletLost";

type useGetWalletLostListRequest = void;

type useGetWalletLostListResponse = {
  total: number;
  list: Array<WalletLost>;
};

type useApproveWalletLostRequest = {
  walletHistoryId: number;
  studentId: string;
  rawTransaction: string;
};

type useApproveWalletLostResponse = WalletLost;

export type {
  useGetWalletLostListRequest,
  useGetWalletLostListResponse,
  useApproveWalletLostRequest,
  useApproveWalletLostResponse,
};
