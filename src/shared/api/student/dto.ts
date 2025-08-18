import type { TRANSACTION_STATUS } from "../enum";

type StudentResponse = {
	student_id: string;
	name: string;
	department: string;
	wallet_address: string;
	email: string;
	transaction_status: TRANSACTION_STATUS;
	bank_code: string;
	bank_account_number: string;
	student_hash: string;
	personal_information_consent: boolean;
	personal_information_consent_date: Date;
	created_at: Date;
	updated_at: Date;
};

type GetStudentListRequest = {
	page: number;
	limit: number;
	studentId?: string;
	all?: boolean;
};

type GetStudentListResponse = StudentResponse[];

export type { StudentResponse, GetStudentListRequest, GetStudentListResponse };
