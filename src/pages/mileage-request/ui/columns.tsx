import { type ColumnDef } from "@tanstack/react-table";

import { mileageStatusParser } from "@entities/mileage";
import { MILEAGE_STATUS } from "@/shared/api";
import { cn } from "@/shared/lib/style";

export type MileageColumns = {
	id: number;
	studentName: string;
	department: string;
	studentId: string;
	mileageCategoryName: string;
	mileageActivityName: string;
	status: MILEAGE_STATUS;
	createdAt: string;
};

const statusConfig = (status: MILEAGE_STATUS) => {
	const config = {
		[MILEAGE_STATUS.REVIEWING]: {
			text: mileageStatusParser(status).short_text,
			textColor: "text-pending",
		},
		[MILEAGE_STATUS.REJECTED]: {
			text: mileageStatusParser(status).short_text,
			textColor: "text-destructive",
		},
		[MILEAGE_STATUS.APPROVED]: {
			text: mileageStatusParser(status).short_text,
			textColor: "text-approved",
		},
	};

	return config[status];
};

export const columns: ColumnDef<MileageColumns>[] = [
	{
		accessorKey: "studentName",
		header: "이름",
	},
	{
		accessorKey: "department",
		header: "학과",
	},
	{
		accessorKey: "studentId",
		header: "학번",
	},
	{
		accessorKey: "mileageCategoryName",
		header: "활동 분야",
	},
	{
		accessorKey: "mileageActivityName",
		header: "비교과 활동",
	},
	{
		accessorKey: "status",
		header: "상태",
		cell: ({ row }) => {
			return (
				<div
					className={cn(
						"inline-flex items-center text-sm font-medium",
						statusConfig(row.getValue("status")).textColor,
					)}
				>
					{statusConfig(row.getValue("status")).text}
				</div>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "신청 날짜",
	},
];
