import { WALLET_LOST_STATUS } from "@shared/api";
import { walletLostApi } from "@shared/api";

export const walletLostQueries = {
	all: () => ["wallet-lost"] as const,
	list: (
		page: number,
		limit: number,
		studentId?: string,
		all?: boolean,
		status?: WALLET_LOST_STATUS,
	) =>
		[
			...walletLostQueries.all(),
			"list",
			page,
			limit,
			studentId,
			all,
			status,
		] as const,
	getWalletLostList: (request: {
		page: number;
		limit: number;
		studentId?: string;
		all?: boolean;
		status?: WALLET_LOST_STATUS;
	}) => {
		return {
			queryKey: walletLostQueries.list(
				request.page,
				request.limit,
				request.studentId,
				request.all,
				request.status,
			),
			queryFn: async () => {
				const { data, meta } = await walletLostApi.getWalletLostList(request);
				return {
					data,
					meta,
				};
			},
		};
	},
};
