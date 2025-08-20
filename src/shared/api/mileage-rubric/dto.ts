import type { POINT_TYPE } from "../enum";
import type { MileageActivity, MileageCategory, MileageRubric } from "./types";

type CreateMileageCategoryRequest = {
	name: string;
	description: string;
};

type CreateMileageActivityRequest = {
	name: string;
	pointDescription: string;
	mileageCategoryId: number;
	pointType: POINT_TYPE;
	fixedPoint: number | null;
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
	fixedPoint: number | null;
};

type UpdateMileageActivityResponse = MileageActivity;

type UpdateMileageCategoryResponse = MileageCategory;

type CreateMileageActivityResponse = MileageActivity;

type CreateMileageCategoryResponse = MileageCategory;

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

type GetRubricsResponse = MileageRubric[];

export type {
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
