import type {
	ApproveMileageRequest,
	BurnMileageRequest,
	MintMileageRequest,
	RejectMileageRequest,
} from "@shared/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mileageQueries } from "@entities/mileage";
import { mileagePointHistoryQueries } from "@entities/mileage-point-history";
import { mileageApi } from "@shared/api";

export const useRejectMileage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: RejectMileageRequest) => {
			const { data } = await mileageApi.rejectMileage(request);
			await queryClient.invalidateQueries({
				queryKey: mileageQueries.mileageDetail(request.id),
			});
			return data;
		},
	});
};

export const useApproveMileage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: ApproveMileageRequest) => {
			const { data } = await mileageApi.approveMileage(request);
			await queryClient.invalidateQueries({
				queryKey: mileageQueries.mileageDetail(request.id),
			});
			return data;
		},
	});
};

export const useMintMileage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: MintMileageRequest) => {
			const { data } = await mileageApi.mintMileage(request);
			await queryClient.invalidateQueries({
				queryKey: mileageQueries.mileageDetail(request.id),
			});
			await queryClient.invalidateQueries({
				queryKey: mileagePointHistoryQueries.all(),
			});
			return data;
		},
	});
};

export const useBurnMileage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: BurnMileageRequest) => {
			const { data } = await mileageApi.burnMileage(request);
			await queryClient.invalidateQueries({
				queryKey: mileageQueries.mileageDetail(request.id),
			});
			await queryClient.invalidateQueries({
				queryKey: mileagePointHistoryQueries.all(),
			});
			return data;
		},
	});
};
