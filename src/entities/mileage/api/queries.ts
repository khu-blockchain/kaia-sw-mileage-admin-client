import type { GetMileageListRequest } from "@shared/api/mileage/dto";

import { mileageApi } from "@/shared/api/mileage";

import { mapMileage } from "./mapper";

export const mileageQueries = {
	all: () => ["mileage"] as const,
	list: (page: number, limit: number, studentId?: string) =>
		[...mileageQueries.all(), "list", page, limit, studentId] as const,
	mileageDetail: (id: number) =>
		[...mileageQueries.all(), "detail", id] as const,

	getMileageList: (request: GetMileageListRequest) => ({
		queryKey: mileageQueries.list(
			request.page,
			request.limit,
			request.studentId,
		),
		queryFn: async () => {
			const { data, meta } = await mileageApi.getMileageList(request);
			return {
				data: data.map(mapMileage),
				meta,
			};
		},
	}),

	getMileageDetail: (id: number) => ({
		queryKey: mileageQueries.mileageDetail(id),
		queryFn: async () => {
			const { data } = await mileageApi.getMileageDetail({ id });
			return mapMileage(data);
		},
	}),
};
