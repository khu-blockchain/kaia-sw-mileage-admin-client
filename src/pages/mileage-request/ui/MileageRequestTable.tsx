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
import { mileageQueries } from "@/entities/mileage/api/queries";
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
				studentId: mileage.student?.studentId ?? "",
				mileageCategoryName: mileage.mileageCategoryName,
				mileageActivityName: mileage.mileageActivityName,
				status: mileage.status,
				createdAt: parseToFormattedDate(mileage.createdAt.toISOString()),
			})),
		[data],
	);

	const onRowClick = (row: Row<MileageColumns>) => {
		navigate(`/request/${row.original.id}`);
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
		<div className="flex flex-col gap-6">
			<DataTable table={table} onRowClick={onRowClick} />
		</div>
	);
};

export default MileageRequestTable;
