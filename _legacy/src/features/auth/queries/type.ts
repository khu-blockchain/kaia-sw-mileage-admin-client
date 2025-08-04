import { AdminWithToken } from "@/entities/admin";

type useSignInRequest = {
  id: string;
  password: string;
};

type useSignInResponse = AdminWithToken

type useRefreshRequest = void;

type useRefreshResponse = AdminWithToken

export type {
  useSignInRequest,
  useSignInResponse,
  useRefreshRequest,
  useRefreshResponse
}
