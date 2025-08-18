import type { Student } from "./types";

type GetStudentListRequest = {
	page: number;
	limit: number;
	studentId?: string;
	all?: boolean;
};

type GetStudentListResponse = Student[];

type GetStudentDetailRequest = {
	studentId: number;
};

type GetStudentDetailResponse = Student;

export type {
	GetStudentListRequest,
	GetStudentListResponse,
	GetStudentDetailRequest,
	GetStudentDetailResponse,
};
