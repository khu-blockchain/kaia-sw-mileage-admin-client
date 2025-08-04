import type { Address } from "@/shared/lib/web3";
import type { TRANSACTION_STATUS } from "../enum";

type AdminResponse = {
	admin_id: string;
	name: string;
	email: string;
	wallet_address: string;
	transaction_status: TRANSACTION_STATUS;
	created_at: Date;
	updated_at: Date;
};

type SignUpRequest = {
	adminId: string;
	name: string;
	password: string;
	passwordConfirm: string;
	email: string;
	walletAddress: Address;
};

type SignUpResponse = AdminResponse;

type UpdateEmailRequest = {
	email: string;
};

type UpdateEmailResponse = AdminResponse;

export type {
	AdminResponse,
	SignUpRequest,
	SignUpResponse,
	UpdateEmailRequest,
	UpdateEmailResponse,
};
