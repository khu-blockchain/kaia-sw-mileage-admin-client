import type { APIPromise, PaginationAPIPromise } from "../types";
import type {
	ApproveMileageRequest,
	ApproveMileageResponse,
	BurnMileageRequest,
	BurnMileageResponse,
	GetMileageDetailRequest,
	GetMileageDetailResponse,
	GetMileageListRequest,
	GetMileageListResponse,
	MintMileageRequest,
	MintMileageResponse,
	RejectMileageRequest,
	RejectMileageResponse,
} from "./dto";

import { makeQuery } from "../parse-query";
import { MileageServer } from "../route";

export const mileageApi = {
	getMileageList: (
		request: GetMileageListRequest,
	): PaginationAPIPromise<GetMileageListResponse> =>
		MileageServer.get("", {
			searchParams: makeQuery(request),
		}).json(),

	getMileageDetail: (
		request: GetMileageDetailRequest,
	): APIPromise<GetMileageDetailResponse> =>
		MileageServer.get(`${request.id}`).json(),

	approveMileage: (
		request: ApproveMileageRequest,
	): APIPromise<ApproveMileageResponse> =>
		MileageServer.post(`${request.id}/approve`, {
			json: request,
		}).json(),

	rejectMileage: (
		request: RejectMileageRequest,
	): APIPromise<RejectMileageResponse> =>
		MileageServer.post(`${request.id}/reject`, {
			json: request,
		}).json(),

	mintMileage: (request: MintMileageRequest): APIPromise<MintMileageResponse> =>
		MileageServer.post(`${request.id}/mint`, {
			json: request,
		}).json(),

	burnMileage: (request: BurnMileageRequest): APIPromise<BurnMileageResponse> =>
		MileageServer.post(`${request.id}/burn`, {
			json: request,
		}).json(),
};
