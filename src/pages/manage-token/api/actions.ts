import type {
	ActivateMileageTokenRequest,
	PauseMileageRequest,
	UnpauseMileageRequest,
} from "@shared/api";

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

export const usePauseMileage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: PauseMileageRequest) => {
			const { data } = await mileageTokenApi.pauseMileage(request);
			await queryClient.invalidateQueries({
				queryKey: mileageTokenQueries.paused(),
			});
			return data;
		},
	});
};

export const useUnpauseMileage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: UnpauseMileageRequest) => {
			const { data } = await mileageTokenApi.unpauseMileage(request);
			await queryClient.invalidateQueries({
				queryKey: mileageTokenQueries.paused(),
			});
			return data;
		},
	});
};
