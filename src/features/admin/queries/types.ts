import { AdminWithToken } from "@/entities/admin";

type useSignUpRequest = {
  adminId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
  walletAddress: string;
};

type useSignUpResponse = AdminWithToken;

export type {
  useSignUpRequest,
  useSignUpResponse,
};
