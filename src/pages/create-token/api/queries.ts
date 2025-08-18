import type { CreateMileageTokenRequest } from "@shared/api/mileage-token";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mileageTokenQueries } from "@entities/mileage-token";
import { mileageTokenApi } from "@shared/api/mileage-token";

export const useCreateMileageToken = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: CreateMileageTokenRequest) => {
			const { data } = await mileageTokenApi.createMileageToken(request);
			await queryClient.invalidateQueries({
				queryKey: mileageTokenQueries.lists(),
			});
			return data;
		},
	});
};
