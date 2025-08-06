import { queryOptions } from "@tanstack/react-query";

import { mileageTokenApi } from "@shared/api/mileage-token";
import { STUDENT_MANAGER_ABI } from "@shared/config";
import { contractCall } from "@shared/lib/web3";

import { mapMileageToken, mapMileageTokenWithActivateStatus } from "./mapper";

type ContractAddress = string;

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

				return data
					.map((token) => mapMileageToken(token))
					.map((token) =>
						mapMileageTokenWithActivateStatus(
							token,
							currentActivateTokenAddress,
						),
					);
			},
		}),
};
