import type { APIPromise, PaginationAPIPromise } from "../types";
import type {
	GetStudentDetailRequest,
	GetStudentDetailResponse,
	GetStudentListRequest,
	GetStudentListResponse,
} from "./dto";

import { makeQuery } from "../parse-query";
import { StudentServer } from "../route";

export const studentApi = {
	getStudentList: (
		request: GetStudentListRequest,
	): PaginationAPIPromise<GetStudentListResponse> =>
		StudentServer.get("", {
			searchParams: makeQuery(request),
		}).json(),
	getStudentDetail: (
		request: GetStudentDetailRequest,
	): APIPromise<GetStudentDetailResponse> =>
		StudentServer.get(`${request.studentId}`).json(),
};
