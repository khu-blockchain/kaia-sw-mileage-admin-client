import type { ColumnDef, Row } from "@tanstack/react-table";

import { useMemo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { mileageQueries } from "@entities/mileage";
import { parseToFormattedDate } from "@shared/lib";
import { Button, DataTable } from "@shared/ui";
import { MILEAGE_STATUS } from "@shared/api";

type DashboardMileageColumns = {
	id: number;
	studentName: string;
	mileageCategoryName: string;
	mileageActivityName: string;
	createdAt: string;
};

const columns: ColumnDef<DashboardMileageColumns>[] = [
	{
		accessorKey: "studentName",
		header: "이름",
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
		accessorKey: "createdAt",
		header: "신청 날짜",
	},
];

export default function RecentMileageRequestSection() {
	const navigate = useNavigate();
	const {
		data: { data },
	} = useSuspenseQuery(
		mileageQueries.getMileageList({
			page: 1,
			limit: 5,
			status: MILEAGE_STATUS.REVIEWING,
		}),
	);

	const transformedData = useMemo(
		() =>
			data.map((mileage) => ({
				id: mileage.id,
				studentName: mileage.student?.name ?? "",
				mileageCategoryName: mileage.mileage_category_name,
				mileageActivityName: mileage.mileage_activity_name,
				createdAt: parseToFormattedDate(mileage.created_at),
			})),
		[data],
	);

	const onRowClick = (row: Row<DashboardMileageColumns>) => {
		navigate(`/admin/request/${row.original.id}`);
	};

	const table = useReactTable({
		data: transformedData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
	});

	return (
		<div className="bg-white rounded-md border p-4">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-3">
					<div>
						<h2 className="text-lg font-semibold text-body">
							최근 마일리지 신청
						</h2>
					</div>
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={() => navigate("/admin/request")}
				>
					전체보기
				</Button>
			</div>
			<DataTable table={table} onRowClick={onRowClick} />
		</div>
	);
}
