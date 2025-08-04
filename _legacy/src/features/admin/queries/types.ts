import { Admin } from "@/entities/admin";

type useSignUpRequest = {
  adminId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
  walletAddress: string;
};

type useSignUpResponse = Admin;

export type {
  useSignUpRequest,
  useSignUpResponse,
};
