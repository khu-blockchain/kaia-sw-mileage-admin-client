import type { MileageResponse } from "@shared/api/mileage";
import type { MILEAGE_POINT_HISTORY_TYPE, TRANSACTION_STATUS } from "../enum";

type MileagePointHistoryResponse = {
	id: number;
	type: MILEAGE_POINT_HISTORY_TYPE;
	mileage_token_name: string;
	mileage_activity_name: string;
	mileage_category_name: string;
	mileage_point: number;
	transaction_hash: string;
	transaction_status: TRANSACTION_STATUS;
	note: string;
	mileage: MileageResponse;
	created_at: Date;
	updated_at: Date;
};

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

type GetMileagePointHistoryListResponse = MileagePointHistoryResponse[];

export type {
	MileagePointHistoryResponse,
	GetMileagePointHistoryListRequest,
	GetMileagePointHistoryListResponse,
};
