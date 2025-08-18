import { studentApi } from "@/shared/api/student";

import { mapStudent } from "./mapper";

export const studentQueries = {
	all: () => ["student"] as const,
	list: (page: number, limit: number, studentId?: string, name?: string) =>
		[...studentQueries.all(), "list", page, limit, studentId, name] as const,
	getStudentList: (request: {
		page: number;
		limit: number;
		studentId?: string;
    name?: string;
	}) => {
		return {
			queryKey: studentQueries.list(
				request.page,
				request.limit,
				request.studentId,
				request.name,
			),
			queryFn: async () => {
				const { data, meta } = await studentApi.getStudentList(request);
				return {
					data: data.map(mapStudent),
					meta,
				};
			},
		};
	},
};
