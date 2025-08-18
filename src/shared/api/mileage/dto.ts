import type { MILEAGE_STATUS, TRANSACTION_STATUS } from "../enum";
import type { MileageActivityResponse } from "../mileage-rubric";
import type { StudentResponse } from "../student";

type MileageResponse = {
	id: number;
	mileage_category_name: string;
	mileage_activity_name: string;
	mileage_description: string;
	admin_comment: string | null;
	doc_index: number | null;
	doc_hash: string | null;
	status: MILEAGE_STATUS;
	transaction_status: TRANSACTION_STATUS;
	created_at: Date;
	updated_at: Date;
	student?: StudentResponse;
	mileage_activity?: MileageActivityResponse;
	mileage_files?: MileageFileResponse[];
};

type MileageFileResponse = {
	id: number;
	mileage_id: number;
	original_file_name: string;
	stored_file_name: string;
	url: string;
	created_at: Date;
	updated_at: Date;
};

type GetMileageListRequest = {
	page: number;
	limit: number;
  all?: boolean;
	studentId?: string;
	status?: MILEAGE_STATUS;
};

type GetMileageListResponse = MileageResponse[];

type GetMileageDetailRequest = {
	id: number;
};

type GetMileageDetailResponse = MileageResponse;

type ApproveMileageRequest = {
	id: number;
	mileagePoint: number;
	rawTransaction: string;
};

type ApproveMileageResponse = {
	success: boolean;
};

type RejectMileageRequest = {
	id: number;
	adminComment: string;
	rawTransaction: string;
};

type RejectMileageResponse = {
	success: boolean;
};

type MintMileageRequest = {
	id: number;
  mileagePoint: number;
  note: string;
	rawTransaction: string;
};

type MintMileageResponse = {
	success: boolean;
};

type BurnMileageRequest = {
	id: number;
	mileagePoint: number;
	note: string;
	rawTransaction: string;
};

type BurnMileageResponse = {
	success: boolean;
};

export type {
	MileageResponse,
	MileageFileResponse,
	GetMileageListRequest,
	GetMileageListResponse,
	GetMileageDetailRequest,
	GetMileageDetailResponse,
	ApproveMileageRequest,
	ApproveMileageResponse,
	RejectMileageRequest,
	RejectMileageResponse,
	MintMileageRequest,
	MintMileageResponse,
	BurnMileageRequest,
	BurnMileageResponse,
};
