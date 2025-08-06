import type { RawTransaction } from "@shared/lib/web3";
import type { TRANSACTION_STATUS } from "../enum";

type MileageTokenResponse = {
	id: number;
	name: string;
	description: string;
	contract_address: string;
	symbol: string;
	image_url: string;
	transaction_status: TRANSACTION_STATUS;
	transaction_hash: string;
	created_at: Date;
	updated_at: Date;
};

type CreateMileageTokenRequest = {
	name: string;
	description: string;
	symbol: string;
	imageUrl: string;
	rawTransaction: RawTransaction;
};

type CreateMileageTokenResponse = MileageTokenResponse;

type GetMileageTokenListResponse = MileageTokenResponse[];

type ActivateMileageTokenRequest = {
	mileageTokenId: number;
	rawTransaction: RawTransaction;
};

type ActivateMileageTokenResponse = {
	success: boolean;
};

export type {
	MileageTokenResponse,
	CreateMileageTokenRequest,
	CreateMileageTokenResponse,
	GetMileageTokenListResponse,
	ActivateMileageTokenRequest,
	ActivateMileageTokenResponse,
};
