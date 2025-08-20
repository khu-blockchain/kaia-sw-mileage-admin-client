import type { Hex } from "@kaiachain/viem-ext";
import type { MileageToken } from "./types";

type CreateMileageTokenRequest = {
	name: string;
	description: string;
	symbol: string;
	imageUrl: string;
	rawTransaction: Hex;
};

type CreateMileageTokenResponse = MileageToken;

type GetMileageTokenListResponse = MileageToken[];

type ActivateMileageTokenRequest = {
	mileageTokenId: number;
	rawTransaction: Hex;
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
