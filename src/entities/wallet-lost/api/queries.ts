import { walletLostApi } from "@shared/api/wallet-lost";

import { mapWalletLost } from "./mapper";

export const walletLostQueries = {
	all: () => ["wallet-lost"] as const,
	list: (page: number, limit: number, studentId?: string) =>
		[...walletLostQueries.all(), "list", page, limit, studentId] as const,
	getWalletLostList: (request: {
		page: number;
		limit: number;
		studentId?: string;
	}) => {
		return {
			queryKey: walletLostQueries.list(
				request.page,
				request.limit,
				request.studentId,
			),
			queryFn: async () => {
				const { data, meta } = await walletLostApi.getWalletLostList(request);
				return {
					data: data.map(mapWalletLost),
					meta,
				};
			},
		};
	},
};
