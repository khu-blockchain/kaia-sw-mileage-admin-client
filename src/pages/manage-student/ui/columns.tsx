import { type ColumnDef } from "@tanstack/react-table";

export type StudentColumns = {
	studentId: string;
	studentName: string;
	department: string;
	email: string;
	walletAddress: string;
};

export const columns: ColumnDef<StudentColumns>[] = [
	{
		header: "학번",
		accessorKey: "studentId",
	},
	{
		header: "이름",
		accessorKey: "studentName",
	},
	{
		header: "학과",
		accessorKey: "department",
	},
	{
		header: "이메일",
		accessorKey: "email",
	},
	{
		header: "지갑 주소",
		accessorKey: "walletAddress",
	},
];
