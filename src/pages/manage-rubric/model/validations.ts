import { z } from "zod";

import { POINT_TYPE } from "@shared/api";

const createCategorySchema = z.object({
	name: z.string().nonempty("활동 분야 명을 입력해주세요."),
	description: z.string().nonempty("활동 분야 설명을 입력해주세요."),
});

const createActivitySchema = z.object({
	name: z.string().nonempty("활동 명을 입력해주세요."),
	pointDescription: z.string().nonempty("활동 설명을 입력해주세요."),
	mileageCategoryId: z.string().nonempty("활동 분야를 선택해주세요."),
	pointType: z.enum(POINT_TYPE),
	fixedPoint: z.string().optional(),
});

const updateCategorySchema = z.object({
	name: z.string().nonempty("활동 분야 명을 입력해주세요."),
	description: z.string().nonempty("활동 분야 설명을 입력해주세요."),
	categoryId: z.number(),
});

const updateActivitySchema = z.object({
	name: z.string().nonempty("활동 명을 입력해주세요."),
	pointDescription: z.string().nonempty("활동 설명을 입력해주세요."),
	mileageCategoryId: z.string().nonempty("활동 분야를 선택해주세요."),
	activityId: z.number(),
	pointType: z.enum(POINT_TYPE),
	fixedPoint: z.string().optional(),
});

export {
	createCategorySchema,
	createActivitySchema,
	updateCategorySchema,
	updateActivitySchema,
};
