import type { TRANSACTION_STATUS } from "../enum";

type MileageToken = {
	id: number;
	name: string;
	description: string;
	contract_address: string;
	symbol: string;
	image_url: string;
	transaction_status: TRANSACTION_STATUS;
	transaction_hash: string;
	created_at: string;
	updated_at: string;
};

type MileageTokenWithActivateStatus = MileageToken & {
	is_active: boolean;
};

export type { MileageToken, MileageTokenWithActivateStatus };
