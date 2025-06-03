import { AdminWithToken } from "@/entities/admin";

type signInAPIRequest = {
  loginType: "ADMIN";
  id: string;
  password: string;
};

type signInAPIResponse = AdminWithToken;

type refreshAPIRequest = void;

type refreshAPIResponse = AdminWithToken;

export type {
  signInAPIRequest,
  signInAPIResponse,
  refreshAPIRequest,
  refreshAPIResponse
}
