import { queryOptions } from "@tanstack/react-query";

import { mileageTokenApi } from "@shared/api";

export const mileageTokenQueries = {
	all: () => ["mileage-token"] as const,
	list: () => [...mileageTokenQueries.all(), "list"] as const,
	getList: () =>
		queryOptions({
			queryKey: [...mileageTokenQueries.list()],
			queryFn: async () => {
				const { data } = await mileageTokenApi.getMileageTokenList();
				return data;
			},
		}),
};
