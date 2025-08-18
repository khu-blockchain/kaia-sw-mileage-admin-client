import type { PaginationAPIPromise } from "../types";
import type { GetStudentListRequest, GetStudentListResponse } from "./dto";

import { StudentServer } from "../route";
import { makeQuery } from "../parse-query";

export const studentApi = {
	getStudentList: (
		request: GetStudentListRequest,
	): PaginationAPIPromise<GetStudentListResponse> =>
		StudentServer.get("", {
			searchParams: makeQuery(request),
		}).json(),
};
