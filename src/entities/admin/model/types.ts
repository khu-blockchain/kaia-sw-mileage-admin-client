import type { TRANSACTION_STATUS } from "@/shared/api";

export interface Admin {
	adminId: string;
	name: string;
	email: string;
	walletAddress: string;
	transactionStatus: TRANSACTION_STATUS;
	createdAt: Date;
	updatedAt: Date;
}
