import type { Address } from "@/shared/lib/web3";
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
