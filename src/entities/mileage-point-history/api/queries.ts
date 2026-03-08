import type { GetMileagePointHistoryListRequest } from "@shared/api";

import { mileagePointHistoryApi } from "@/shared/api";

export const mileagePointHistoryQueries = {
	all: () => ["mileage-point-history"] as const,
	list: (
		page: number,
		limit: number,
		mileageId?: number,
		all?: boolean,
		type?: string,
		studentName?: string,
		studentId?: string,
	) =>
		[
			...mileagePointHistoryQueries.all(),
			"list",
			page,
			limit,
			mileageId,
			all,
			type,
			studentName,
			studentId,
		] as const,

	getMileagePointHistoryList: (request: GetMileagePointHistoryListRequest) => ({
		queryKey: mileagePointHistoryQueries.list(
			request.page,
			request.limit,
			request.mileageId,
			request.all,
			request.type,
			request.studentName,
			request.studentId,
		),
		queryFn: async () => {
			const { data, meta } =
				await mileagePointHistoryApi.getMileagePointHistoryList(request);
			return {
				data,
				meta,
			};
		},
	}),
};
