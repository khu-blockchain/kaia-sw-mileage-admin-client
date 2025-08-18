import type { ContractAddress } from "@shared/lib/web3";

import { queryOptions } from "@tanstack/react-query";

import { mileageTokenApi } from "@shared/api";
import { STUDENT_MANAGER_ABI } from "@shared/config";
import { contractCall, isSameAddress } from "@shared/lib/web3";

export const mileageTokenQueries = {
	all: () => ["mileage-token"] as const,
	lists: () => [...mileageTokenQueries.all(), "list"] as const,
	list: () =>
		queryOptions({
			queryKey: [...mileageTokenQueries.lists()],
			queryFn: async () => {
				const { data } = await mileageTokenApi.getMileageTokenList();
				const currentActivateTokenAddress = (await contractCall(
					import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
					STUDENT_MANAGER_ABI,
					"mileageToken",
					[],
				)) as ContractAddress;

				return data.map((token) => ({
					...token,
					is_active: isSameAddress(
						token.contract_address,
						currentActivateTokenAddress,
					),
				}));
			},
			staleTime: 0,
			gcTime: 0,
		}),
};
