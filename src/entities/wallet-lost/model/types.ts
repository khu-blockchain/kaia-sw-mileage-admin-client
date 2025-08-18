import type { Address } from "@shared/lib/web3";

import { TRANSACTION_STATUS, WALLET_LOST_STATUS } from "@shared/api/enum";

export interface WalletLost {
	id: number;
	studentId: string;
	studentName: string;
	studentHash: string;
	status: WALLET_LOST_STATUS;
	transactionStatus: TRANSACTION_STATUS;
	previousWalletAddress: Address;
	requestWalletAddress: Address;
	createdAt: string;
	updatedAt: string;
}
