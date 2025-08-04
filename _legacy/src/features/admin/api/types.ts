import { AdminWithToken } from "@/entities/admin";

type signUpAPIRequest = {
  adminId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
  walletAddress: string;
};

type signUpAPIResponse = AdminWithToken;

export type {
  signUpAPIRequest,
  signUpAPIResponse,
};
