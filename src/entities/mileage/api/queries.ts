import type { GetMileageListRequest, MILEAGE_STATUS } from "@shared/api";

import { mileageApi } from "@/shared/api";

export const mileageQueries = {
	all: () => ["mileage"] as const,
	list: (
		page: number,
		limit: number,
		studentId?: string,
		status?: MILEAGE_STATUS,
	) =>
		[...mileageQueries.all(), "list", page, limit, studentId, status] as const,
	mileageDetail: (id: number) =>
		[...mileageQueries.all(), "detail", id] as const,

	getMileageList: (request: GetMileageListRequest) => ({
		queryKey: mileageQueries.list(
			request.page,
			request.limit,
			request.studentId,
			request.status,
		),
		queryFn: async () => {
			const { data, meta } = await mileageApi.getMileageList(request);
			return {
				data,
				meta,
			};
		},
    staleTime: 0,
    gcTime: 0,
	}),

	getMileageDetail: (id: number) => ({
		queryKey: mileageQueries.mileageDetail(id),
		queryFn: async () => {
			const { data } = await mileageApi.getMileageDetail({ id });
			return data;
		},
	}),
};
