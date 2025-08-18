import type { ApproveWalletLostRequest } from "@shared/api/wallet-lost";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { walletLostApi } from "@shared/api/wallet-lost";
import { walletLostQueries } from "@entities/wallet-lost";

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
