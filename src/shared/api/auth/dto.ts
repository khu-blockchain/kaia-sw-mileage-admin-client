import type { Admin } from "../admin";
import type { AccessToken } from "./types";

type SignInRequest = {
	adminId: string;
	password: string;
};

type SignInResponse = Admin & AccessToken;

type RefreshTokenResponse = Admin & AccessToken;

export type { SignInRequest, SignInResponse, RefreshTokenResponse };
