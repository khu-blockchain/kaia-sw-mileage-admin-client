import type { PaginationAPIPromise } from "../types";
import type {
	GetWalletLostListRequest,
	GetWalletLostListResponse,
	ApproveWalletLostRequest,
	ApproveWalletLostResponse,
} from "./dto";

import { makeQuery } from "../parse-query";
import { WalletLostServer } from "../route";

export const walletLostApi = {
	getWalletLostList: (
		request: GetWalletLostListRequest,
	): PaginationAPIPromise<GetWalletLostListResponse> =>
		WalletLostServer.get("", {
			searchParams: makeQuery(request),
		}).json(),

	approveWalletLost: (
		request: ApproveWalletLostRequest,
	): PaginationAPIPromise<ApproveWalletLostResponse> =>
		WalletLostServer.post("approve", {
			json: request,
		}).json(),
};
