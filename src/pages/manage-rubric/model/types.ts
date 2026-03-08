import { z } from "zod";

import {
	createActivitySchema,
	createCategorySchema,
	updateActivitySchema,
	updateCategorySchema,
} from "./validations";

type ICreateCategoryForm = z.infer<typeof createCategorySchema>;

type ICreateActivityForm = z.infer<typeof createActivitySchema>;

type IUpdateCategoryForm = z.infer<typeof updateCategorySchema>;

type IUpdateActivityForm = z.infer<typeof updateActivitySchema>;

export type {
	ICreateCategoryForm,
	ICreateActivityForm,
	IUpdateCategoryForm,
	IUpdateActivityForm,
};
