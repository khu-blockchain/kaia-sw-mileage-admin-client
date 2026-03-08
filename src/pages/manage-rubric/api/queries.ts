import type {
	CreateMileageActivityRequest,
	CreateMileageCategoryRequest,
	DeleteMileageActivityRequest,
	DeleteMileageCategoryRequest,
	UpdateMileageActivityRequest,
	UpdateMileageCategoryRequest,
} from "@/shared/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mileageRubricQueries } from "@entities/mileage-rubric";
import { mileageRubricApi } from "@/shared/api";

export const useCreateMileageCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: CreateMileageCategoryRequest) => {
			const { data } = await mileageRubricApi.createMileageCategory(request);
			queryClient.invalidateQueries({
				queryKey: mileageRubricQueries.getRubrics(),
			});
			return data;
		},
	});
};

export const useCreateMileageActivity = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: CreateMileageActivityRequest) => {
			const { data } = await mileageRubricApi.createMileageActivity(request);
			queryClient.invalidateQueries({
				queryKey: mileageRubricQueries.getRubrics(),
			});
			return data;
		},
	});
};

export const useUpdateMileageCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: UpdateMileageCategoryRequest) => {
			const { data } = await mileageRubricApi.updateMileageCategory(request);
			queryClient.invalidateQueries({
				queryKey: mileageRubricQueries.getRubrics(),
			});
			return data;
		},
	});
};

export const useUpdateMileageActivity = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: UpdateMileageActivityRequest) => {
			const { data } = await mileageRubricApi.updateMileageActivity(request);
			queryClient.invalidateQueries({
				queryKey: mileageRubricQueries.getRubrics(),
			});
			return data;
		},
	});
};

export const useDeleteMileageCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: DeleteMileageCategoryRequest) => {
			const { data } = await mileageRubricApi.deleteMileageCategory(request);
			queryClient.invalidateQueries({
				queryKey: mileageRubricQueries.getRubrics(),
			});
			return data;
		},
	});
};

export const useDeleteMileageActivity = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: DeleteMileageActivityRequest) => {
			const { data } = await mileageRubricApi.deleteMileageActivity(request);
			queryClient.invalidateQueries({
				queryKey: mileageRubricQueries.getRubrics(),
			});
			return data;
		},
	});
};
