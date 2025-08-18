import type { RawTransaction } from "@shared/lib/web3";
import type { MileageToken } from "./types";

type CreateMileageTokenRequest = {
	name: string;
	description: string;
	symbol: string;
	imageUrl: string;
	rawTransaction: RawTransaction;
};

type CreateMileageTokenResponse = MileageToken;

type GetMileageTokenListResponse = MileageToken[];

type ActivateMileageTokenRequest = {
	mileageTokenId: number;
	rawTransaction: RawTransaction;
};

type ActivateMileageTokenResponse = {
	success: boolean;
};

export type {
	CreateMileageTokenRequest,
	CreateMileageTokenResponse,
	GetMileageTokenListResponse,
	ActivateMileageTokenRequest,
	ActivateMileageTokenResponse,
};
