import type { WalletLost } from "./types";

type GetWalletLostListRequest = {
	page: number;
	limit: number;
	studentId?: string;
};

type GetWalletLostListResponse = WalletLost[];

type ApproveWalletLostRequest = {
	id: number;
	rawTransaction: string;
};

type ApproveWalletLostResponse = WalletLost;

export type {
	GetWalletLostListRequest,
	GetWalletLostListResponse,
	ApproveWalletLostRequest,
	ApproveWalletLostResponse,
};
