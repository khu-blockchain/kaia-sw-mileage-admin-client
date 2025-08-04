import type { AdminResponse } from "../admin";

type AccessToken = {
	access_token: string;
};

type SignInRequest = {
	adminId: string;
	password: string;
};

type SignInResponse = AdminResponse & AccessToken;

type RefreshTokenResponse = AdminResponse & AccessToken 

export type {
	SignInRequest,
	SignInResponse,
	RefreshTokenResponse,
};
