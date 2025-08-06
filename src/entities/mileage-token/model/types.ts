import type { TRANSACTION_STATUS } from "@/shared/api";

export type MileageToken = {
	id: number;
	name: string;
	description: string;
	contractAddress: string;
	symbol: string;
	imageUrl: string;
	transactionStatus: TRANSACTION_STATUS;
	transactionHash: string;
	createdAt: Date;
	updatedAt: Date;
}

export type MileageTokenWithActivateStatus = MileageToken & {
	isActivate: boolean;
};
