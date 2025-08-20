import type { Address } from "@kaiachain/viem-ext";
import type { Admin } from "./types";

type SignUpRequest = {
	adminId: string;
	name: string;
	password: string;
	passwordConfirm: string;
	email: string;
	walletAddress: Address;
};

type SignUpResponse = Admin;

export type { SignUpRequest, SignUpResponse };
