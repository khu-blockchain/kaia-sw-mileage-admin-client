import type { ApproveWalletLostRequest } from "@shared/api/wallet-lost";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { walletLostApi } from "@shared/api/wallet-lost";

export const useApproveWalletLost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: ApproveWalletLostRequest) => {
			const { data } = await walletLostApi.approveWalletLost(request);
			await queryClient.invalidateQueries({
				queryKey: walletLostQueries.all(),
			});
			return data;
		},
	});
};

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
					data,
					meta,
				};
			},
		};
	},
};
