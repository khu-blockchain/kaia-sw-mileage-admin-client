import type { MILEAGE_STATUS } from "../enum";
import type { Mileage } from "./types";


type GetMileageListRequest = {
	page: number;
	limit: number;
  all?: boolean;
	studentId?: string;
	status?: MILEAGE_STATUS;
};

type GetMileageListResponse = Mileage[];

type GetMileageDetailRequest = {
	id: number;
};

type GetMileageDetailResponse = Mileage;

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
