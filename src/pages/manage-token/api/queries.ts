import type { ActivateMileageTokenRequest } from "@shared/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mileageTokenQueries } from "@entities/mileage-token";
import { mileageTokenApi } from "@shared/api";

export const useActivateMileageToken = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: ActivateMileageTokenRequest) => {
			const { data } = await mileageTokenApi.activateMileageToken(request);
			await queryClient.invalidateQueries({
				queryKey: mileageTokenQueries.list(),
			});
			return data;
		},
	});
};
