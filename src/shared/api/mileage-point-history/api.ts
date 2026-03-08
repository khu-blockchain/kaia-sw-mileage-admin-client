import type { PaginationAPIPromise } from "../types";
import type {
	GetMileagePointHistoryListRequest,
	GetMileagePointHistoryListResponse,
} from "./dto";

import { makeQuery } from "../parse-query";
import { MileagePointHistoryServer } from "../route";

export const mileagePointHistoryApi = {
	getMileagePointHistoryList: (
		request: GetMileagePointHistoryListRequest,
	): PaginationAPIPromise<GetMileagePointHistoryListResponse> =>
		MileagePointHistoryServer.get("", {
			searchParams: makeQuery(request),
		}).json(),
};
