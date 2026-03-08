import type { APIPromise } from "../types";
import type {
	CreateMileageActivityRequest,
	CreateMileageActivityResponse,
	CreateMileageCategoryRequest,
	CreateMileageCategoryResponse,
	DeleteMileageActivityRequest,
	DeleteMileageActivityResponse,
	DeleteMileageCategoryRequest,
	DeleteMileageCategoryResponse,
	GetMileageActivityRequest,
	GetMileageActivityResponse,
	GetRubricsResponse,
	UpdateMileageActivityRequest,
	UpdateMileageActivityResponse,
	UpdateMileageCategoryRequest,
	UpdateMileageCategoryResponse,
} from "./dto";

import { MileageRubricServer } from "../route";

export const mileageRubricApi = {
	createMileageCategory: (
		request: CreateMileageCategoryRequest,
	): APIPromise<CreateMileageCategoryResponse> =>
		MileageRubricServer.post("category", {
			json: request,
		}).json(),

	createMileageActivity: (
		request: CreateMileageActivityRequest,
	): APIPromise<CreateMileageActivityResponse> =>
		MileageRubricServer.post("activity", {
			json: request,
		}).json(),

	getMileageActivity: (
		request: GetMileageActivityRequest,
	): APIPromise<GetMileageActivityResponse> =>
		MileageRubricServer.get(`activity/${request.id}`).json(),

	updateMileageCategory: (
		request: UpdateMileageCategoryRequest,
	): APIPromise<UpdateMileageCategoryResponse> =>
		MileageRubricServer.patch(`category/${request.categoryId}`, {
			json: request,
		}).json(),

	updateMileageActivity: (
		request: UpdateMileageActivityRequest,
	): APIPromise<UpdateMileageActivityResponse> =>
		MileageRubricServer.patch(`activity/${request.activityId}`, {
			json: request,
		}).json(),

	deleteMileageCategory: (
		request: DeleteMileageCategoryRequest,
	): APIPromise<DeleteMileageCategoryResponse> =>
		MileageRubricServer.delete(`category/${request.categoryId}`).json(),

	deleteMileageActivity: (
		request: DeleteMileageActivityRequest,
	): APIPromise<DeleteMileageActivityResponse> =>
		MileageRubricServer.delete(`activity/${request.activityId}`).json(),

	getRubrics: (): APIPromise<GetRubricsResponse> =>
		MileageRubricServer.get("").json(),
};
