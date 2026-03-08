import type { MILEAGE_POINT_HISTORY_TYPE } from "../enum";
import type { MileagePointHistory } from "./types";

type GetMileagePointHistoryListRequest = {
	page: number;
	limit: number;
	all?: boolean;
	mileageId?: number;
	mileageTokenName?: string;
	studentId?: string;
	type?: MILEAGE_POINT_HISTORY_TYPE;
	studentName?: string;
};

type GetMileagePointHistoryListResponse = MileagePointHistory[];

export type {
	GetMileagePointHistoryListRequest,
	GetMileagePointHistoryListResponse,
};
