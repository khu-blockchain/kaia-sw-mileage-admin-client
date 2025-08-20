import type { Row } from "@tanstack/react-table";
import type { MileageColumns } from "./columns.tsx";

import { useMemo, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { parseToFormattedDate } from "@shared/lib";
import { mileageQueries } from "@/entities/mileage";
import { DataTable } from "@/shared/ui";

import { columns } from "./columns.tsx";

const MileageRequestTable = () => {
	const navigate = useNavigate();

	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});

	const {
		data: { data, meta },
	} = useSuspenseQuery(
		mileageQueries.getMileageList({
			page: pagination.pageIndex + 1,
			limit: pagination.pageSize,
		}),
	);

	const transformedData = useMemo(
		() =>
			data.map((mileage) => ({
				id: mileage.id,
				studentName: mileage.student?.name ?? "",
				department: mileage.student?.department ?? "",
				studentId: mileage.student?.student_id ?? "",
				mileageCategoryName: mileage.mileage_category_name,
				mileageActivityName: mileage.mileage_activity_name,
				status: mileage.status,
				createdAt: parseToFormattedDate(mileage.created_at),
			})),
		[data],
	);

	const onRowClick = (row: Row<MileageColumns>) => {
		navigate(`/admin/request/${row.original.id}`);
	};

	const table = useReactTable({
		data: transformedData,
		columns,
		pageCount: Math.ceil((meta.total ?? 0) / pagination.pageSize),
		manualPagination: true,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
		state: {
			pagination,
		},
		debugTable: true,
	});

	return (
		<div className="block max-w-full">
			<DataTable table={table} onRowClick={onRowClick} />
		</div>
	);
};

export default MileageRequestTable;
