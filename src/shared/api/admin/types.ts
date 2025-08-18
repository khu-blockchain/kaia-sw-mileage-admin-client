import type { TRANSACTION_STATUS } from "../enum";

type Admin = {
  admin_id: string;
	name: string;
	email: string;
	wallet_address: string;
	transaction_status: TRANSACTION_STATUS;
	created_at: string;
	updated_at: string;
};

export type { Admin };