import type { Address } from "@shared/lib/web3";
import type { TRANSACTION_STATUS, WALLET_LOST_STATUS } from "../enum";

type WalletLost = {
	id: number;
	student_id: string;
	student_name: string;
	student_hash: string;
	status: WALLET_LOST_STATUS;
	transaction_status: TRANSACTION_STATUS;
	previous_wallet_address: Address;
	request_wallet_address: Address;
	created_at: string;
	updated_at: string;
};

export type { WalletLost };
