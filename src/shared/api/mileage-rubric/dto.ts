import type { POINT_TYPE } from "../enum";

type MileageCategoryResponse = {
	id: number;
	name: string;
	description: string;
};

type MileageActivityResponse = {
	id: number;
	name: string;
	point_type: POINT_TYPE;
	point_description: string;
	fixed_point: number;
};

type MileageRubricResponse = MileageCategoryResponse & {
	mileage_activities: MileageActivityResponse[];
};

type CreateMileageCategoryRequest = {
	name: string;
	description: string;
};

type CreateMileageActivityRequest = {
	name: string;
	pointDescription: string;
	mileageCategoryId: number;
	pointType: POINT_TYPE;
	fixedPoint?: number;
};

type UpdateMileageCategoryRequest = {
	name: string;
	description: string;
	categoryId: number;
};

type UpdateMileageActivityRequest = {
	name: string;
	pointDescription: string;
	mileageCategoryId: number;
	activityId: number;
	pointType: POINT_TYPE;
	fixedPoint?: number;
};

type UpdateMileageActivityResponse = MileageActivityResponse;

type UpdateMileageCategoryResponse = MileageCategoryResponse;

type CreateMileageActivityResponse = MileageActivityResponse;

type CreateMileageCategoryResponse = MileageCategoryResponse;

type DeleteMileageCategoryRequest = {
	categoryId: number;
};

type DeleteMileageActivityRequest = {
	activityId: number;
};

type DeleteMileageCategoryResponse = {
	success: boolean;
};

type DeleteMileageActivityResponse = {
	success: boolean;
};

type GetRubricsResponse = MileageRubricResponse[];

export type {
	MileageCategoryResponse,
	MileageActivityResponse,
	MileageRubricResponse,
	CreateMileageCategoryRequest,
	CreateMileageActivityRequest,
	CreateMileageActivityResponse,
	CreateMileageCategoryResponse,
	UpdateMileageCategoryRequest,
	UpdateMileageCategoryResponse,
	GetRubricsResponse,
	UpdateMileageActivityRequest,
	UpdateMileageActivityResponse,
	DeleteMileageCategoryRequest,
	DeleteMileageActivityRequest,
	DeleteMileageCategoryResponse,
	DeleteMileageActivityResponse,
};
